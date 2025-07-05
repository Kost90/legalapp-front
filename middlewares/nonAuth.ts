import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

import { clearAuth } from '@/api/auth/clearAuth';

import { getUserId } from './auth';

export async function handleNonAuth(request: NextRequest) {
  const defaultLocale = 'ua';
  const cookieStore = await cookies();
  const accessToken = cookieStore.get('access_token');

  if (accessToken) {
    const { pathname } = request.nextUrl;
    const lang = pathname.split('/')[1] || defaultLocale;
    const userId = await getUserId();

    if (!userId) {
      void clearAuth();
      return NextResponse.redirect(new URL(`/${lang}/auth/login`, request.url));
    }
    return NextResponse.redirect(new URL(`/${lang}/${userId}/dashboard/generate`, request.url));
  }
}
