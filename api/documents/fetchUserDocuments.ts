import { cache } from 'react';

import { requestAdmin } from '@/api/request.admin';
import { buildUrl } from '@/api/utils';
import { userInformationData } from '@/types/user';

export const fetchUserInfo = cache(async (userId: string) => {
  const url = buildUrl(`user/me/${userId}`, {});

  return requestAdmin<userInformationData>(url, { method: 'GET' });
});
