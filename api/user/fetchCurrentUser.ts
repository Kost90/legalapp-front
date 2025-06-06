import { request } from '@/api/request';
import { userInformationData } from '@/types/user';

export const fetchCurrentUser = async () => await request<{ data: userInformationData }>('/user', { method: 'GET' });
