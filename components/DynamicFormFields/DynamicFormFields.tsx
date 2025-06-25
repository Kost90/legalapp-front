'use client';
import FormInput from '@/components/Input/Input';
import { FieldSchema } from '@/types/documents/formInput';

export default function DynamicFormFields({ schema }: { schema: FieldSchema[] }) {
  return (
    <>
      {schema.map((field) => {
        return <FormInput key={field.name} label={field.label} name={field.name} type={field.type} />;
      })}
    </>
  );
}
