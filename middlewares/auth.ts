import { cookies } from 'next/headers';

import { fetchUserIdFromCookie } from '@/api/user/fetchUserIdFromCoockies';

export async function getUserId() {
  const cookieStore = await cookies();

  const refreshToken = cookieStore.get('refresh_token')?.value;
  const accessToken = cookieStore.get('access_token')?.value;

  if (!refreshToken || !accessToken) return false;

  try {
    const userId = await fetchUserIdFromCookie();

    if (!userId) return false;

    return userId;
  } catch {
    return false;
  }
}
