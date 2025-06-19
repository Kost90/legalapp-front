import { request } from '@/api/request';
import { Tokens } from '@/types/user';

type LoginBody = {
  email: string;
  password: string;
  otp?: string;
};

export const login = async (body: LoginBody) =>
  await request<{ data: Tokens }, LoginBody>(
    '/auth/login',
    {
      method: 'POST',
      body: body,
      responseType: 'json',
    },
    {
      email: {
        'Email is not verified': 'Please verify your email.',
      },
    },
  );
