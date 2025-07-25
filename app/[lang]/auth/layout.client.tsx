'use client';

import { AnimatePresence } from 'motion/react';
import { motion } from 'motion/react';
import { usePathname } from 'next/navigation';
import { ReactNode } from 'react';

import { AuthErrorProvider } from './auth-error-context';

export default function AuthLayoutClient(props: Readonly<{ children: ReactNode }>) {
  const pathname = usePathname();

  return (
    <div className="bg-bg-primary relative min-h-screen w-full px-5">
      <AuthErrorProvider>
        <AnimatePresence initial={false} mode="popLayout">
          <motion.div className="relative" key={pathname}>
            {props.children}
          </motion.div>
        </AnimatePresence>
      </AuthErrorProvider>
    </div>
  );
}
