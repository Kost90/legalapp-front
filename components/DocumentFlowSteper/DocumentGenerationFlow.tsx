'use client';

import DynamicForm from '@/components/DynamicForm/DynamicForm';
import Stepper from '@/components/Stepper/Stepper';
import { useGenerateDocument } from '@/context/generateStepper/GenerateDocumentStepper';
import useDocumetFlow from '@/hooks/useDocumetFlow';
import { FORM_STEPS } from '@/lib/formsSteps/forms-steps';
import { IGenerateDocumentsContent } from '@/types/generate-documents-dictionaries';

export default function DocumentGenerationFlow({ lang, dictionary }: { lang: string; dictionary: IGenerateDocumentsContent }) {
  const { step, setStep, generatedPdfUrl, completedStepIndex } = useGenerateDocument();
  const { formFieldsSchema, shouldShowFormAndStepper, setIsErrorExist, isErrorExist, handleStepClick } = useDocumetFlow(lang);

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
                  FORM_STEPS as unknown as {
                    label: string;
                    key: string;
                  }[]
                }
              />
            </div>
          </div>
          <DynamicForm formSchema={formFieldsSchema} lang={lang} setStep={setStep} setIsErrorExist={setIsErrorExist} />
        </>
      )}

      {step.key === 'result' && (
        <div className="space-y-4 text-center">
          <p className="text-lg font-semibold">{dictionary.documentsCategories.resultMessage}</p>
          <iframe title="Generated PDF preview" key={generatedPdfUrl} src={generatedPdfUrl} className="h-[80vh] w-full rounded border" />
          <a
            href={generatedPdfUrl}
            download="generated.pdf"
            className="bg-link-btn-text inline-block rounded-md px-6 py-2 text-white hover:opacity-90"
          >
            {lang === 'ua' ? 'Завантажити' : 'Download'}
          </a>
        </div>
      )}
    </div>
  );
}
