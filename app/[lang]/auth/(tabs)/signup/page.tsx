import { Metadata } from 'next';

import { getDictionary } from '@/app/[lang]/dictionaries';
import { SiteContent } from '@/types/dictionaries';

import SignupPageClient from './page.client';

export const metadata: Metadata = { title: 'Signup' };

export default async function SignupPage(props: Readonly<{ params: { lang: string } }>) {
  const { lang } = await props.params;
  const t: SiteContent = await getDictionary(lang);
  return <SignupPageClient lang={lang} dictionary={t} />;
}
