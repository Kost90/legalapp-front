import { ArrowDownToLine, Trash } from 'lucide-react';

import { DocumentKey, IDocument } from '@/types/documents';
import { DocumentPage } from '@/types/documents-table-dictionary';

interface DocumentCardProps {
  document: IDocument;
  index: number;
  onDelete: (id: string) => void;
  onDownload: (id: string) => void;
  dictionary: DocumentPage;
}

export const DocumentCard: React.FC<DocumentCardProps> = ({ document, index, onDelete, onDownload, dictionary }) => {
  return (
    <div className="bg-headerfooterwhite border-btn-border-color rounded-lg border p-4 shadow-md">
      <div className="flex items-start justify-between">
        <h3 className="text-main-black mb-2 pr-2 font-bold">{document.fileKey}</h3>
        <span className="text-muted-text text-sm whitespace-nowrap">#{index + 1}</span>
      </div>
      <div className="text-muted-text mb-3 text-sm">
        <p>
          <strong>{dictionary.table.columnsForMobile.type}</strong> {dictionary.documentsTypes[document.type as DocumentKey]}
        </p>
        <p>
          <strong>{dictionary.table.columnsForMobile.createdAt}</strong> {document.createdAt}
        </p>
      </div>
      <div className="border-btn-border-color mt-3 flex items-center justify-end space-x-2 border-t pt-3">
        <button
          onClick={() => onDownload(document.id)}
          className="border-btn-border-color text-link-btn-text hover:bg-base-btn-hover-bg flex items-center rounded-lg border bg-white px-3 py-1.5 text-sm transition"
        >
          <ArrowDownToLine className="mr-1 h-4 w-4" />
          {dictionary.table.columnsForMobile.download}
        </button>
        <button
          onClick={() => onDelete(document.id)}
          className="bg-redbtn flex items-center rounded-lg border border-transparent px-3 py-1.5 text-sm text-white transition hover:opacity-90"
        >
          <Trash className="mr-1 h-4 w-4" />
          {dictionary.table.columnsForMobile.remove}
        </button>
      </div>
    </div>
  );
};
