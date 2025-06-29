import { useMemo, useState } from 'react';

import { useGenerateDocument, useGenerateDocumentForm } from '@/context/generateStepper/GenerateDocumentStepper';
import { formFieldsSchemas } from '@/lib/formsFields/powerOfAttorneyProperty';
import { FORM_STEPS } from '@/lib/formsSteps/forms-steps';
import { FieldSchema } from '@/types/formInput';

function useDocumetFlow(lang: string) {
  const form = useGenerateDocumentForm();
  const { step, setStep, selectedDocument, setCompletedStepIndex } = useGenerateDocument();
  const [isErrorExist, setIsErrorExist] = useState<boolean>(false);

  const formFieldsSchema: FieldSchema[] = useMemo(() => {
    if (!selectedDocument || !lang) return null;
    return formFieldsSchemas[selectedDocument]?.[lang]?.[step.key] ?? null;
  }, [selectedDocument, lang, step]);

  const shouldShowFormAndStepper = selectedDocument && formFieldsSchema;

  const fieldsNames = selectedDocument && Array.isArray(formFieldsSchema) ? formFieldsSchema.map((field) => field.name) : [];
  const activeIndex = FORM_STEPS.indexOf(step);
  const previousStep = FORM_STEPS[activeIndex - 1];
  const indexOfPrevStep = FORM_STEPS.indexOf(previousStep);

  const handleStepClick = async (newStepKey: string) => {
    const newStepIndex = FORM_STEPS.findIndex((s) => s.key === newStepKey);

    if (newStepIndex > activeIndex) {
      const isValid = await form.trigger(fieldsNames as never);
      if (isValid) {
        form.clearErrors();
        setStep(FORM_STEPS[newStepIndex]);
        setCompletedStepIndex(activeIndex);
      } else {
        setIsErrorExist(true);
      }
    }

    if (newStepIndex === indexOfPrevStep) {
      form.clearErrors();
      setIsErrorExist(false);
      setStep(FORM_STEPS[newStepIndex]);
    }
  };

  const handelFormClearErrors = () => {
    form.clearErrors();
    setIsErrorExist(false);
  };

  return {
    formFieldsSchema,
    shouldShowFormAndStepper,
    handleStepClick,
    handelFormClearErrors,
    activeIndex,
    previousStep,
    isErrorExist,
    setIsErrorExist,
  };
}

export default useDocumetFlow;
