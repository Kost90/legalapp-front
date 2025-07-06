import { IDocument } from '@/types/documents';
import { DocumentPage } from '@/types/documents-table-dictionary';

import { DocumentCard } from './DocumentCard';

interface DocumentCardListProps {
  documents: IDocument[];
  onDelete: (id: string) => void;
  onDownload: (id: string) => void;
  startIndex: number;
  dictionary: DocumentPage;
}

export const DocumentCardList: React.FC<DocumentCardListProps> = ({ documents, onDelete, onDownload, startIndex, dictionary }) => {
  return (
    <div className="space-y-4">
      {documents.map((doc, index) => (
        <DocumentCard
          key={doc.id}
          document={doc}
          index={startIndex + index}
          onDelete={onDelete}
          onDownload={onDownload}
          dictionary={dictionary}
        />
      ))}
    </div>
  );
};
