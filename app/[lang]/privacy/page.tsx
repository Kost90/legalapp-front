import { Metadata } from 'next';

import { getDictionary } from '@/app/[lang]/dictionaries';
import { PrivacyClientPage } from '@/app/[lang]/privacy/_components/ClientPrivacyPolicyPage';
import { SiteContent } from '@/types/dictionaries';

import { PageProps } from '@/.next/types/app/[lang]/privacy/page';

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { lang } = await params;
  const dictionary: SiteContent = await getDictionary(lang);
  const privacyDictionary = dictionary.privacy_policy;

  return {
    title: privacyDictionary.meta_title,
    description: privacyDictionary.meta_description,
    openGraph: {
      title: privacyDictionary.meta_title,
      description: privacyDictionary.meta_description,
    },
    twitter: {
      title: privacyDictionary.meta_title,
      description: privacyDictionary.meta_description,
    },
  };
}

async function PrivacyPage({ params }: PageProps) {
  const { lang } = await params;
  const dictionary: SiteContent = await getDictionary(lang);

  return <PrivacyClientPage dictionary={dictionary.privacy_policy} />;
}

export default PrivacyPage;
