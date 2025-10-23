import { UseFormReturn } from 'react-hook-form';

import SubmitButton from '@/components/DocumentFlowSteper/SubmmitButton';
import DynamicFormFields from '@/components/DynamicFormFields/DynamicFormFields';
import Button from '@/components/ui/button/Button';
import useGenerateDocumetFlow from '@/hooks/useDocumetsStepper';
import { FieldSchema } from '@/types/formInput';

export default function DynamicForm({
  lang,
  formSchema,
  setIsErrorExist,
  onStepChange,
}: {
  handleSubmit?: ReturnType<UseFormReturn['handleSubmit']>;
  lang: 'ua' | 'en';
  formSchema: FieldSchema[];
  setIsErrorExist: (value: boolean) => void;
  onStepChange: () => void;
}) {
  const { previousStep, handelBackStep } = useGenerateDocumetFlow(lang);

  return (
    <>
      <form className="relative mx-auto max-w-md rounded bg-white p-4 shadow">
        <DynamicFormFields schema={formSchema} lang={lang} />

        <div className="flex justify-between">
          {previousStep && (
            <Button
              onClick={() => {
                onStepChange();
                handelBackStep();
              }}
            >
              <span>{lang === 'ua' ? 'Назад' : 'Back'}</span>
            </Button>
          )}

          <SubmitButton lang={lang} fieldsToValidate={formSchema} setIsErrorExist={setIsErrorExist} onStepChange={onStepChange} />
        </div>
      </form>
    </>
  );
}
