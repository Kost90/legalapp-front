import Stepper from '@/components/Stepper/Stepper';
import { FORM_STEPS, useGenerateDocument, useGenerateDocumentForm } from '@/context/generateStepper/GenerateDocumentStepper';

export default function GenerateDocumentsStepper() {
  const { step, setStep, completedStepIndex, setCompletedStepIndex } = useGenerateDocument();

  const handleStepClick = (newStepKey: string) => {
    const newStepIndex = FORM_STEPS.findIndex((s) => s.key === newStepKey);

    if (newStepIndex <= completedStepIndex + 1) {
      setStep(FORM_STEPS[newStepIndex]);
    }
  };

  return (
    <Stepper
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
  );
}
