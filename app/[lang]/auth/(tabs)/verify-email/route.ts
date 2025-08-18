import { NextResponse } from 'next/server';

// import { BASE_URL } from '@/api/utils';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const token = searchParams.get('token');

  if (!token) {
    return NextResponse.json({ error: 'Token is required' }, { status: 400 });
  }

  try {
    const response = await fetch('http://134.209.224.92/api/auth/verify-email', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ token: token }),
    });

    if (!response.ok) {
      throw new Error('Verification failed');
    }

    // DEV:
    // return NextResponse.redirect(new URL('/auth/login', request.url));
    // TODO: Change for env
    // PRROD:
    return NextResponse.redirect(`http://134.209.224.92/auth/login`);
  } catch (error) {
    console.error(error);

    return NextResponse.json({ error: 'Verification failed' }, { status: 400 });
  }
}
