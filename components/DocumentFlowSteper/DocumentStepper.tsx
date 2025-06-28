import Stepper from '@/components/Stepper/Stepper';
import { useGenerateDocument, useGenerateDocumentForm } from '@/context/generateStepper/GenerateDocumentStepper';
import { FORM_STEPS } from '@/lib/formsSteps/forms-steps';
import { FieldSchema } from '@/types/formInput';

export default function GenerateDocumentsStepper({ formSchema }: { formSchema: FieldSchema[] }) {
  const form = useGenerateDocumentForm();
  const { step, setStep, completedStepIndex, setCompletedStepIndex, isErrorExist, setIsErrorExist } = useGenerateDocument();
  const fieldsNames = formSchema.map((field) => field.name);
  const activeIndex = FORM_STEPS.indexOf(step);
  const prevStep = FORM_STEPS[activeIndex - 1];
  const indexOfPrevStep = FORM_STEPS.indexOf(prevStep);

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

  return (
    <Stepper
      isErrorExist={isErrorExist}
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
