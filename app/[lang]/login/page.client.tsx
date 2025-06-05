'use client';

import { useForm, FormProvider } from 'react-hook-form';
import FormInput from '@/components/Input/Input';
import FormSelect from '@/components/Select/Select';
import { demoFormSchema, DemoFormSchema } from '@/schemas/loginFormSchema';
import { zodResolver } from '@hookform/resolvers/zod';

type FormValues = {
  name: string;
  email: string;
  role: string;
};

export default function DemoForm() {
  const methods = useForm<DemoFormSchema>({
    resolver: zodResolver(demoFormSchema),
    defaultValues: {
      name: '',
      email: '',
      role: '',
    },
  });

  const onSubmit = (data: FormValues) => {
    console.log(data);
  };

  return (
    <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit(onSubmit)} className="max-w-md mx-auto p-4 bg-secondary shadow rounded">
        <FormInput name="name" label="Name" placeholder="Your name" />
        <FormInput name="email" label="Email" type="email" placeholder="you@example.com" />
        <FormSelect
          name="role"
          label="Role"
          options={[
            { value: '', label: 'Select role' },
            { value: 'admin', label: 'Admin' },
            { value: 'user', label: 'User' },
          ]}
        />
        <button type="submit" className="mt-4 w-full py-2 px-4 bg-blue-600 text-white rounded hover:bg-blue-700 transition">
          Submit
        </button>
      </form>
    </FormProvider>
  );
}
