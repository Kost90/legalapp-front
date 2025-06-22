import Button from '@/components/Button/Button';
import { FORM_STEPS, useGenerateDocument, useGenerateDocumentForm } from '@/context/generateStepper/GenerateDocumentStepper';
import { FieldSchema } from '@/types/documents/formInput';
import { useMemo } from 'react';
import { useFormState, useWatch } from 'react-hook-form';

export default function SubmitButton({ lang, fieldsToValidate }: { lang: string; fieldsToValidate: FieldSchema[] }) {
  const form = useGenerateDocumentForm();
  const { setStep, step, onSubmit } = useGenerateDocument();

  const activeIndex = FORM_STEPS.indexOf(step);
  const nextStep = FORM_STEPS[activeIndex + 1];

  const FieldsNames = fieldsToValidate.map((field) => field.name);

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
        <span>{lang === 'ua' ? 'Далі' : 'Continue'}</span>
      </Button>
    </div>
  );
}
