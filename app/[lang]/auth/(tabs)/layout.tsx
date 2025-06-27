import { ReactNode } from 'react';

import AuthTabs from '@/components/Authtabs/AuthTabs';
import { AuthTabsProvider } from '@/components/Authtabs/context';

export default async function AuthLayout(props: Readonly<{ children: ReactNode; params: { lang: string } }>) {
  const { lang } = await props.params;
  return (
    <AuthTabsProvider>
      <AuthTabs lang={lang} />

      <div className="container mx-auto pb-24 md:pb-48">{props.children}</div>
    </AuthTabsProvider>
  );
}
