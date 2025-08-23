import { Metadata } from 'next';

import { getDictionary } from '@/app/[lang]/dictionaries';

import LoginForm from './page.client';

import { PageProps } from '@/.next/types/app/[lang]/auth/(tabs)/login/page';

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { lang } = await params;
  const dictionary = await getDictionary(lang);

  return {
    title: dictionary.auth.login.meta_title,
    robots: {
      index: false,
      follow: true,
    },
  };
}

export default async function LoginPage({ params }: PageProps) {
  const resolvedParams = await params;
  const { lang } = resolvedParams!;
  return <LoginForm lang={lang} />;
}
