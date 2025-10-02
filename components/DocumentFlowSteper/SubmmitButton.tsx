import { useCallback } from 'react';
import { useFormState } from 'react-hook-form';

import Button from '@/components/Button/Button';
import { useGenerateDocument, useGenerateDocumentForm } from '@/context/generateDocument/GenerateDocumentProvider';
import { FORM_STEPS } from '@/lib/formsSteps/forms-steps';
import { FieldSchema } from '@/types/formInput';

export type ISubmitButtomProps = {
  lang: 'ua' | 'en';
  fieldsToValidate: FieldSchema[];
  setIsErrorExist: (value: boolean) => void;
};

export default function SubmitButton({ lang, fieldsToValidate, setIsErrorExist }: ISubmitButtomProps) {
  const { setStep, step, onSubmit, setCompletedStepIndex, selectedDocument } = useGenerateDocument();
  const form = useGenerateDocumentForm<typeof selectedDocument>();
  const formState = useFormState({ control: form.control });

  const isLastStepBeforeResult = step.key === 'meta';
  const fieldsNames = fieldsToValidate.map((field) => field.name);

  const handelNextStep = useCallback(async () => {
    const activeIndex = FORM_STEPS[selectedDocument][lang].findIndex((s) => s.key === step.key);
    const nextStep = FORM_STEPS[selectedDocument][lang][activeIndex + 1];
    const isValid = await form.trigger(fieldsNames as never);
    if (isValid) {
      setIsErrorExist(false);
      setStep(nextStep);
      setCompletedStepIndex(activeIndex);
    } else {
      setIsErrorExist(true);
    }
  }, [selectedDocument, lang, step, form, fieldsNames, setIsErrorExist, setStep, setCompletedStepIndex]);

  return (
    <div className="relative">
      <Button
        buttonType={'button'}
        loading={formState.isSubmitting}
        isInStepper={true}
        onClick={async () => {
          if (step.key === 'meta') {
            await onSubmit();
          } else {
            await handelNextStep();
          }
        }}
      >
        <span>{isLastStepBeforeResult ? (lang === 'ua' ? 'Згенерувати' : 'Generate') : lang === 'ua' ? 'Далі' : 'Continue'}</span>
      </Button>
    </div>
  );
}
