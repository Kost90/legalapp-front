import { ReactNode } from 'react';

import { AuthTabsProvider } from '@/components/Authtabs/context';
import AuthTabs from '@/components/Authtabs/AuthTabs';

export default async function AuthLayout(props: Readonly<{ children: ReactNode; params: { lang: string } }>) {
  const { lang } = await props.params;
  return (
    <AuthTabsProvider>
      <AuthTabs lang={lang} />

      <div className="pb-24 md:pb-48 container mx-auto ">{props.children}</div>
    </AuthTabsProvider>
  );
}
