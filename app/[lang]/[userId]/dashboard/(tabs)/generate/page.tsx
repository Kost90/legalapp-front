import { getDictionary } from '@/app/[lang]/dictionaries';
import { SiteContent } from '@/types/dictionaries';
import { Metadata } from 'next';
import GenerateDocumentClientPage from './page.client';

export const metadata: Metadata = { title: 'Generate document' };

export default async function GeneratePage(props: Readonly<{ params: { lang: string } }>) {
  const { lang } = await props.params;
  const dictionary: SiteContent = await getDictionary(lang);
  return <GenerateDocumentClientPage dictionary={dictionary} />;
}
