import { DOCUMENT_TYPE } from '@/lib/constans';

interface DocumentTable {
  columns: string[];
  filter: string;
  filterOptionsTitle: string;
  tablePagination: {
    continue: string;
    back: string;
    page: string;
    from: string;
  };
  columnsForMobile: {
    type: string;
    createdAt: string;
    remove: string;
    download: string;
  };
}

export interface DocumentPage {
  pageTitle: string;
  pageDescription: string;
  table: DocumentTable;
  documentsTypes: Record<DOCUMENT_TYPE, string>;
  foundDocuments: string;
  removeDocumentSuccMessage: string;
  errorMessage: string;
}
