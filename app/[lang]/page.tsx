type PageProps = {
  params: {
    lang: string;
  };
};
import PageContainer from '@/components/Container/PageContainer';
import HeroSection from '@/components/Home/HeroSection';
import TrustSection from '@/components/Home/TrustSection';
import { SiteContent } from '@/types/dictionaries';

import { getDictionary } from './dictionaries';

export default async function Home({ params }: PageProps) {
  const { lang } = await params;
  const dictionary: SiteContent = await getDictionary(lang);

  return (
    <PageContainer>
      <HeroSection dictionary={dictionary} lang={lang} />
      <TrustSection dictionary={dictionary} lang={lang} />
    </PageContainer>
  );
}
