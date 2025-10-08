'use client';

import { uk } from 'date-fns/locale/uk';
import DatePicker, { registerLocale } from 'react-datepicker';
import { useFormContext, Controller } from 'react-hook-form';

import FormGroup from '@/components/FormGroup/FormGroup';
import { cn } from '@/utils/cn';

import 'react-datepicker/dist/react-datepicker.css';

registerLocale('uk', uk);

interface DatePickerInputProps {
  name: string;
  label: string;
  lang: string;
  placeholder?: string;
}

export default function DatePickerInput({ name, label, lang, placeholder = 'ДД.ММ.РРРР' }: DatePickerInputProps) {
  const {
    control,
    formState: { errors },
  } = useFormContext();

  const getNestedError = (errors: any, path: string) => {
    const pathParts = path.split('.');
    return pathParts.reduce((acc, part) => acc && acc[part], errors);
  };

  const errorObject = getNestedError(errors, name);
  const error = errorObject?.message as string | undefined;

  return (
    <Controller
      name={name}
      control={control}
      render={({ field }) => (
        <FormGroup label={label} error={error}>
          <DatePicker
            selected={field.value as Date | null}
            onChange={(date: Date | null) => field.onChange(date)}
            onBlur={field.onBlur}
            locale={lang === 'ua' ? 'uk' : 'en-US'}
            dateFormat="dd.MM.yyyy"
            placeholderText={lang === 'ua' ? placeholder : 'dd.mm.yyyy'}
            autoComplete="off"
            showYearDropdown
            showMonthDropdown
            dropdownMode="select"
            className={cn(
              'border-btn-border-color focus:ring-link-btn-text focus:border-link-btn-text mt-1 block w-full rounded-md border bg-white px-3 py-2 focus:outline-none sm:text-sm',
              { 'border-red-500': error },
            )}
          />
        </FormGroup>
      )}
    />
  );
}
