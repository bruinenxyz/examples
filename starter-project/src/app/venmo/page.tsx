"use client";
import { useUserContext } from "../context/state";
import axios from "axios";
import { useState, useEffect } from 'react';
const _ = require('lodash');

export default function Venmo() {
  const { userId, userToken, addUser } = useUserContext();

  const [data, setData] = useState(false);
  const [isLoading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    
    const getAccounts = async () => {
      // Pull the list of connected accounts for the user
      const accounts = await axios.get(`/api/user/accounts?userId=${userId}`);
      // Pull only the Venmo account from the list of connected accounts
      const venmoAccount = _.filter(accounts.data, (account: { source: string; }) => account.source === 'venmo')[0];
      // Access the user's Venmo transactions using the account
      const venmoTransactions = await axios.get(`/api/user/accounts/venmo?accountId=${venmoAccount.id}`);

      setData(true);
      setLoading(false);

      // Print the returned Venmo transactions to the console so you can look at what is returned
      console.log(venmoTransactions.data);
    }

    getAccounts();
  }, []);

  if (isLoading) return <p className="flex items-center justify-center">Loading...</p>;
  if (!data) return <p className="flex items-center justify-center">No profile data</p>;
  return (<p className="flex items-center justify-center">Venmo account connected</p>);
};