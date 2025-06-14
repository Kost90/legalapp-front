import { request } from '@/api/request';
import { userInformationData } from '@/types/user';

export const fetchCurrentUser = async () => {
  const response = await request<{ data: userInformationData }>('/user', { method: 'GET' });
  return response.data;
};
