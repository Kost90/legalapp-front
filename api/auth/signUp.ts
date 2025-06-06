import { requestPublic } from '@/api/request.client';
import { User } from '@/types/user';

type SignUpBody = {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  phoneNumber: string;
};

export const signUp = async (body: SignUpBody) =>
  await requestPublic<{ data: User }, SignUpBody>(
    '/auth/register',
    {
      method: 'POST',
      body,
    },
    {
      email: {
        'User already exists': 'Email already exists',
        'Please verify your email': 'Email for verification already sent. Please verify your email',
      },
    },
  );
