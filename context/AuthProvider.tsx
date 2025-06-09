'use client';

import { clearAuthAndRedirect } from '@/api/auth/clearAuth';
import { createContext, ReactNode, useContext, useMemo, useCallback, useEffect, useState } from 'react';

type AuthContextType = {
  isAuthenticated: boolean;
  loginFun: () => void;
  logout: () => void;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children, isAuth, lang }: { children: ReactNode; isAuth: boolean; lang: string }) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(isAuth);

  useEffect(() => {
    setIsAuthenticated(isAuth);
  }, [isAuth]);

  const loginFun = useCallback(() => {
    setIsAuthenticated(true);
  }, []);

  const logout = useCallback(() => {
    clearAuthAndRedirect(lang);
    setIsAuthenticated(false);
  }, []);

  const value = useMemo(
    () => ({
      isAuthenticated,
      loginFun,
      logout,
    }),
    [isAuthenticated, loginFun, logout],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
