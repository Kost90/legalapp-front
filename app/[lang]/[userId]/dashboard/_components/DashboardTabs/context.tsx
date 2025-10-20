'use client';

import { createContext, ReactNode, useContext, useState } from 'react';

type DashboardTabsContextType = {
  hideTabs: boolean;
  setHideTabs: (hide: boolean) => void;
};

const DashboardTabsContext = createContext<DashboardTabsContextType | null>(null);

export function DashboardTabsProvider({ children }: { children: ReactNode }) {
  const [hideTabs, setHideTabs] = useState(false);

  return (
    <DashboardTabsContext.Provider
      value={{
        hideTabs,
        setHideTabs,
      }}
    >
      {children}
    </DashboardTabsContext.Provider>
  );
}

export function useDashboardTabs() {
  const context = useContext(DashboardTabsContext);

  if (!context) {
    throw new Error('useDashboardTabs must be used within an AuthTabsProvider');
  }

  return context;
}
