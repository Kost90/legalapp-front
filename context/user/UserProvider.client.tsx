'use client';

import { createContext, useContext, ReactNode, Dispatch, SetStateAction, useState, useCallback } from 'react';

import { fetchCurrentUser } from '@/api/user/fetchCurrentUser';
import { userInformationData } from '@/types/user';

// TODO:Make correct interface for user
interface UserContextType {
  user: userInformationData;
  setUser: Dispatch<SetStateAction<userInformationData>>;
  refreshUser: () => Promise<userInformationData>;
}

const UserContext = createContext<UserContextType | null>(null);

export const useUser = () => {
  const context = useContext(UserContext);

  if (!context) {
    throw new Error('useUser must be used within a UserProvider');
  }

  return context;
};

export const useUserUnsafe = () => {
  const context = useContext(UserContext);

  return context;
};

interface UserProviderProps {
  user: userInformationData;
  children: ReactNode;
}

export function UserProviderClient({ user: _user, children }: UserProviderProps) {
  const [user, setUser] = useState<userInformationData>(_user);

  return (
    <UserContext.Provider
      value={{
        user,
        setUser,
        refreshUser: useCallback(async () => {
          const { data } = await fetchCurrentUser();

          setUser(data);

          return data;
        }, []),
      }}
    >
      {children}
    </UserContext.Provider>
  );
}
