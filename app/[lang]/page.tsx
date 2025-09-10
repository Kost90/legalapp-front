import { Metadata } from 'next';

import PageContainer from '@/components/Container/PageContainer';
import ContactPromptSection from '@/components/Home/ContactPromptSection';
import HeroSection from '@/components/Home/HeroSection';
import HowItWorksSection from '@/components/Home/HowItWorksSection';
import PopularDocumentsSection from '@/components/Home/PopularDocumentsSection';
import ServiceAdvantagesSection from '@/components/Home/ServiceAdvantagesSection';
import TrustSection from '@/components/Home/TrustSection';
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
