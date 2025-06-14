import { getDictionary } from '@/app/[lang]/dictionaries';
import PageTitle from '@/components/PageTitle/PageTitle';
import { SiteContent } from '@/types/dictionaries';
import { Metadata } from 'next';

export const metadata: Metadata = { title: 'Generate document' };

export default async function GeneratePage(props: Readonly<{ params: { lang: string } }>) {
  // TODO: add to dictionary content
  const { lang } = await props.params;
  const dictionary: SiteContent = await getDictionary(lang);
  return <PageTitle title={dictionary.hero.title} />;
}
