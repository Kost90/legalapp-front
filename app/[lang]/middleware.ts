import { NextResponse, type NextRequest } from 'next/server';

import { clearAuth } from '@/api/auth/clearAuth';
import { getUserId } from '@/middlewares/auth';
import { handleNonAuth } from '@/middlewares/nonAuth';
import { fetchUserInfo } from '@/api/documents/fetchUserDocuments';

export const config = { matcher: ['/((?!api|_next/static|_next/image|favicon.ico|icons|sfx|images).*)'] };

export async function middleware(request: NextRequest) {
  if (request.nextUrl.pathname.startsWith('/auth/')) {
    const redirection = await handleNonAuth(request);

    if (redirection) return redirection;

    return NextResponse.next();
  }

  try {
    const userId = await getUserId();

    if (!userId) {
      clearAuth();

      return NextResponse.redirect(new URL('/auth/login', request.url));
    }

    // TODO: Think if I need it?
    // await fetchUserInfo(userId);

    return NextResponse.redirect(new URL(`/${userId}/dashboard`, request.url));
  } catch (e) {
    console.error('middleware error', e);

    clearAuth();

    return NextResponse.redirect(new URL('/auth/login', request.url));
  }
}
