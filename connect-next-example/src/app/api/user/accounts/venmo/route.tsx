import { NextResponse } from 'next/server';
import { Bruinen } from '@bruinenco/bruinen-sdk';

// Instantiate the Bruinen SDK: https://docs.bruinen.co/api-reference/bruinen-sdk
const bruinen = new Bruinen({
  type: "apiKey",
  apiKey: process.env.BRUINEN_SECRET as string
});

/**
 * Retrieves the user's Venmo transactions given an accountId
 * @param request — Venmo accountId sent as URL parameter
 * @returns the user's Venmo transactions — see docs:
 * https://docs.bruinen.co/api-reference/sources/venmo/get-transactions
 */
export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const accountId = searchParams.get('accountId');

  if (!accountId) {
    return new Response('Account ID not found', { status: 400 });
  };

  // Get the list of Venmo transactions given the Venmo account ID
  // See the docs for other Venmo endpoints:
  // https://docs.bruinen.co/api-reference/sources/venmo/overview
  const venmo = bruinen.Venmo(accountId);
  const venmoTransactions = await venmo.getTransactions();

  return NextResponse.json(venmoTransactions);
};