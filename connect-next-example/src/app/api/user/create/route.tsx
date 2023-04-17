import { NextResponse } from 'next/server';
import { Bruinen } from '@bruinenco/bruinen-sdk';

// Instantiate the Bruinen SDK: https://docs.bruinen.co/api-reference/bruinen-sdk
const bruinen = new Bruinen({
  type: "apiKey",
  apiKey: process.env.BRUINEN_SECRET as string
});

/**
 * Create a user in Bruinen's system with a given email
 * @param request — email sent as URL parameter
 * @returns the created user's email, ID, and access token
 */
export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const email = searchParams.get('email');

  if (!email) {
    return new Response('Email not found', { status: 400 });
  };

  // If the user already exists, Bruinen will associate the email with the existing account
  // https://docs.bruinen.co/api-reference/users/find-or-create
  const user = await bruinen.getOrCreateUser(email);
  // The user token is for use in Bruinen Connect on your frontend
  // https://docs.bruinen.co/getting-started#user-access-token-frontend
  const userToken = await bruinen.getUserAuthToken(user.id);
  
  // TODO remove this once Bruinen SDK is updated
  // This is needed currently as the returned user token is of type string 
  const userTokenParsed = Object.values(userToken)[0];

  return NextResponse.json({ email: email, userId: user.id, userToken: userTokenParsed });
};