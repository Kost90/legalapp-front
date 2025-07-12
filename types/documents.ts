import { DOCUMENT_TYPE } from '@/lib/constans';
import { DOCUMENT_SCHEMAS } from '@/lib/documentsSchemas';

export type DocumentFormData<T extends DOCUMENT_TYPE> = (typeof DOCUMENT_SCHEMAS)[T]['type'];

export interface IDocument {
  id: string;
  fileKey: string;
  isPaid: boolean;
  expiredAt: string | null;
  lang: string;
  type: string | DOCUMENT_TYPE;
  createdAt: string;
}

export interface DocumentsQueryParams {
  page: number;
  limit: number;
  sortType: 'asc' | 'desc';
  documentType: DOCUMENT_TYPE | 'all';
}
