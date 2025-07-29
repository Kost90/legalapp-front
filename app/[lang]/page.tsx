type PageProps = {
  params: {
    lang: string;
  };
};
import HeroSection from '@/components/Home/HeroSection';
import { SiteContent } from '@/types/dictionaries';

import { getDictionary } from './dictionaries';

export default async function Home({ params }: PageProps) {
  const { lang } = await params;
  const dictionary: SiteContent = await getDictionary(lang);

  return (
    <div className="flex min-h-screen items-center justify-center px-4 py-10 sm:px-8">
      <HeroSection dictionary={dictionary} lang={lang} />
    </div>
  );
}
