import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export async function handleNonAuth(request: NextRequest) {
  const cookieStore = await cookies();
  const accessToken = cookieStore.get('access_token');

  if (accessToken) {
    return NextResponse.redirect(new URL('/', request.url));
  }
}