import { useMemo, useState } from 'react';

import { useGenerateDocument, useGenerateDocumentForm } from '@/context/generateStepper/GenerateDocumentStepper';
import { formFieldsSchemas } from '@/lib/formsFields/powerOfAttorneyProperty';
import { FORM_STEPS } from '@/lib/formsSteps/forms-steps';
import { FieldSchema } from '@/types/formInput';

function useDocumetFlow(lang: 'ua' | 'en') {
  const { step, setStep, selectedDocument, setCompletedStepIndex } = useGenerateDocument();
  const form = useGenerateDocumentForm<typeof selectedDocument>();
  const [isErrorExist, setIsErrorExist] = useState<boolean>(false);

  const formFieldsSchema = useMemo<FieldSchema[] | null>(() => {
    if (!selectedDocument || !lang) return null;
    return formFieldsSchemas[selectedDocument]?.[lang]?.[step.key] ?? null;
  }, [selectedDocument, lang, step]);

  const shouldShowFormAndStepper = selectedDocument && formFieldsSchema;

  const fieldsNames = selectedDocument && Array.isArray(formFieldsSchema) ? formFieldsSchema.map((field) => field.name) : [];
  const activeIndex = FORM_STEPS[selectedDocument][lang].indexOf(step);
  const previousStep = FORM_STEPS[selectedDocument][lang][activeIndex - 1];
  const indexOfPrevStep = FORM_STEPS[selectedDocument][lang].indexOf(previousStep);

  const handleStepClick = async (newStepKey: string) => {
    const newStepIndex = FORM_STEPS[selectedDocument][lang].findIndex((s) => s.key === newStepKey);

    if (newStepIndex > activeIndex) {
      const isValid = await form.trigger(fieldsNames as never);
      if (isValid) {
        form.clearErrors();
        setStep(FORM_STEPS[selectedDocument][lang][newStepIndex]);
        setCompletedStepIndex(activeIndex);
      } else {
        setIsErrorExist(true);
      }
    }

    if (newStepIndex === indexOfPrevStep) {
      form.clearErrors();
      setIsErrorExist(false);
      setStep(FORM_STEPS[selectedDocument][lang][newStepIndex]);
    }
  };

  const handelFormClearErrors = () => {
    form.clearErrors();
    setIsErrorExist(false);
  };

  const handelBackStep = () => {
    handelFormClearErrors();
    setIsErrorExist(false);
    setStep(previousStep);
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
    handelBackStep,
  };
}

export default useDocumetFlow;
