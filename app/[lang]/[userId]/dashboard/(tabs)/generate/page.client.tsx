'use client';
import DocumentFlow from '@/components/Container/DocumentFlowSteper/DocumentFlowSteper';
import { IGenerateDocumentsContent } from '@/types/documents/generate-documents-dictionaries';

function GenerateDocumentClientPage({ dictionary, language }: { dictionary: IGenerateDocumentsContent; language: string }) {
  return <DocumentFlow lang={language} dictionary={dictionary} />;
}

export default GenerateDocumentClientPage;
