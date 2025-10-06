import { ReactNode } from 'react';

import DashboardLayoutClient from './layout.client';

export default function AuthenticatedDashboardLayout(props: { children: ReactNode }) {
  return (
    <div className="flex-1 overflow-hidden px-5 lg:px-40">
      <DashboardLayoutClient>{props.children}</DashboardLayoutClient>
    </div>
  );
}
