import { getGenerateDocumentsDictionary } from './generate-documents-dictionaries';
import { IGenerateDocumentsContent } from '@/types/documents/generate-documents-dictionaries';
import DocumentFlow from '@/components/Container/DocumentFlowSteper/DocumentFlowSteper';

export default async function GeneratePage(props: Readonly<{ params: { lang: string } }>) {
  const { lang } = await props.params;
  const dictionary: IGenerateDocumentsContent = await getGenerateDocumentsDictionary(lang);
  return <DocumentFlow lang={lang} dictionary={dictionary} />;
}
