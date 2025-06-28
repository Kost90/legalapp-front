'use client';

import { useMemo } from 'react';
import { UseFormReturn } from 'react-hook-form';

import Button from '@/components/Button/Button';
import DynamicFormFields from '@/components/DynamicFormFields/DynamicFormFields';
import { GenerateStep, useGenerateDocument, useGenerateDocumentForm } from '@/context/generateStepper/GenerateDocumentStepper';
import { formFieldsSchemas } from '@/lib/formsFields/powerOfAttorneyProperty';
import { FORM_STEPS } from '@/lib/formsSteps/forms-steps';
import { FieldSchema } from '@/types/formInput';
import { IGenerateDocumentsContent } from '@/types/generate-documents-dictionaries';

import GenerateDocumentsStepper from './DocumentStepper';
import SubmitButton from './SubmmitButton';

export default function DocumentFlow({ lang, dictionary }: { lang: string; dictionary: IGenerateDocumentsContent }) {
  const { step, setStep, generatedPdfUrl, selectedDocument, setIsErrorExist } = useGenerateDocument();

  const formFieldsSchema = useMemo(() => {
    if (!selectedDocument || !lang) return null;
    return formFieldsSchemas[selectedDocument]?.[lang]?.[step.key] ?? null;
  }, [selectedDocument, lang, step]);

  const shouldShowFormAndStepper = selectedDocument && formFieldsSchema;

  return (
    <div className="mx-auto max-w-4xl p-6">
      {shouldShowFormAndStepper && (
        <>
          <div className="before:overlay before:border-border-faint z-[2] before:pointer-events-none before:border-b">
            <div className="top-0 z-10 bg-white">
              <GenerateDocumentsStepper formSchema={formFieldsSchema} />
            </div>
          </div>
          <DynamicForm formSchema={formFieldsSchema} lang={lang} currentStep={step} setStep={setStep} setIsErrorExist={setIsErrorExist} />
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

const DynamicForm = ({
  lang,
  formSchema,
  currentStep,
  setStep,
  setIsErrorExist,
}: {
  handleSubmit?: ReturnType<UseFormReturn['handleSubmit']>;
  lang: string;
  formSchema: FieldSchema[];
  currentStep: GenerateStep;
  setStep: (value: GenerateStep) => void;
  setIsErrorExist: (value: boolean) => void;
}) => {
  const form = useGenerateDocumentForm();
  const activeIndex = FORM_STEPS.indexOf(currentStep);
  const previousStep = FORM_STEPS[activeIndex - 1];

  return (
    <form className="relative mx-auto max-w-md rounded bg-white p-4 shadow">
      <DynamicFormFields schema={formSchema} lang={lang} />

      <div className="flex justify-between">
        {previousStep && (
          <Button
            onClick={() => {
              form.clearErrors();
              setIsErrorExist(false);
              setStep(previousStep);
            }}
          >
            <span>{lang === 'ua' ? 'Назад' : 'Back'}</span>
          </Button>
        )}

        <SubmitButton lang={lang} fieldsToValidate={formSchema} />
      </div>
    </form>
  );
};
