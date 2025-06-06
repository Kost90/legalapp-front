import { Metadata } from 'next';

import LoginForm from './page.client';

export const metadata: Metadata = { title: 'Login' };

export default function LoginPage() {
  return <LoginForm />;
}
