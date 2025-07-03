import { DOCUMENT_SCHEMAS } from '@/lib/documentsSchemas';

export type DocumentKey = keyof typeof DOCUMENT_SCHEMAS;

export type DocumentFormData<T extends DocumentKey> = (typeof DOCUMENT_SCHEMAS)[T]['type'];
