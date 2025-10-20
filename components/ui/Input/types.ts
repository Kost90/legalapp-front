import { UseFormRegister, FieldError, Path } from 'react-hook-form';

export interface BaseFieldProps<TFormValues extends Record<string, unknown>> {
  name: Path<TFormValues>;
  label: string;
  register: UseFormRegister<TFormValues>;
  error?: FieldError;
  className?: string;
  labelClassName?: string;
  inputClassName?: string;
  errorClassName?: string;
}
