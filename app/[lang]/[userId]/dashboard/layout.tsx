import { ReactNode } from 'react';

import DashboardLayoutClient from './layout.client';

export default function AuthenticatedLayout(props: { children: ReactNode }) {
  return (
    <main className="flex-1 overflow-hidden">
      <DashboardLayoutClient>{props.children}</DashboardLayoutClient>
    </main>
  );
}
