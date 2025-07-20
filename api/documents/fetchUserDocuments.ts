import { requestAdmin } from '@/api/request.admin';
import { buildUrl } from '@/api/utils';
import { Pagination } from '@/types/common';
import { IDocument } from '@/types/documents';

export type PaginatedDocumentsResponse = {
  data: {
    items: IDocument[];
    pagination: Pagination;
  };
};

export const fetchUserDocuments = async (userId: string, sortType?: 'ASC' | 'DESC', page?: number, documentType?: string) => {
  const url = buildUrl(`user/user-documents/${userId}`, { documentType: documentType, sortType: sortType, page: page });
  const { data } = await requestAdmin<PaginatedDocumentsResponse>(url, { method: 'GET' });

  return data;
};
