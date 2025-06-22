import Button from '@/components/Button/Button';
import { FORM_STEPS, useGenerateDocument, useGenerateDocumentForm } from '@/context/generateStepper/GenerateDocumentStepper';
import { PropertyPowerOfAttorneyFormData } from '@/schemas/generateDocuments/powerOfAttorneySchema';
import { FieldSchema } from '@/types/documents/formInput';
import { useCallback, useMemo } from 'react';
import { useFormState, useWatch } from 'react-hook-form';

export default function SubmitButton({ lang, fieldsToValidate }: { lang: string; fieldsToValidate: FieldSchema[] }) {
  const form = useGenerateDocumentForm();
  const { setStep, step, onSubmit } = useGenerateDocument();

  const activeIndex = FORM_STEPS.indexOf(step);
  const nextStep = FORM_STEPS[activeIndex + 1];
  const isLastStepBeforeResult = step.key === 'meta';

  const fieldsNames = fieldsToValidate.map((field) => field.name);

  const handelNextStep = useCallback(async () => {
    if (!fieldsNames) {
      setStep(nextStep);
    }

    // TODO: think how to make it type anotation automate
    const isValid = await form.trigger(fieldsNames as any);
    if (isValid) {
      setStep(nextStep);
    }
  }, [step]);

  const formState = useFormState(form);

  return (
    <div className="relative">
      <Button
        buttonType="submit"
        loading={formState.isSubmitting}
        onClick={async () => {
          if (step.key === 'meta') {
            onSubmit();
          } else {
            handelNextStep();
          }
        }}
      >
        <span>{isLastStepBeforeResult ? (lang === 'ua' ? 'Згенерувати' : 'Generate') : lang === 'ua' ? 'Далі' : 'Continue'}</span>
      </Button>
    </div>
  );
}
