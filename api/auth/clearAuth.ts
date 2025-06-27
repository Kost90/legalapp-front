'use server';

import { cookies } from 'next/headers';
// import { redirect } from 'next/navigation';

export const clearAuth = async () => {
  const ck = await cookies();

  ck.delete('user');
  ck.delete('access_token');
  ck.delete('refresh_token');
  ck.delete('action_token');
};

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const clearAuthAndRedirect = async (lang: string): Promise<void> => {
  await clearAuth();

  // redirect(`/${lang}/auth/login`);
};
