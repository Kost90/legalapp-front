'use server';

import { requestDownloadDoc } from '@/api/request.downlaod-file';

export const downloadUserDocument = async (documentId: string, userId: string): Promise<Blob> => {
  return await requestDownloadDoc(`user/download-user-document/user/${userId}/document/${documentId}`, {
    method: 'GET',
  });
};
