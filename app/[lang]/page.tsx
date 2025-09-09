import { Metadata } from 'next';

import PageContainer from '@/components/Container/PageContainer';
import AboutServices from '@/components/Home/AboutServices';
import ContactPromptSection from '@/components/Home/ContactPromptSection';
import FAQSection from '@/components/Home/FaqSection';
import HeroSection from '@/components/Home/HeroSection';
import OurBenefitsSection from '@/components/Home/OurBenefitsSection';
import PopularDocumentsSection from '@/components/Home/PopularDocumentsSection';
import TrustSection from '@/components/Home/TrustSection';
import WhyChooseSection from '@/components/Home/WhyChooseSection';
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
      <OurBenefitsSection dictionary={dictionary} lang={lang} />
      <AboutServices lang={lang as 'ua' | 'en'} />
      <WhyChooseSection dictionary={dictionary} />
      <FAQSection dictionary={dictionary} lang={lang} />
      <ContactPromptSection dictionary={dictionary} />
    </PageContainer>
  );
}
