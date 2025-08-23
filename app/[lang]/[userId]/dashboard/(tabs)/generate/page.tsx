import { Metadata } from 'next';

import { getDictionary } from '@/app/[lang]/dictionaries';
import DocumentGenerationFlow from '@/components/DocumentFlowSteper/DocumentGenerationFlow';
import { IGenerateDocumentsContent } from '@/types/generate-documents-dictionaries';

import { getGenerateDocumentsDictionary } from './generate-documents-dictionaries';

import { PageProps } from '@/.next/types/app/[lang]/[userId]/dashboard/(tabs)/generate/page';

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { lang } = await params;
  const dictionary = await getDictionary(lang);

  return {
    title: dictionary.generate_documents.meta_title,
    robots: {
      index: false,
      follow: false,
    },
  };
}

export default async function GeneratePage({ params }: PageProps) {
  const resolvedParams = await params;
  const { lang } = resolvedParams!;
  const dictionary: IGenerateDocumentsContent = await getGenerateDocumentsDictionary(lang);
  return <DocumentGenerationFlow lang={lang} dictionary={dictionary} />;
}
