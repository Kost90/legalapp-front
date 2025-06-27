import { SelectHTMLAttributes } from 'react';
import { useFormContext } from 'react-hook-form';

import FormGroup from '@/components/FormGroup/FormGroup';
import { cn } from '@/utils/cn';

interface Option {
  label: string;
  value: string;
}

interface FormSelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  name: string;
  label: string;
  options: Option[];
  description?: string;
}

export default function FormSelect({ name, label, options, description, ...rest }: FormSelectProps) {
  const {
    register,
    formState: { errors },
  } = useFormContext();

  const error = errors[name]?.message as string | undefined;

  return (
    <FormGroup label={label} description={description} error={error}>
      <select
        {...register(name)}
        {...rest}
        className={cn(
          'mt-1 block w-full rounded-md border border-gray-300 py-2 pr-10 pl-3 text-base focus:border-indigo-500 focus:ring-indigo-500 focus:outline-none sm:text-sm',
          {
            'mt-1 text-xs text-red-600': error,
          },
        )}
      >
        {options.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
    </FormGroup>
  );
}
