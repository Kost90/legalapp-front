'use client';

import { AnimatePresence } from 'framer-motion';
import { ReactNode, useCallback, useState } from 'react';

import { getEmptyDocumentExample } from '@/api/documents/getEmptyDocumentExample';
import CardCategory from '@/components/CardCategory/CardCategory';
import DocumentExplanation from '@/components/DocumentExplanation/DocumentExplanation';
import DocumentSelector from '@/components/DocumentSelector/DocumentSelector';
import DocumentGenerationLoader from '@/components/GenerateDocumentLoader/DocumentGenerationLoader';
import PageTitle from '@/components/PageTitle/PageTitle';
import { ErrorModal } from '@/components/ui/Modals/ErrorModal';
import { useModals } from '@/components/ui/Modals/ModalProvider';
import { SuccessModal } from '@/components/ui/Modals/SuccessModal';
import { GenerateDocumentProvider } from '@/context/generateDocument/GenerateDocumentProvider';
import { DOCUMENT_TYPE } from '@/lib/constants/common-documents';
import { MODALS_MESSAGES_EN, MODALS_MESSAGES_UA } from '@/lib/modals-messages';
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
  const { open } = useModals();
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedDocument, setSelectedDocument] = useState<DOCUMENT_TYPE | string>('');
  const [document, setDocument] = useState<DOCUMENT_TYPE | string>('');
  const [documentLang, setDocumentLang] = useState<'ua' | 'en'>('ua');
  const [generatedPdfUrl, setGeneratedPdfUrl] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handelGetEmptyExample = useCallback(
    async (documentType: DOCUMENT_TYPE, email: string, textLang: 'ua' | 'en', documentLang: 'ua' | 'en') => {
      setIsLoading(true);
      try {
        const { url } = await getEmptyDocumentExample(documentType, email, textLang, documentLang);

        if (url) {
          setGeneratedPdfUrl(url);
          open(SuccessModal, {
            title: props.lang === 'ua' ? 'Вітаємо!' : 'Congratulation!',
            message:
              props.lang === 'ua' ? MODALS_MESSAGES_UA.SUCCESSFULL_GENERATE_DOCUMENT : MODALS_MESSAGES_EN.SUCCESSFULL_GENERATE_DOCUMENT,
            lang: props.lang,
            downlaodBtn: true,
            generatedPdfUrl: url,
            selectedDocument: document,
          });
        }
      } catch (error) {
        open(ErrorModal, {
          title: props.lang === 'ua' ? 'Нажаль сталась помилка.' : 'Sorry, an error occurred.',
          message: props.lang === 'ua' ? MODALS_MESSAGES_UA.ERROR_GENERATE_DOCUMENT : MODALS_MESSAGES_EN.ERROR_GENERATE_DOCUMENT,
          lang: props.lang,
        });
        console.error(error);
      } finally {
        setIsLoading(false);
        setDocument('');
      }
    },
    [open, props.lang, document],
  );

  const handleCategoryClick = useCallback((category: string) => {
    setSelectedCategory(category);
  }, []);

  if (isLoading && !generatedPdfUrl) {
    return (
      <div className="flex flex-col items-center justify-center py-16">
        <DocumentGenerationLoader />
        <p className="text-text-muted mt-4 text-lg font-medium">{props.dictionary.generatedMessage}</p>
      </div>
    );
  }

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
          handelGetEmptyExample={handelGetEmptyExample}
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
