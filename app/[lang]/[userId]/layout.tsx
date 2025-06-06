import { ReactNode } from 'react';

import UserProvider from '@/context/user/UserProvider';
import consumePageParams from '@/utils/consumePageParams';

export default async function AuthenticatedLayout(props: { children: ReactNode; params: Promise<{ userId: string }> }) {
  const { userId } = await consumePageParams(props.params);

  return <UserProvider userId={userId}>{props.children}</UserProvider>;
}
