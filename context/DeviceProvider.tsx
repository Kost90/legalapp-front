'use client';

import { createContext, useContext, ReactNode } from 'react';
import { useEffect, useState } from 'react';

interface DeviceContextType {
  isXs: boolean | null;
  isXsMax: boolean | null;
  isSm: boolean | null;
  isSmMax: boolean | null;
  isMd: boolean | null;
  isMdMax: boolean | null;
  isLg: boolean | null;
  isLgMax: boolean | null;
  isXl: boolean | null;
  isXlMax: boolean | null;
}

const DeviceContext = createContext<DeviceContextType>({
  isXs: null,
  isXsMax: null,
  isSm: null,
  isSmMax: null,
  isMd: null,
  isMdMax: null,
  isLg: null,
  isLgMax: null,
  isXl: null,
  isXlMax: null,
});

export function useDevice() {
  return useContext(DeviceContext);
}

export default function DeviceProvider({ children }: { children: ReactNode }) {
  const [matches, setMatches] = useState<DeviceContextType>({
    isXs: null,
    isXsMax: null,
    isSm: null,
    isSmMax: null,
    isMd: null,
    isMdMax: null,
    isLg: null,
    isLgMax: null,
    isXl: null,
    isXlMax: null,
  });

  useEffect(() => {
    const updateMatches = () => {
      setMatches({
        isXs: window.matchMedia('(min-width: 400px)').matches,
        isXsMax: window.matchMedia('(max-width: 399px)').matches,
        isSm: window.matchMedia('(min-width: 576px)').matches,
        isSmMax: window.matchMedia('(max-width: 575px)').matches,
        isMd: window.matchMedia('(min-width: 768px)').matches,
        isMdMax: window.matchMedia('(max-width: 767px)').matches,
        isLg: window.matchMedia('(min-width: 996px)').matches,
        isLgMax: window.matchMedia('(max-width: 995px)').matches,
        isXl: window.matchMedia('(min-width: 1200px)').matches,
        isXlMax: window.matchMedia('(max-width: 1199px)').matches,
      });
    };

    updateMatches();
    window.addEventListener('resize', updateMatches);

    return () => window.removeEventListener('resize', updateMatches);
  }, []);

  return <DeviceContext.Provider value={matches}>{children}</DeviceContext.Provider>;
}
