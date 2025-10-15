'use client';
import DatePickerInput from '@/components/DatePickerInput/DatePickerInput';
import FormInput from '@/components/Input/Input';
import PeriodValidRadioSelector from '@/components/RadioSelector/RadioSelector';
import FormSelect from '@/components/Select/Select';
import { FieldSchema, Options } from '@/types/formInput';

export default function DynamicFormFields({ schema, lang }: { schema: FieldSchema[]; lang: string }) {
  return (
    <>
      {schema.map((field) => {
        if (field.type === 'date') {
          return <DatePickerInput key={field.name} label={field.label} name={field.name} lang={lang} />;
        }

        if (field.type === 'radio') {
          return <PeriodValidRadioSelector key={field.name} label={field.label} name={field.name} lang={lang} required={field.required} />;
        }

        if (field.type === 'select') {
          return <FormSelect key={field.name} name={field.name} label={field.label} options={field.options as Options[]} />;
        }

        return <FormInput key={field.name} label={field.label} name={field.name} type={field.type} />;
      })}
    </>
  );
}
