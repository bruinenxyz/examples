import { NextResponse } from 'next/server';
import { Bruinen } from '@bruinenco/bruinen-sdk';
import * as _ from 'lodash';

// Instantiate the Bruinen SDK: https://docs.bruinen.co/api-reference/bruinen-sdk
const bruinen = new Bruinen({
  type: "apiKey",
  apiKey: process.env.BRUINEN_SECRET as string
});

/**
 * Pulls the user's list of accounts connected to Bruinen
 * @param request — userId sent as URL parameter
 * @returns the user's list of connected accounts, inc. source name and ID — see docs:
 * https://docs.bruinen.co/api-reference/accounts/get-accounts-by-user
 */
export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const userId = searchParams.get('userId');

  if (!userId) {
    return new Response('User ID not found', { status: 400 });
  };

  // Pull the list of accounts that the user has connected
  const userAccounts = await bruinen.getUserAccounts(userId);
  
  // Filter the accounts to only include the source name and source ID fields
  const filteredAccounts = _.map(userAccounts, (userAccount: { source: string; id: string; }) => { 
    return { 
      source: userAccount.source, 
      id: userAccount.id 
    };
  });
  
  return NextResponse.json(filteredAccounts);
};