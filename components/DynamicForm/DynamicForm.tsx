import { Button } from '@headlessui/react';
import { UseFormReturn } from 'react-hook-form';

import SubmitButton from '@/components/DocumentFlowSteper/SubmmitButton';
import DynamicFormFields from '@/components/DynamicFormFields/DynamicFormFields';
import { GenerateStep } from '@/context/generateStepper/GenerateDocumentStepper';
import useDocumetFlow from '@/hooks/useDocumetFlow';
import { FieldSchema } from '@/types/formInput';

export default function DynamicForm({
  lang,
  formSchema,
  setStep,
  setIsErrorExist,
}: {
  handleSubmit?: ReturnType<UseFormReturn['handleSubmit']>;
  lang: string;
  formSchema: FieldSchema[];
  setStep: (value: GenerateStep) => void;
  setIsErrorExist: (value: boolean) => void;
}) {
  const { previousStep, handelFormClearErrors } = useDocumetFlow(lang);

  return (
    <form className="relative mx-auto max-w-md rounded bg-white p-4 shadow">
      <DynamicFormFields schema={formSchema} lang={lang} />

      <div className="flex justify-between">
        {previousStep && (
          <Button
            onClick={() => {
              handelFormClearErrors();
              setIsErrorExist(false);
              setStep(previousStep);
            }}
          >
            <span>{lang === 'ua' ? 'Назад' : 'Back'}</span>
          </Button>
        )}

        <SubmitButton lang={lang} fieldsToValidate={formSchema} setIsErrorExist={setIsErrorExist} />
      </div>
    </form>
  );
}
