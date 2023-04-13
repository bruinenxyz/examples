import { NextResponse } from 'next/server';
import { Bruinen } from '@bruinenco/bruinen-sdk';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const email = searchParams.get('email');

  if (!email) {
    return new Response('Email not found', { status: 400 });
  };

  // Instantiate the Bruinen SDK: https://docs.bruinen.co/api-reference/bruinen-sdk
  const bruinen = new Bruinen({
    type: "apiKey",
    apiKey: process.env.BRUINEN_SECRET || ""
  });

  // Create the user in Bruinen's system with the entered email
  // If the user already exists, Bruinen will associate the email with the existing account
  // See the docs for more:
  // https://docs.bruinen.co/api-reference/users/find-or-create
  const user = await bruinen.getOrCreateUser(email);
  // Pull the user's access token — this is for use in Bruinen Connect on your frontend
  // See the docs for more:
  // https://docs.bruinen.co/getting-started#user-access-token-frontend
  const userToken = await bruinen.getUserAuthToken(user.id);
  
  // TODO remove this once Bruinen SDK is updated
  // This is needed currently as the returned user access token is of type string 
  const accessToken = Object.values(userToken)[0];

  return NextResponse.json({ email: email, userId: user.id, userToken: accessToken });
};