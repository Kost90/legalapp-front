'use client';
import DatePickerInput from '@/components/DatePickerInput/DatePickerInput';
import FormInput from '@/components/Input/Input';
import { FieldSchema } from '@/types/formInput';

export default function DynamicFormFields({ schema, lang }: { schema: FieldSchema[]; lang: string }) {
  return (
    <>
      {schema.map((field) => {
        if (field.type === 'date') {
          return <DatePickerInput key={field.name} label={field.label} name={field.name} lang={lang} />;
        }

        return <FormInput key={field.name} label={field.label} name={field.name} type={field.type} />;
      })}
    </>
  );
}
