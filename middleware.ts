import { NextRequest, NextResponse } from 'next/server';

import { clearAuth } from './api/auth/clearAuth';
import { getUserId } from './middlewares/auth';
import { handleNonAuth } from './middlewares/nonAuth';

const locales = ['ua', 'en'];
const defaultLocale = 'ua';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
function getLocale(request: NextRequest) {
  return defaultLocale;
}

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  const pathnameHasLocale = locales.some((locale) => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`);

  if (!pathnameHasLocale) {
    const locale = getLocale(request);
    request.nextUrl.pathname = `/${locale}${pathname}`;
    return NextResponse.redirect(request.nextUrl);
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
        return NextResponse.redirect(new URL(`/${lang}/auth/login`, request.url));
      }

      return NextResponse.redirect(new URL(`/${lang}/${userId}/dashboard/generate`, request.url));
    } catch {
      void clearAuth();
      return NextResponse.redirect(new URL(`/${lang}/auth/login`, request.url));
    }
  }
}

export const config = {
  matcher: ['/((?!api|_next|favicon.ico|.*\\..*).*)'],
};
