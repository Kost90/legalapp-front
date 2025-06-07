'use client';
import { ReactNode } from 'react';

import { AuthTabsProvider } from '@/components/Authtabs/context';
import AuthTabs from '@/components/Authtabs/AuthTabs';

export default function AuthLayout(props: Readonly<{ children: ReactNode }>) {
  return (
    <AuthTabsProvider>
      <AuthTabs />

      <div className="pb-24 md:pb-48">{props.children}</div>
    </AuthTabsProvider>
  );
}
