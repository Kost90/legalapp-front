'use client';

import { useEffect, useState } from 'react';
import { FormProvider, UseFormReturn } from 'react-hook-form';

import DynamicFormFields from '@/components/DynamicFormFields/DynamicFormFields';
import Button from '@/components/Button/Button';

import { IGenerateDocumentsContent } from '@/types/documents/generate-documents-dictionaries';
import { formFieldsSchemas } from '@/lib/formsFields/powerOfAttorneyProperty';
import { FORM_STEPS, GenerateStep, useGenerateDocument, useGenerateDocumentForm } from '@/context/generateStepper/GenerateDocumentStepper';
import { FieldSchema } from '@/types/documents/formInput';
import SubmitButton from './SubmmitButton';
import GenerateDocumentsStepper from './DocumentStepper';

export default function DocumentFlow({ lang, dictionary }: { lang: string; dictionary: IGenerateDocumentsContent }) {
  const { step, setStep, onSubmit, generatedPdfUrl, selectedDocument } = useGenerateDocument();
  const form = useGenerateDocumentForm();
  const [formFieldsSchema, setFormFieldsSchema] = useState<FieldSchema[] | null>(null);

  useEffect(() => {
    if (selectedDocument && lang) {
      setFormFieldsSchema(formFieldsSchemas[selectedDocument]?.[lang]?.[step.key] ?? null);
    }
  }, [selectedDocument, lang, step.key]);
  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="before:border-b before:overlay before:pointer-events-none before:border-border-faint z-[2]">
        {selectedDocument && (
          <div className="z-10 top-0 bg-white">
            <GenerateDocumentsStepper />
          </div>
        )}
      </div>

      {selectedDocument && formFieldsSchema && (
        <FormProvider {...form}>
          <DynamicForm formSchema={formFieldsSchema} handleSubmit={onSubmit} lang={lang} currentStep={step} setStep={setStep} />
        </FormProvider>
      )}

      {step.key === 'result' && (
        <div className="text-center space-y-4">
          <p className="text-lg font-semibold">{dictionary.documentsCategories.resultMessage}</p>
          <iframe src={generatedPdfUrl} className="w-full h-[80vh] border rounded" />
          <a
            href={generatedPdfUrl}
            download="generated.pdf"
            className="inline-block px-6 py-2 bg-link-btn-text text-white rounded-md hover:opacity-90"
          >
            {lang === 'ua' ? 'Завантажити' : 'Download'}
          </a>
        </div>
      )}
    </div>
  );
}

const DynamicForm = ({
  handleSubmit,
  lang,
  formSchema,
  currentStep,
  setStep,
}: {
  handleSubmit: ReturnType<UseFormReturn['handleSubmit']>;
  lang: string;
  formSchema: FieldSchema[];
  currentStep: GenerateStep;
  setStep: (value: GenerateStep) => void;
}) => {
  const activeIndex = FORM_STEPS.indexOf(currentStep);
  const previousStep = FORM_STEPS[activeIndex - 1];

  return (
    <form onSubmit={handleSubmit} className="relative max-w-md mx-auto p-4 bg-white shadow rounded">
      <DynamicFormFields schema={formSchema} />

      <div className="flex justify-between">
        {previousStep && (
          <Button onClick={() => setStep(previousStep)}>
            <span>{lang === 'ua' ? 'Назад' : 'Back'}</span>
          </Button>
        )}

        <SubmitButton lang={lang} fieldsToValidate={formSchema} />
      </div>
    </form>
  );
};
