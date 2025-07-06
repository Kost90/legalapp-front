import { request } from '@/api/request';

import { PaginatedDocumentsResponse } from './fetchUserDocuments';

export const removeUserDocument = async (documentId: string) => {
  return await request<PaginatedDocumentsResponse>(`/user/delete-document/${documentId}`, { method: 'DELETE' });
};
