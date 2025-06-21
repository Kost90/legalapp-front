'use client';

import { useEffect, useMemo, useState } from 'react';
import { FormProvider, UseFormReturn, useFormState, useWatch } from 'react-hook-form';

import DynamicFormFields from '@/components/DynamicFormFields/DynamicFormFields';
import Button from '@/components/Button/Button';

import { IGenerateDocumentsContent } from '@/types/documents/generate-documents-dictionaries';
import { formFieldsSchemas } from '@/lib/formsFields/powerOfAttorneyProperty';
import { FORM_STEPS, GenerateStep, useGenerateDocument, useGenerateDocumentForm } from '@/context/generateStepper/GenerateDocumentStepper';
import Stepper from '@/components/Stepper/Stepper';
import { FieldSchema } from '@/types/documents/formInput';

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
          <p className="text-lg font-semibold">Документ успешно сгенерирован!</p>
          <iframe src={generatedPdfUrl} className="w-full h-[80vh] border rounded" />
          <a
            href={generatedPdfUrl}
            download="generated.pdf"
            className="inline-block px-6 py-2 bg-link-btn-text text-white rounded-md hover:opacity-90"
          >
            Скачать
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
            <span>Back</span>
          </Button>
        )}

        <SubmitButton />
      </div>
    </form>
  );
};

const GenerateDocumentsStepper = () => {
  const { step, setStep, documentDetails } = useGenerateDocument();

  const form = useGenerateDocumentForm();
  const values = useWatch({ control: form.control });

  // TODO: Think about making it reusable
  const filledStepIndex = useMemo(() => {
    if (!values.fullName && !values.birthDate && !values.tin && !values.address && !values.passport && !values.passportIssueDate) return 0;
    if (!values.representativeName && !values.representativeBirthDate && !values.representativeTIN && !values.representativeAddress)
      return 1;
    if (
      !values.city &&
      !values.propertyAddress?.city &&
      !values.propertyAddress?.street &&
      !values.propertyAddress?.buildNumber &&
      !values.propertyAddress?.apartment &&
      !values.propertyAddress?.postCode
    )
      return 2;
    if (!values.date && !values.validUntil) return 3;

    return 4;
  }, [values, documentDetails]);

  return (
    <Stepper
      activeStep={step.key}
      filledStepIndex={filledStepIndex}
      setActiveStep={(value: string) => setStep(FORM_STEPS.find((step) => step.key === value)!)}
      steps={
        FORM_STEPS as unknown as {
          label: string;
          key: string;
        }[]
      }
    />
  );
};

function SubmitButton() {
  const form = useGenerateDocumentForm();
  const { setStep, step, onSubmit } = useGenerateDocument();

  const activeIndex = FORM_STEPS.indexOf(step);
  const nextStep = FORM_STEPS[activeIndex + 1];

  const values = useWatch({ control: form.control });
  const isHidden = useMemo(() => {
    if (
      step.key === 'person' &&
      !values.fullName &&
      !values.birthDate &&
      !values.tin &&
      !values.address &&
      !values.passport &&
      !values.passportIssueDate
    )
      return true;
    if (
      step.key === 'representative' &&
      !values.representativeName &&
      !values.representativeBirthDate &&
      !values.representativeTIN &&
      !values.representativeAddress
    )
      return true;
    if (
      step.key === 'property' &&
      !values.propertyAddress?.city &&
      !values.propertyAddress?.street &&
      !values.propertyAddress?.buildNumber &&
      !values.propertyAddress?.apartment &&
      !values.propertyAddress?.postCode
    )
      return true;
    if (step.key === 'meta' && !values.date && !values.validUntil) return true;

    return false;
  }, [step.key, values]);

  const formState = useFormState(form);

  if (isHidden) return null;

  //   if (step.key === 'result') {
  //     return (
  //       <Link
  //         className="contents"
  //         href={'/'}
  //         tabIndex={-1}
  //       >
  //         <Button className="px-32 md-max:flex-1">
  //           <span>Go to Dashboard</span>
  //         </Button>
  //       </Link>
  //     );
  //   }

  return (
    <div className="relative">
      <Button
        buttonType="submit"
        loading={formState.isSubmitting}
        onClick={async () => {
          if (step.key === 'meta') {
            onSubmit();
          } else {
            setStep(nextStep!);
          }
        }}
      >
        <span>Continue</span>
      </Button>
    </div>
  );
}
