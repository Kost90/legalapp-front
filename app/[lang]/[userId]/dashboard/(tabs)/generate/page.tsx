import { Metadata } from 'next';
import GenerateDocumentClientPage from './page.client';
import { getGenerateDocumentsDictionary } from './generate-documents-dictionaries';
import { IGenerateDocumentsContent } from '@/types/documents/generate-documents-dictionaries';

export const metadata: Metadata = { title: 'Generate document' };

export default async function GeneratePage(props: Readonly<{ params: { lang: string } }>) {
  const { lang } = await props.params;
  const dictionary: IGenerateDocumentsContent = await getGenerateDocumentsDictionary(lang);
  return <GenerateDocumentClientPage dictionary={dictionary} language={lang} />;
}
