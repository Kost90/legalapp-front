import { NextResponse } from 'next/server';

import { handleNonAuth } from '@/middlewares/nonAuth';
import { MiddlewareCustom } from '@/utils/middleware-chain';

const defaultLocale = 'ua';

export const authRedirect: MiddlewareCustom = async (req, event, res, next) => {
  const { pathname } = req.nextUrl;
  const lang = pathname.split('/')[1] || defaultLocale;

  if (pathname.startsWith(`/${lang}/auth/`)) {
    const redirection = await handleNonAuth(req);
    if (redirection) return redirection;
    return NextResponse.next();
  }

  return next(req, event, res);
};
