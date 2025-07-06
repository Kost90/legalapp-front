'use server';

import 'server-only';

import { jwtVerify } from 'jose';
import { cookies } from 'next/headers';

import { clearAuth } from '@/api/auth/clearAuth';
import { refreshToken } from '@/api/utils';

export const fetchUserIdFromCookie = async () => {
  const cookieStore = await cookies();

  const verify = async () => {
    const accessToken = cookieStore.get('access_token')?.value;

    if (!accessToken) {
      void clearAuth();
      throw new Error('No access token found');
    }

    try {
      const jwt = await jwtVerify(accessToken, new TextEncoder().encode(process.env.NEXT_JWT_SECRET as string), {});

      if (!jwt.payload || typeof jwt.payload !== 'object') return;

      return jwt.payload.id as string;
    } catch {
      const _refreshToken = cookieStore.get('refresh_token')?.value;

      if (!_refreshToken) {
        void clearAuth();
        throw new Error('No refresh token found');
      } else {
        await refreshToken({
          refreshToken: _refreshToken,
          setToken: async (name: string, value: string) => cookieStore.set(name, value),
        });

        return await verify();
      }
    }
  };

  return verify();
};
