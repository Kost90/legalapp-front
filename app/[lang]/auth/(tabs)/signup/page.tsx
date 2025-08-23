import { Metadata } from 'next';

import { getDictionary } from '@/app/[lang]/dictionaries';
import { SiteContent } from '@/types/dictionaries';

import SignupPageClient from './page.client';

import { PageProps } from '@/.next/types/app/[lang]/auth/(tabs)/signup/page';

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { lang } = await params;
  const dictionary = await getDictionary(lang);

  return {
    title: dictionary.auth.signup.meta_title,
    robots: {
      index: false,
      follow: true,
    },
  };
}

export default async function SignupPage({ params }: PageProps) {
  const resolvedParams = await params;
  const { lang } = resolvedParams!;
  const t: SiteContent = await getDictionary(lang);
  return <SignupPageClient lang={lang} dictionary={t} />;
}
