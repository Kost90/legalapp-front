'use client';

import { AnimatePresence } from 'framer-motion';
import { ReactNode, useCallback, useState } from 'react';

import CardCategory from '@/components/CardCategory/CardCategory';
import DocumentExplanation from '@/components/DocumentExplanation/DocumentExplanation';
import DocumentSelector from '@/components/DocumentSelector/DocumentSelector';
import PageTitle from '@/components/PageTitle/PageTitle';
import { GenerateDocumentProvider } from '@/context/generateDocument/GenerateDocumentProvider';
import { DOCUMENT_TYPE } from '@/lib/constants/common-documents';
import { DOCUMENTS_SCHEMAS_KEYS } from '@/schemas/generateDocuments/documentsSchemas';
import { SiteContent } from '@/types/dictionaries';
import { IGenerateDocumentsContent } from '@/types/generate-documents-dictionaries';

export default function GenerateDocumentLayoutClient(
  props: Readonly<{
    children: ReactNode;
    lang: 'ua' | 'en';
    dictionary: IGenerateDocumentsContent;
    documentsExplanationDictionary: SiteContent;
  }>,
) {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedDocument, setSelectedDocument] = useState<DOCUMENT_TYPE | string>('');
  const [document, setDocument] = useState<DOCUMENT_TYPE | string>('');
  const [documentLang, setDocumentLang] = useState<'ua' | 'en'>('ua');

  const handleCategoryClick = useCallback((category: string) => {
    setSelectedCategory(category);
  }, []);

  return (
    <>
      {!selectedCategory && (
        <>
          <PageTitle
            title={props.dictionary.documentsCategories.pageTitle}
            description={props.dictionary.documentsCategories.pageDescription}
          />
          <div className="my-10 grid grid-cols-1 gap-6 sm:grid-cols-2 md:my-20 lg:grid-cols-2">
            {Object.entries(props.dictionary.documentsCategories)
              // eslint-disable-next-line @typescript-eslint/no-unused-vars
              .filter(([category, docs]) => category !== 'pageTitle' && category !== 'pageDescription' && category !== 'resultMessage')
              .map(([category, docs]) => (
                <CardCategory
                  key={category}
                  title={category}
                  description={props.lang === 'ua' ? `Документів: ${docs.length}` : `Documents: ${docs.length}`}
                  onClick={() => handleCategoryClick(category)}
                />
              ))}
          </div>
        </>
      )}

      {selectedCategory && !selectedDocument && (
        <DocumentSelector
          options={props.dictionary.documentsCategories[selectedCategory]}
          value={document}
          onChange={setDocument}
          onBack={() => {
            setDocument('');
            setSelectedCategory(null);
          }}
          onNext={() => {
            setSelectedDocument(document);
            setDocument('');
          }}
          lang={props.lang}
          documentLang={documentLang}
          handelChangeDocumentLang={setDocumentLang}
        />
      )}
      {document && (
        <AnimatePresence mode="wait">
          <DocumentExplanation
            key={document}
            lang={props.lang}
            documentType={document as DOCUMENT_TYPE}
            dictionary={props.documentsExplanationDictionary}
          />
        </AnimatePresence>
      )}
      {selectedCategory && DOCUMENTS_SCHEMAS_KEYS.includes(selectedDocument as DOCUMENT_TYPE) && (
        <GenerateDocumentProvider lang={props.lang} selectedDocument={selectedDocument as DOCUMENT_TYPE} documentLang={documentLang}>
          {props.children}
        </GenerateDocumentProvider>
      )}
    </>
  );
}
