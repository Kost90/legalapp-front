import { ReactNode } from 'react';

import DashboardTabs from '@/components/DashboardTabs/DashboardTabs';

export default async function AuthLayout(props: Readonly<{ children: ReactNode; params: { lang: string } }>) {
  const { lang } = await props.params;
  return (
    <>
      <DashboardTabs lang={lang} />

      <div className="pb-24 md:pb-48 container mx-auto ">{props.children}</div>
    </>
  );
}
