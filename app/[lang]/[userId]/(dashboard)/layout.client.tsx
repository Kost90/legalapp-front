'use client';

import { AnimatePresence } from 'motion/react';
import { motion } from 'motion/react';
import { usePathname } from 'next/navigation';
import { ReactNode } from 'react';

import { useUser } from '@/context/user/UserProvider.client';

export default function DashboardLayoutClient(props: Readonly<{ children: ReactNode }>) {
  const pathname = usePathname();

  const { user } = useUser();

  console.log('Current user:', user);

  return (
    <AnimatePresence initial={false} mode="popLayout">
      <motion.div key={pathname}>{props.children}</motion.div>
    </AnimatePresence>
  );
}
