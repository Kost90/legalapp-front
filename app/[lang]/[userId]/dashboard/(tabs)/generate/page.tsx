import DocumentFlow from '@/components/DocumentFlowSteper/DocumentFlowSteper';
import { IGenerateDocumentsContent } from '@/types/generate-documents-dictionaries';

import { getGenerateDocumentsDictionary } from './generate-documents-dictionaries';

export default async function GeneratePage(props: Readonly<{ params: { lang: string } }>) {
  const { lang } = await props.params;
  const dictionary: IGenerateDocumentsContent = await getGenerateDocumentsDictionary(lang);
  return <DocumentFlow lang={lang} dictionary={dictionary} />;
}
