'use client';

import { AnimatePresence } from 'motion/react';
import { motion } from 'motion/react';
import { usePathname } from 'next/navigation';
import { ReactNode } from 'react';
import { DashboardErrorProvider } from './dashboard-error-context';

export default function DashboardLayoutClient(props: Readonly<{ children: ReactNode }>) {
  const pathname = usePathname();
// TODO: Think about animation when changing tabs
  return (
    <AnimatePresence initial={false} mode="popLayout">
      <DashboardErrorProvider>
        <motion.div key={pathname}>{props.children}</motion.div>
      </DashboardErrorProvider>
    </AnimatePresence>
  );
}
