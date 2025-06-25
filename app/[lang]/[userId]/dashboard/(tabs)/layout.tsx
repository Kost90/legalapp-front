import { ReactNode } from 'react';

import DashboardTabs from '@/components/DashboardTabs/DashboardTabs';
import { ModalProvider } from '@/components/Modals/ModalProvider';

export default async function AuthLayout(props: Readonly<{ children: ReactNode; params: { lang: string } }>) {
  const { lang } = await props.params;
  return (
    <ModalProvider>
      <DashboardTabs lang={lang} />

      <div className="container mx-auto pb-24 md:pb-48">{props.children}</div>
    </ModalProvider>
  );
}
