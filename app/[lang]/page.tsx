import { Metadata } from 'next';

import ContactPromptSection from '@/app/[lang]/_components/ContactPromptSection';
import HeroSection from '@/app/[lang]/_components/HeroSection';
import HowItWorksSection from '@/app/[lang]/_components/HowItWorksSection';
import PopularDocumentsSection from '@/app/[lang]/_components/PopularDocumentsSection';
import ServiceAdvantagesSection from '@/app/[lang]/_components/ServiceAdvantagesSection';
import TrustSection from '@/app/[lang]/_components/TrustSection';
import PageContainer from '@/components/Container/PageContainer';
import { SiteContent } from '@/types/dictionaries';

import { getDictionary } from './dictionaries';

import { PageProps } from '@/.next/types/app/[lang]/page';

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { lang } = await params;
  const dictionary = await getDictionary(lang);
  const meta = dictionary.meta;

  return {
    title: meta.title,
    description: meta.description,

    openGraph: {
      title: meta.ogTitle,
      description: meta.ogDescription,
    },
  };
}

export default async function Home({ params }: PageProps) {
  const { lang } = await params;
  const dictionary: SiteContent = await getDictionary(lang);

  return (
    <PageContainer>
      <HeroSection dictionary={dictionary} lang={lang} />
      <PopularDocumentsSection dictionary={dictionary} lang={lang} />
      <TrustSection dictionary={dictionary} lang={lang} />
      <HowItWorksSection dictionary={dictionary} />
      <ServiceAdvantagesSection dictionary={dictionary} />
      <ContactPromptSection dictionary={dictionary} lang={lang} />
    </PageContainer>
  );
}
