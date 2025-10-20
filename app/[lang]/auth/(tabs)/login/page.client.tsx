'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import Cookies from 'js-cookie';
import { useRouter, useParams } from 'next/navigation';
import { useForm, FormProvider } from 'react-hook-form';

import { login } from '@/api/auth/login';
import { useAuthError } from '@/app/[lang]/auth/auth-error-context';
import { useAuthTabs } from '@/components/Authtabs/context';
import PageTitle from '@/components/PageTitle/PageTitle';
import Button from '@/components/ui/button/Button';
import FormInput from '@/components/ui/Input/Input';
import { useAuth } from '@/context/AuthProvider';
import { getLoginFormSchema, LoginFormSchema } from '@/schemas/auth/loginFormSchema';

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
      <PageTitle className="mx-auto mb-6 max-w-md" title={lang === 'ua' ? 'Увійти до аккаунту' : 'Log In'} />
      <form onSubmit={methods.handleSubmit(onSubmit)} className="border-btn-border-color mx-auto max-w-md rounded-sm bg-white p-4 shadow">
        <FormInput name="email" label="Email" placeholder={lang === 'ua' ? 'Твій email' : 'Your email'} />
        <FormInput name="password" label="Password" placeholder="password" type="password" />
        <Button buttonType="submit" loading={methods.formState.isSubmitting || methods.formState.isSubmitSuccessful}>
          {lang === 'ua' ? 'Увійти' : 'Submit'}
        </Button>
      </form>
    </FormProvider>
  );
}
