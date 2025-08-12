import { Metadata } from 'next';

import LoginForm from './page.client';

import { PageProps } from '@/.next/types/app/[lang]/auth/(tabs)/login/page';

export const metadata: Metadata = { title: 'Login' };

export default async function LoginPage({ params }: PageProps) {
  const resolvedParams = await params;
  const { lang } = resolvedParams!;
  return <LoginForm lang={lang} />;
}
