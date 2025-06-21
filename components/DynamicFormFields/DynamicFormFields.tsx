'use client';
import { FieldSchema } from '@/types/documents/formInput';
import FormInput from '../Input/Input';

export default function DynamicFormFields({ schema }: { schema: FieldSchema[] }) {
  return (
    <>
      {schema.map((field) => {
        return <FormInput key={field.name} label={field.label} name={field.name} type={field.type} />;
      })}
    </>
  );
}
