'use client';

import { AnimatePresence, motion } from 'motion/react';
import { usePathname } from 'next/navigation';
import { createContext, ReactNode, useContext, useEffect, useState } from 'react';

type AuthErrorContextType = {
  error: string;
  setError: (error: string) => void;
};

const AuthErrorContext = createContext<AuthErrorContextType>({
  error: '',
  setError: () => {},
});

export const useAuthError = () => {
  const context = useContext(AuthErrorContext);

  if (!context) {
    throw new Error('useAuthError must be used within an AuthErrorProvider');
  }

  return context;
};

export const AuthErrorProvider = ({ children }: { children: ReactNode }) => {
  const [error, setError] = useState('');

  const pathname = usePathname();

  useEffect(() => {
    setError('');
  }, [pathname]);

  return (
    <AuthErrorContext.Provider
      value={{
        error,
        setError: (error: string) => {
          setError(error);

          if (!error) return;
        },
      }}
    >
      <AnimatePresence mode="popLayout">
        {error && (
          <motion.div className="absolute top-34 z-50 flex w-full items-center justify-center gap-4 py-8">
            <svg fill="none" height="20" viewBox="0 0 20 20" width="20" xmlns="http://www.w3.org/2000/svg">
              <path d="M10 8.33333V11.3333M10 12.9933V13M10 4L3.5 15H16.5L10 4Z" stroke="#FF587A" strokeLinecap="square" />
            </svg>

            {error}
          </motion.div>
        )}
      </AnimatePresence>

      {children}
    </AuthErrorContext.Provider>
  );
};
