import { DOCUMENT_SCHEMAS } from '@/lib/documentsSchemas';

export type DocumentKey = keyof typeof DOCUMENT_SCHEMAS;

export type DocumentFormData<T extends DocumentKey> = (typeof DOCUMENT_SCHEMAS)[T]['type'];

export interface IDocument {
  id: string;
  fileKey: string;
  isPaid: boolean;
  expiredAt: string | null;
  lang: string;
  type: string | DocumentKey;
  createdAt: string;
}

export interface DocumentsQueryParams {
  page: number;
  limit: number;
  sortType: 'asc' | 'desc';
  documentType: DocumentKey | 'all';
}
