import { Metadata } from 'next';

import SignupPageClient from './page.client';

export const metadata: Metadata = { title: 'Signup' };

export default function SignupPage() {
  return <SignupPageClient />;
}
