import { Metadata } from 'next';

import SignupPageClient from './page.client';

export const metadata: Metadata = { title: 'Signup' };

export default async function SignupPage(props: Readonly<{ params: { lang: string } }>) {
  const { lang } = await props.params;
  return <SignupPageClient lang={lang} />;
}
