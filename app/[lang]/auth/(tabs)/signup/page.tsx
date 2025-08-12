import { Metadata } from 'next';

import { getDictionary } from '@/app/[lang]/dictionaries';
import { SiteContent } from '@/types/dictionaries';

import SignupPageClient from './page.client';

import { PageProps } from '@/.next/types/app/[lang]/auth/(tabs)/signup/page';

export const metadata: Metadata = { title: 'Signup' };

export default async function SignupPage({ params }: PageProps) {
  const resolvedParams = await params;
  const { lang } = resolvedParams!;
  const t: SiteContent = await getDictionary(lang);
  return <SignupPageClient lang={lang} dictionary={t} />;
}
