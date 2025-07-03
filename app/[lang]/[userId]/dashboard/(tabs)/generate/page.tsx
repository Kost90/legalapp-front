import DocumentGenerationFlow from '@/components/DocumentFlowSteper/DocumentGenerationFlow';
import { IGenerateDocumentsContent } from '@/types/generate-documents-dictionaries';

import { getGenerateDocumentsDictionary } from './generate-documents-dictionaries';

export default async function GeneratePage(props: Readonly<{ params: { lang: 'ua' | 'en' } }>) {
  const { lang } = await props.params;
  const dictionary: IGenerateDocumentsContent = await getGenerateDocumentsDictionary(lang);
  return <DocumentGenerationFlow lang={lang} dictionary={dictionary} />;
}
