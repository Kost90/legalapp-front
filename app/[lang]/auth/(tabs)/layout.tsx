'use client';
import { ReactNode } from 'react';

// import AuthTabs from '@/components/AuthTabs/AuthTabs';
// import { AuthTabsProvider } from '@/components/AuthTabs/context';

export default function AuthLayout(props: Readonly<{ children: ReactNode }>) {
  return (
    // <AuthTabsProvider>
    //   <AuthTabs />

    <div className="px-24 md:px-76 pb-24 md:pb-48">{props.children}</div>
    // </AuthTabsProvider>
  );
}
