'use client';

import { createContext, ReactNode, useContext, useState } from 'react';

type AuthTabsContextType = {
  hideTabs: boolean;
  setHideTabs: (hide: boolean) => void;
};

const AuthTabsContext = createContext<AuthTabsContextType | null>(null);

export function AuthTabsProvider({ children }: { children: ReactNode }) {
  const [hideTabs, setHideTabs] = useState(false);

  return (
    <AuthTabsContext.Provider
      value={{
        hideTabs,
        setHideTabs,
      }}
    >
      {children}
    </AuthTabsContext.Provider>
  );
}

export function useAuthTabs() {
  const context = useContext(AuthTabsContext);

  if (!context) {
    throw new Error('useAuthTabs must be used within an AuthTabsProvider');
  }

  return context;
}
