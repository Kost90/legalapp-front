'use client';
import { FormProvider, useForm, UseFormReturn, useFormState } from 'react-hook-form';

import { signUp } from '@/api/auth/signUp';
import { useAuthError } from '@/app/[lang]/auth/auth-error-context';
import { useAuthTabs } from '@/components/Authtabs/context';
import Button from '@/components/Button/Button';
import PhoneNumber, { mergePhoneNumber } from '@/components/PhoneNumber/PhoneNumber';
import VerifyYourEmail from '@/components/VerifyYourEmail/VerifyYourEmail';
import PageTitle from '@/components/PageTitle/PageTitle';
import { getSignUpFormSchema } from '@/schemas/signUpFormSchema';
import { zodResolver } from '@hookform/resolvers/zod';
import FormInput from '@/components/Input/Input';

type FormValues = {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  phone: string;
  callingCode: string;
};

export default function SignupPageClient({ lang }: { lang: string }) {
  const { setHideTabs } = useAuthTabs();
  const { setError } = useAuthError();

  const form = useForm({ resolver: zodResolver(getSignUpFormSchema(lang)), defaultValues: { callingCode: '380' } });
  const formState = useFormState({ control: form.control });

  const onSubmit = async (data: FormValues) => {
    try {
      await signUp({
        firstName: data.firstName,
        lastName: data.lastName,
        email: data.email,
        phone: mergePhoneNumber(data.callingCode, data.phone),
        password: data.password,
      });

      setHideTabs(true);
    } catch (error: any) {
      const parsedError = JSON.parse(error.message);
      if (parsedError.field) {
        form.setError(parsedError.field, { message: parsedError.message });
      } else setError(parsedError.message);
      form.setError('root', { message: parsedError.message });
    }
  };

  return (
    <FormProvider {...form}>
      {formState.isSubmitSuccessful ? (
        <VerifyYourEmail
          onBack={() => {
            form.reset();
            setHideTabs(false);
          }}
        />
      ) : (
        <>
          <PageTitle className="mb-6 max-w-md mx-auto" title={lang === 'ua' ? 'Створи свій аккаунт' : 'Create your account'} />
          <SignUpForm form={form} handleSubmit={onSubmit} lang={lang} />
        </>
      )}
    </FormProvider>
  );
}

const SignUpForm = ({ form, handleSubmit, lang }: { form: UseFormReturn<any>; handleSubmit: (e: any) => void; lang: string }) => {
  const formState = useFormState({ control: form.control });
  return (
    <form onSubmit={form.handleSubmit(handleSubmit)} className="relative max-w-md mx-auto p-4 bg-white shadow rounded">
      <FormInput name="firstName" label={lang === 'ua' ? 'Імя' : 'Firstname'} placeholder={lang === 'ua' ? 'твоє імя' : 'your firstname'} />
      <FormInput
        name="lastName"
        label={lang === 'ua' ? 'Прізвище' : 'Lastname'}
        placeholder={lang === 'ua' ? 'твоє прізвище' : 'your lastname'}
      />
      <FormInput name="email" label="Email" placeholder={lang === 'ua' ? 'твій email' : 'your email'} />
      <FormInput name="password" label="Password" placeholder="password" />
      <PhoneNumber occupyErrorSpace={false} />
      <Button buttonType="submit" loading={formState.isSubmitting || formState.isSubmitSuccessful}>
        {lang === 'ua' ? 'Зареєструватись' : 'Submit'}
      </Button>
    </form>
  );
};
