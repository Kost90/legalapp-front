import { InputHTMLAttributes } from 'react';
import { useFormContext } from 'react-hook-form';
import FormGroup from '@/components/FormGroup/FormGroup';
import { cn } from '@/utils/cn';

interface FormInputProps extends InputHTMLAttributes<HTMLInputElement> {
  name: string;
  label: string;
  description?: string;
  labelClassName?: string;
}

export default function FormInput({ name, label, description, labelClassName, ...rest }: FormInputProps) {
  const {
    register,
    formState: { errors },
  } = useFormContext();

  const error = errors[name]?.message as string | undefined;

  return (
    <FormGroup label={label} description={description} error={error} labelClassName={labelClassName}>
      <input
        {...register(name)}
        {...rest}
        className={cn(
          'mt-1 block w-full px-3 py-2 border border-btn-border-color bg-white rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm',
          {
            'border-red-500': error,
          },
        )}
      />
    </FormGroup>
  );
}
