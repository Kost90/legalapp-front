import { ReactNode } from 'react';

import AuthLayoutClient from './layout.client';

export default function AuthLayout(props: Readonly<{ children: ReactNode }>) {
  return (
    <div className="flex items-center flex-1">
      <AuthLayoutClient>{props.children}</AuthLayoutClient>
    </div>
  );
}
