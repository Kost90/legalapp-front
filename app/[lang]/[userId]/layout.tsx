import { ReactNode } from 'react';

import UserProvider from '@/context/user/UserProvider';
import consumePageParams from '@/utils/consumePageParams';
import { fetchUserInfo } from '@/api/documents/fetchUserDocuments';

export const dynamicParams = true;

export default async function AuthenticatedLayout(props: { children: ReactNode; params: Promise<{ userId: string }> }) {
  const { userId } = await consumePageParams(props.params);

  fetchUserInfo(userId);

  return <UserProvider userId={userId}>{props.children}</UserProvider>;
}
