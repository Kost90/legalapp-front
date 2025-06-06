'use client';

import { useForm, FormProvider } from 'react-hook-form';
import Cookies from 'js-cookie';

import FormInput from '@/components/Input/Input';
import { loginFormSchema, typeLoginFormSchema } from '@/schemas/loginFormSchema';
import { zodResolver } from '@hookform/resolvers/zod';
import { useAuthError } from '@/app/[lang]/auth/auth-error-context';
import { login } from '@/api/auth/login';
import { useRouter, useParams } from 'next/navigation';
import Button from '@/components/Button/Button';

type FormValues = {
  email: string;
  password: string;
};

export default function LoginForm() {
  const router = useRouter();
  const params = useParams();
  const { setError } = useAuthError();
  const methods = useForm<typeLoginFormSchema>({
    resolver: zodResolver(loginFormSchema),
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

      router.push(`/${lang}/redirect`);
    } catch (error: any) {
      const parsedError = JSON.parse(error.message);
      setError(parsedError.message);
      methods.setError('root', { message: parsedError.message });
    }
  };

  return (
    <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit(onSubmit)} className="max-w-md mx-auto p-4 bg-secondary shadow rounded">
        <FormInput name="email" label="Email" placeholder="Your email" />
        <FormInput name="password" label="Password" placeholder="password" />
        <Button buttonType="submit" loading={methods.formState.isSubmitting || methods.formState.isSubmitSuccessful}>
          Submit
        </Button>
        {/* {methods.formState.errors.root?.message && <p className="text-red-500 mt-2 text-center">{methods.formState.errors.root.message}</p>} */}
      </form>
    </FormProvider>
  );
}
