import { ReactNode } from 'react';

import AuthLayoutClient from './layout.client';

export default function AuthLayout(props: Readonly<{ children: ReactNode }>) {
  return (
    <div className="flex flex-1 items-center">
      <AuthLayoutClient>{props.children}</AuthLayoutClient>
    </div>
  );
}
