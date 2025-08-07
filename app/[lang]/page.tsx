type PageProps = {
  params: {
    lang: string;
  };
};
import PageContainer from '@/components/Container/PageContainer';
import AboutServices from '@/components/Home/AboutServices';
import HeroSection from '@/components/Home/HeroSection';
import OurBenefitsSection from '@/components/Home/OurBenefitsSection';
import TrustSection from '@/components/Home/TrustSection';
import WhyChooseSection from '@/components/Home/WhyChooseSection';
import { SiteContent } from '@/types/dictionaries';

import { getDictionary } from './dictionaries';

export default async function Home({ params }: PageProps) {
  const { lang } = await params;
  const dictionary: SiteContent = await getDictionary(lang);

  return (
    <PageContainer>
      <HeroSection dictionary={dictionary} lang={lang} />
      <TrustSection dictionary={dictionary} lang={lang} />
      <OurBenefitsSection dictionary={dictionary} lang={lang} />
      <AboutServices lang={lang as 'ua' | 'en'} />
      <WhyChooseSection />
    </PageContainer>
  );
}
