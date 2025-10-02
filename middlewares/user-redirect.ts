import { NextResponse } from 'next/server';

import { clearAuth } from '@/api/auth/clearAuth';
import { MiddlewareCustom } from '@/utils/middleware-chain';

import { getUserId } from './auth';

const defaultLocale = 'ua';

export const userRedirect: MiddlewareCustom = async (req, event, res, next) => {
  const { pathname } = req.nextUrl;
  const lang = pathname.split('/')[1] || defaultLocale;

  if (pathname.startsWith(`/${lang}/redirect`)) {
    try {
      const userId = await getUserId();

      if (!userId) {
        void clearAuth();
        return NextResponse.redirect(new URL(`/${lang}/auth/login`, req.url));
      }

      return NextResponse.redirect(new URL(`/${lang}/${userId}/dashboard/generate`, req.url));
    } catch {
      void clearAuth();
      return NextResponse.redirect(new URL(`/${lang}/auth/login`, req.url));
    }
  }

  return next(req, event, res);
};
