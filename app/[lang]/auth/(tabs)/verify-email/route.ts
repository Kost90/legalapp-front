import { NextResponse } from 'next/server';

import { BASE_SERVER_URL } from '@/api/utils';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const token = searchParams.get('token');

  const apiUrl = `${BASE_SERVER_URL}/auth/verify-email`;

  if (!token) {
    return NextResponse.json({ error: 'Token is required' }, { status: 400 });
  }

  try {
    const response = await fetch(apiUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ token: token }),
    });

    if (!response.ok) {
      throw new Error('Verification failed');
    }

    const proto = request.headers.get('x-forwarded-proto') || 'http';
    const host = request.headers.get('host') || 'localhost:3000';
    const redirectUrl = `${proto}://${host}/auth/login`;

    return NextResponse.redirect(redirectUrl);
  } catch (error) {
    console.error(error);

    return NextResponse.json({ error: 'Verification failed' }, { status: 400 });
  }
}
