'use client';

import { ReactNode, useCallback, useState } from 'react';
import { FORM_STEPS, GenerateDocumentProvider, GenerateStep } from '@/context/generateStepper/GenerateDocumentStepper';
import { IGenerateDocumentsContent } from '@/types/documents/generate-documents-dictionaries';
import CardCategory from '@/components/CardCategory/CardCategory';
import DocumentSelector from '@/components/DocumentSelector/DocumentSelector';

export default function GenerateDocumentLayoutClient(
  props: Readonly<{ children: ReactNode; lang: string; dictionary: IGenerateDocumentsContent }>,
) {
  const [step, setStep] = useState<GenerateStep>(FORM_STEPS[0]);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedDocument, setSelectedDocument] = useState<string | null>(null);
  const [document, setDocument] = useState<string | null>(null);

  const handleCategoryClick = useCallback(
    (category: string) => {
      setSelectedCategory(category);
    },
    [selectedCategory],
  );

  return (
    <GenerateDocumentProvider setStep={setStep} step={step} lang={props.lang} selectedDocument={selectedDocument ?? ''}>
      {!selectedCategory && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-6">
          {Object.entries(props.dictionary.documentsCategories).map(([category, docs]) => (
            <CardCategory
              key={category}
              title={category}
              description={props.lang === 'ua' ? `Документів: ${docs.length}` : `Documents: ${docs.length}`}
              onClick={() => handleCategoryClick(category)}
            />
          ))}
        </div>
      )}

      {selectedCategory && !selectedDocument && (
        <DocumentSelector
          options={props.dictionary.documentsCategories[selectedCategory]}
          value={document}
          onChange={setDocument}
          onBack={() => {
            setDocument(null);
            setSelectedCategory(null);
          }}
          onNext={() => setSelectedDocument(document)}
          lang={props.lang}
        />
      )}

      {props.children}
    </GenerateDocumentProvider>
  );
}
