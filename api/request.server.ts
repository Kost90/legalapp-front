'use server';

import { cookies } from 'next/headers';

import { createRequestClient } from './utils';

export const requestServer = createRequestClient({
  getAccessToken: async () => (await cookies()).get('access_token')?.value,
  getRefreshToken: async () => (await cookies()).get('refresh_token')?.value,
  setToken: async (name: string, value: string) => void (await cookies()).set(name, value)
});
