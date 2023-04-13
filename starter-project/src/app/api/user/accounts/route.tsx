import { NextResponse } from 'next/server';
import { Bruinen } from '@bruinenco/bruinen-sdk';
const _ = require('lodash');

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const userId = searchParams.get('userId');

  if (!userId) {
    return new Response('User ID not found', { status: 400 });
  };

  // Instantiate the Bruinen SDK: https://docs.bruinen.co/api-reference/bruinen-sdk
  const bruinen = new Bruinen({
    type: "apiKey",
    apiKey: process.env.BRUINEN_SECRET || ""
  });

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