import Button from '@/components/Button/Button';
import { useGenerateDocument, useGenerateDocumentForm } from '@/context/generateStepper/GenerateDocumentStepper';
import { FORM_STEPS } from '@/lib/formsSteps/forms-steps';
import { FieldSchema } from '@/types/documents/formInput';
import { useCallback } from 'react';
import { useFormState } from 'react-hook-form';

export default function SubmitButton({ lang, fieldsToValidate }: { lang: string; fieldsToValidate: FieldSchema[] }) {
  const form = useGenerateDocumentForm();
  const formState = useFormState({ control: form.control });
  const { setStep, step, onSubmit, setCompletedStepIndex } = useGenerateDocument();

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
      setCompletedStepIndex(activeIndex);
    }
  }, [fieldsNames, form, setStep, nextStep, setCompletedStepIndex, activeIndex]);

  return (
    <div className="relative">
      <Button
        buttonType={'button'}
        loading={formState.isSubmitting}
        isInStepper={true}
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
