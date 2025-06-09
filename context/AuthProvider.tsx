'use client';
import { clearAuthAndRedirect } from '@/api/auth/clearAuth';
import { createContext, ReactNode, useContext, useMemo, useCallback, useState } from 'react';

type AuthContextType = {
  isAuthenticated: boolean;
  loginFun: () => void;
  logout: () => void;
};

const AuthContext = createContext<AuthContextType>({
  isAuthenticated: false,
  loginFun: () => {},
  logout: () => {},
});

export const AuthProvider = ({ children, isAuth }: { children: ReactNode; isAuth: boolean }) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(isAuth);

  const loginFun = useCallback(() => setIsAuthenticated(true), []);
  const logout = useCallback(() => {
    setIsAuthenticated(false);
    clearAuthAndRedirect();
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

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used inside AuthProvider');
  return context;
};
