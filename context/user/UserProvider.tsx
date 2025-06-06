import { ReactNode } from 'react';

import { fetchUserInfo } from '@/api/documents/fetchUserDocuments';

import { UserProviderClient } from './UserProvider.client';

export default async function UserProvider({ children, userId }: { children: ReactNode; userId: string }) {
  const user = await fetchUserInfo(userId);

  return <UserProviderClient user={user}>{children}</UserProviderClient>;
}
