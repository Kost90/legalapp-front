import Stepper from '@/components/Stepper/Stepper';
import { FORM_STEPS, useGenerateDocument, useGenerateDocumentForm } from '@/context/generateStepper/GenerateDocumentStepper';
import { useMemo } from 'react';
import { useWatch } from 'react-hook-form';

export default function GenerateDocumentsStepper() {
  const { step, setStep, documentDetails } = useGenerateDocument();

  const form = useGenerateDocumentForm();
  const values = useWatch({ control: form.control });
  console.log({ values });
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
  console.log({ filledStepIndex });
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
}
