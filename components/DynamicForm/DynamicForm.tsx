import { UseFormReturn } from 'react-hook-form';

import Button from '@/components/Button/Button';
import SubmitButton from '@/components/DocumentFlowSteper/SubmmitButton';
import DynamicFormFields from '@/components/DynamicFormFields/DynamicFormFields';
import useDocumetFlow from '@/hooks/useDocumetFlow';
import { FieldSchema } from '@/types/formInput';

export default function DynamicForm({
  lang,
  formSchema,
  setIsErrorExist,
}: {
  handleSubmit?: ReturnType<UseFormReturn['handleSubmit']>;
  lang: 'ua' | 'en';
  formSchema: FieldSchema[];
  setIsErrorExist: (value: boolean) => void;
}) {
  const { previousStep, handelBackStep } = useDocumetFlow(lang);

  return (
    <form className="relative mx-auto max-w-md rounded bg-white p-4 shadow">
      <DynamicFormFields schema={formSchema} lang={lang} />

      <div className="flex justify-between">
        {previousStep && (
          <Button
            onClick={() => {
              handelBackStep();
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
