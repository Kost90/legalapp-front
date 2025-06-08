import { Metadata } from 'next';

import LoginForm from './page.client';

export const metadata: Metadata = { title: 'Login' };

export default async function LoginPage(props: Readonly<{ params: { lang: string } }>) {
  const { lang } = await props.params;
  return <LoginForm lang={lang} />;
}
