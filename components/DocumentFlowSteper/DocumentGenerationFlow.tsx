'use client';

import DynamicForm from '@/components/DynamicForm/DynamicForm';
import DocumentGenerationLoader from '@/components/GenerateDocumentLoader/DocumentGenerationLoader';
import Stepper from '@/components/Stepper/Stepper';
import { useGenerateDocument } from '@/context/generateStepper/GenerateDocumentStepper';
import useDocumetFlow from '@/hooks/useDocumetFlow';
import { FORM_STEPS } from '@/lib/formsSteps/forms-steps';
import { IGenerateDocumentsContent } from '@/types/generate-documents-dictionaries';

export default function DocumentGenerationFlow({ lang, dictionary }: { lang: 'ua' | 'en'; dictionary: IGenerateDocumentsContent }) {
  const { step, generatedPdfUrl, completedStepIndex, selectedDocument, isLoading } = useGenerateDocument();
  const { formFieldsSchema, shouldShowFormAndStepper, setIsErrorExist, isErrorExist, handleStepClick } = useDocumetFlow(lang);
  let content = null;

  if (isLoading && !generatedPdfUrl) {
    content = (
      <div className="flex flex-col items-center justify-center py-16">
        <DocumentGenerationLoader />
        <p className="text-text-muted mt-4 text-lg font-medium">{dictionary.generatedMessage}</p>
      </div>
    );
  }

  if (step.key === 'result' && !isLoading && generatedPdfUrl) {
    content = (
      <div className="space-y-4 text-center">
        <p className="text-lg font-semibold">{dictionary.documentsCategories.resultMessage}</p>
        <iframe title="Generated PDF preview" key={generatedPdfUrl} src={generatedPdfUrl} className="h-[80vh] w-full rounded border" />
        <a
          href={generatedPdfUrl}
          download="generated.pdf"
          className="bg-link-btn-text inline-block rounded-md px-6 py-2 text-white hover:opacity-90"
        >
          {dictionary.downloadMessage}
        </a>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-4xl p-6">
      {shouldShowFormAndStepper && (
        <>
          <div className="before:overlay before:border-border-faint z-[2] before:pointer-events-none before:border-b">
            <div className="top-0 z-10 bg-white">
              <Stepper
                isErrorExist={isErrorExist}
                activeStep={step.key}
                filledStepIndex={completedStepIndex}
                setActiveStep={handleStepClick}
                steps={
                  FORM_STEPS[selectedDocument][lang] as unknown as {
                    label: string;
                    key: string;
                  }[]
                }
              />
            </div>
          </div>
          {formFieldsSchema && !isLoading ? (
            <DynamicForm formSchema={formFieldsSchema} lang={lang} setIsErrorExist={setIsErrorExist} />
          ) : null}
        </>
      )}
      {content}
    </div>
  );
}
