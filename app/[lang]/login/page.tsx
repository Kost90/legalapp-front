import { Metadata } from 'next';

import LoginPageClient from './page.client';

export const metadata: Metadata = { title: 'Login' };

export default function LoginPage() {
  return <LoginPageClient />;
}
