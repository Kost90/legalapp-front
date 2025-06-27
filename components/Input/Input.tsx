'use client';
import { Eye, EyeOff } from 'lucide-react';
import { InputHTMLAttributes, useState } from 'react';
import { FieldErrors, useFormContext } from 'react-hook-form';

import FormGroup from '@/components/FormGroup/FormGroup';
import { cn } from '@/utils/cn';

interface FormInputProps extends InputHTMLAttributes<HTMLInputElement> {
  name: string;
  label: string;
  description?: string;
  labelClassName?: string;
}
// TODO: Think how to improve type anotation in accumulator
const getNestedError = (errors: FieldErrors, path: string) => {
  const pathParts = path.split('.');
  return pathParts.reduce((acc, part) => acc && acc[part], errors as Record<string, any>);
};

export default function FormInput({ name, label, description, labelClassName, ...rest }: FormInputProps) {
  const [isShowPassword, setIsShowPassword] = useState<boolean>(false);
  const {
    register,
    formState: { errors },
  } = useFormContext();
  const isPasswordType = rest.type === 'password';
  const type = isPasswordType && isShowPassword ? 'text' : rest.type;
  const errorObject = getNestedError(errors, name);
  const error = errorObject?.message as string | undefined;

  return (
    <FormGroup label={label} description={description} error={error} labelClassName={labelClassName}>
      <div className="relative">
        <input
          {...register(name)}
          {...rest}
          type={type}
          className={cn(
            'border-btn-border-color focus:ring-link-btn-text focus:border-link-btn-text mt-1 block w-full rounded-md border bg-white px-3 py-2 pr-10 focus:outline-none sm:text-sm',
            {
              'border-red-500': error,
            },
          )}
        />

        {isPasswordType && (
          <button
            type="button"
            onClick={() => setIsShowPassword((prev) => !prev)}
            className="absolute inset-y-0 right-2 flex items-center text-gray-500 hover:text-gray-700"
            tabIndex={-1}
          >
            {isShowPassword ? <EyeOff size={18} /> : <Eye size={18} />}
          </button>
        )}
      </div>
    </FormGroup>
  );
}
