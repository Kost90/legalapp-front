import { NextRequest, NextResponse } from 'next/server';
import { handleNonAuth } from './middlewares/nonAuth';
import { getUserId } from './middlewares/auth';
import { clearAuth } from './api/auth/clearAuth';

let locales = ['ua', 'en'];
let defaultLocale = 'ua';

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
        clearAuth();
        return NextResponse.redirect(new URL(`/${lang}/auth/login`, request.url));
      }

      return NextResponse.redirect(new URL(`/${lang}/${userId}/dashboard/generate`, request.url));
    } catch {
      clearAuth();
      return NextResponse.redirect(new URL(`/${lang}/auth/login`, request.url));
    }
  }
}

export const config = {
  matcher: ['/((?!api|_next|favicon.ico|.*\\..*).*)'],
};
