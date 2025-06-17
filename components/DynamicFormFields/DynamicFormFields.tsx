'use client';
import FormInput from '../Input/Input';

export type FieldSchema = {
  name: string;
  label: string;
  type: string;
  required: boolean;
};

export default function DynamicFormFields({ schema }: { schema: FieldSchema[] }) {
  return (
    <>
      {schema.map((field) => {
        return <FormInput key={field.name} label={field.label} name={field.name} type={field.type} />;
      })}
    </>
  );
}
