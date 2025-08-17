import { NextRequest, NextResponse } from 'next/server';

import { clearAuth } from './api/auth/clearAuth';
import { getUserId } from './middlewares/auth';
import { handleNonAuth } from './middlewares/nonAuth';

const locales = ['ua', 'en'];
const defaultLocale = 'ua';

// Получение локали
// eslint-disable-next-line @typescript-eslint/no-unused-vars
function getLocale(request: NextRequest) {
  return defaultLocale;
}

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  const pathnameHasLocale = locales.some((locale) => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`);

  if (!pathnameHasLocale) {
    const locale = getLocale(request);
    const redirectUrl = request.nextUrl.clone();
    redirectUrl.pathname = `/${locale}${pathname}`;
    return NextResponse.redirect(redirectUrl);
  }

  const lang = pathname.split('/')[1] || defaultLocale;

  if (pathname.startsWith(`/${lang}/auth/`)) {
    const redirection = await handleNonAuth(request);
    if (redirection) return redirection;
    return NextResponse.next();
  }

  if (pathname.startsWith(`/${lang}/redirect`)) {
    try {
      const userId = await getUserId();

      if (!userId) {
        void clearAuth();
        return NextResponse.redirect(new URL(`/${lang}/auth/login`, request.nextUrl.origin));
      }

      return NextResponse.redirect(new URL(`/${lang}/${userId}/dashboard/generate`, request.nextUrl.origin));
    } catch {
      void clearAuth();
      return NextResponse.redirect(new URL(`/${lang}/auth/login`, request.nextUrl.origin));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/((?!api|_next|favicon.ico|.*\\..*).*)'],
};
