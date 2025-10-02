import { NextResponse } from 'next/server';

import { MiddlewareCustom } from '@/utils/middleware-chain';

const locales = ['ua', 'en'] as const;
const defaultLocale = 'ua';

export const getLocales: MiddlewareCustom = async (req, event, res, next) => {
  const { pathname } = req.nextUrl;

  const matchedLocale = locales.find((locale) => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`);

  if (!matchedLocale) {
    const url = new URL(`/${defaultLocale}${pathname}`, req.url);
    return NextResponse.redirect(url);
  }

  return next(req, event, res);
};
