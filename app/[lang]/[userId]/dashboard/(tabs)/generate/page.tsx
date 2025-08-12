import DocumentGenerationFlow from '@/components/DocumentFlowSteper/DocumentGenerationFlow';
import { IGenerateDocumentsContent } from '@/types/generate-documents-dictionaries';

import { getGenerateDocumentsDictionary } from './generate-documents-dictionaries';

import { PageProps } from '@/.next/types/app/[lang]/[userId]/dashboard/(tabs)/generate/page';

export default async function GeneratePage({ params }: PageProps) {
  const resolvedParams = await params;
  const { lang } = resolvedParams!;
  const dictionary: IGenerateDocumentsContent = await getGenerateDocumentsDictionary(lang);
  return <DocumentGenerationFlow lang={lang} dictionary={dictionary} />;
}
