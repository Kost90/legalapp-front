import { NextFetchEvent, NextRequest } from 'next/server';

import { authRedirect } from './middlewares/auth-redirect';
import { getLocales } from './middlewares/get-locales';
import { userRedirect } from './middlewares/user-redirect';
import { chainMiddlewares, MiddlewareCustom } from './utils/middleware-chain';

const middlewaresList: MiddlewareCustom[] = [getLocales, authRedirect, userRedirect];

export async function middleware(request: NextRequest, event: NextFetchEvent) {
  return await chainMiddlewares(middlewaresList, request, event);
}

export const config = {
  matcher: ['/((?!api|_next|favicon.ico|.*\\..*).*)'],
};
