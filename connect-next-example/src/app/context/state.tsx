"use client";
import { createContext, useContext } from 'react';
import { ReactNode } from 'react';
import { useState } from 'react';

type userContextType = {
    userId: string
    userToken: string
    addUser: (userId: string, userToken: string) => void
};

const userContextDefault: userContextType = {
    userId: "",
    userToken: "",
    addUser: () => {}
};

const UserContext = createContext<userContextType>(userContextDefault);

export function useUserContext() {
    return useContext(UserContext)
};

type Props = {
    children: ReactNode
};

// The starter app manages state through a wrapper using react's useState
// You'll likely want to build your own state management system
export function StateWrapper({ children }: Props) {
  const [userId, setUserId] = useState<string>("");
  const [userToken, setUserToken] = useState<string>("");
  
  const addUser = (userId: string, userToken: string) => {
    setUserId(userId);
    setUserToken(userToken);
  };

  const value = {
    userId,
    userToken,
    addUser
  };

  return (
    <UserContext.Provider value={value}>
      {children}
    </UserContext.Provider>
  );
}
