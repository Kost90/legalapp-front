import { IDocument } from '@/types/documents';
import { DocumentPage } from '@/types/documents-table-dictionary';

import { DocumentCardList } from './DocumentCardList';

interface TableMobileProps {
  documents: IDocument[];
  onDelete: (id: string) => void;
  onDownload: (id: string) => void;
  startIndex: number;
  dictionary: DocumentPage;
}

export const TableMobile: React.FC<TableMobileProps> = ({ documents, onDelete, onDownload, startIndex, dictionary }) => {
  return (
    <DocumentCardList documents={documents} onDelete={onDelete} onDownload={onDownload} startIndex={startIndex} dictionary={dictionary} />
  );
};
