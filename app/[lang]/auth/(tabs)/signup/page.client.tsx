'use client';
import { AnimatePresence, motion } from 'motion/react';
import { FC } from 'react';
import { ReactNode } from 'react';
import { Form, FormProvider, useForm, UseFormReturn, useFormState } from 'react-hook-form';

import { signUp } from '@/api/auth/signUp';
import { useAuthError } from '@/app/[lang]/auth/auth-error-context';
import { useAuthTabs } from '@/components/Authtabs/context';
import Button from '@/components/Button/Button';
import PhoneNumber, { mergePhoneNumber } from '@/components/PhoneNumber/PhoneNumber';
import VerifyYourEmail from '@/components/VerifyYourEmail/VerifyYourEmail';
import PageTitle from '@/components/PageTitle/PageTitle';
import { useParams, useRouter } from 'next/navigation';
import { signUpFormSchema, TypeSignUpFormSchema } from '@/schemas/signUpFormSchema';
import { zodResolver } from '@hookform/resolvers/zod';
import FormInput from '@/components/Input/Input';

type FormValues = {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  phoneNumber: string;
  callingCode: string;
};

export default function SignupPageClient() {
  const router = useRouter();
  const params = useParams();
  const { setHideTabs } = useAuthTabs();
  const { setError } = useAuthError();
  const methods = useForm<TypeSignUpFormSchema>({
    resolver: zodResolver(signUpFormSchema),
    defaultValues: {
      firstName: '',
      lastName: '',
      email: '',
      password: '',
      phoneNumber: '',
      callingCode: '',
    },
  });

  const onSubmit = async (data: FormValues) => {
    try {
      await signUp({
        firstName: data.firstName,
        lastName: data.lastName,
        email: data.email,
        phoneNumber: mergePhoneNumber(data.callingCode, data.phoneNumber),
        password: data.password,
      });

      setHideTabs(true);
      //   const lang = (params.lang as string) || ('ua' as string);

      //   router.push(`/${lang}`);
    } catch (error: any) {
      const parsedError = JSON.parse(error.message);
      if (parsedError.field) {
        methods.setError(parsedError.field, { message: parsedError.message });
      } else setError(parsedError.message);
      methods.setError('root', { message: parsedError.message });
    }
  };
  // TODO: Add lang and show VerifyEmail
  return (
    <FormProvider {...methods}>
      <PageTitle className="mb-6 max-w-md mx-auto" title="Create your account" />
      <form onSubmit={methods.handleSubmit(onSubmit)} className="max-w-md mx-auto p-4 bg-secondary shadow rounded">
        <FormInput name="firstName" label="Firstname" placeholder="Your firstname" />
        <FormInput name="lastName" label="Lastname" placeholder="Your lastname" />
        <FormInput name="email" label="Email" placeholder="Your email" />
        <FormInput name="password" label="Password" placeholder="password" />
        <PhoneNumber occupyErrorSpace={false} />
        <Button buttonType="submit" loading={methods.formState.isSubmitting || methods.formState.isSubmitSuccessful}>
          Submit
        </Button>
        {/* {methods.formState.errors.root?.message && <p className="text-red-500 mt-2 text-center">{methods.formState.errors.root.message}</p>} */}
      </form>
    </FormProvider>
  );
}
