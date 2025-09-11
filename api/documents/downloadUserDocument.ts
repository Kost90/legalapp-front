'use server';

import { requestDownloadDoc } from '@/api/request.downlaod-file';
import { BASE_SERVER_URL } from '@/api/utils';

export const downloadUserDocument = async (documentId: string, userId: string): Promise<Blob> => {
  const fullUrl = `${BASE_SERVER_URL}/user/download-user-document/user/${userId}/document/${documentId}`;
  return await requestDownloadDoc(fullUrl, {
    method: 'GET',
  });
};
