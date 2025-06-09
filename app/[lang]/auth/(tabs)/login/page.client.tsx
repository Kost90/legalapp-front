'use client';

import { useForm, FormProvider } from 'react-hook-form';
import Cookies from 'js-cookie';

import FormInput from '@/components/Input/Input';
import { getLoginFormSchema, LoginFormSchema } from '@/schemas/loginFormSchema';
import { zodResolver } from '@hookform/resolvers/zod';
import { useAuthError } from '@/app/[lang]/auth/auth-error-context';
import { login } from '@/api/auth/login';
import { useRouter, useParams } from 'next/navigation';
import Button from '@/components/Button/Button';
import { useAuthTabs } from '@/components/Authtabs/context';
import PageTitle from '@/components/PageTitle/PageTitle';
import { useAuth } from '@/context/AuthProvider';

type FormValues = {
  email: string;
  password: string;
};

export default function LoginForm({ lang }: { lang: string }) {
  const router = useRouter();
  const params = useParams();
  const { setHideTabs } = useAuthTabs();
  const { setError } = useAuthError();
  const { loginFun } = useAuth();
  const methods = useForm<LoginFormSchema>({
    resolver: zodResolver(getLoginFormSchema(lang)),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const onSubmit = async (data: FormValues) => {
    try {
      const res = await login(data);

      Cookies.set('access_token', res.data.accessToken);
      Cookies.set('refresh_token', res.data.refreshToken);
      Cookies.set('action_token', res.data.actionToken);
      const lang = (params.lang as string) || ('ua' as string);
      loginFun();
      router.push(`/${lang}/redirect`);
    } catch (error: any) {
      const parsedError = JSON.parse(error.message);
      if (parsedError.message === 'email_is_not_verified') {
        setHideTabs(true);
      }
      setError(parsedError.message);
      methods.setError('root', { message: parsedError.message });
    }
  };

  return (
    <FormProvider {...methods}>
      <PageTitle className="mb-6 max-w-md mx-auto" title={lang === 'ua' ? 'Увійти до аккаунту' : 'Log In'} />
      <form onSubmit={methods.handleSubmit(onSubmit)} className="max-w-md mx-auto p-4 shadow rounded-sm border-btn-border-color bg-white">
        <FormInput name="email" label="Email" placeholder={lang === 'ua' ? 'Твій email' : 'Your email'} />
        <FormInput name="password" label="Password" placeholder="password" />
        <Button buttonType="submit" loading={methods.formState.isSubmitting || methods.formState.isSubmitSuccessful}>
          {lang === 'ua' ? 'Увійти' : 'Submit'}
        </Button>
        {/* {methods.formState.errors.root?.message && <p className="text-red-500 mt-2 text-center">{methods.formState.errors.root.message}</p>} */}
      </form>
    </FormProvider>
  );
}
