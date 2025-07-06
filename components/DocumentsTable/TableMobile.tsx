import { ArrowDownToLine, Trash } from 'lucide-react';

import { IDocument } from '@/types/documents';
import { DocumentPage } from '@/types/documents-table-dictionary';

interface TableMobileProps {
  documents: IDocument[];
  onDelete: (id: string) => void;
  onDownload: (id: string) => void;
  startIndex: number;
  dictionary: DocumentPage;
}

// TODO: Need to make this component by different small component (Card List, Card, Card item)
export const TableMobile: React.FC<TableMobileProps> = ({ documents, onDelete, onDownload, startIndex, dictionary }) => {
  return (
    <div className="space-y-4">
      {documents.map((doc, index) => (
        <div key={doc.id} className="bg-headerfooterwhite border-btn-border-color rounded-lg border p-4 shadow-md">
          <div className="flex items-start justify-between">
            <h3 className="text-main-black mb-2 pr-2 font-bold">{doc.fileKey}</h3>
            <span className="text-muted-text text-sm whitespace-nowrap">#{startIndex + index + 1}</span>
          </div>
          <div className="text-muted-text mb-3 text-sm">
            <p>
              <strong>{dictionary.table.columnsForMobile.type}</strong> {doc.type}
            </p>
            <p>
              <strong>{dictionary.table.columnsForMobile.createdAt}</strong> {doc.createdAt}
            </p>
          </div>
          <div className="border-btn-border-color mt-3 flex items-center justify-end space-x-2 border-t pt-3">
            <button
              onClick={() => onDownload(doc.id)}
              className="border-btn-border-color text-link-btn-text hover:bg-base-btn-hover-bg flex items-center rounded-lg border bg-white px-3 py-1.5 text-sm transition"
            >
              <ArrowDownToLine className="mr-1 h-4 w-4" />
              {dictionary.table.columnsForMobile.download}
            </button>
            <button
              onClick={() => onDelete(doc.id)}
              className="bg-redbtn flex items-center rounded-lg border border-transparent px-3 py-1.5 text-sm text-white transition hover:opacity-90"
            >
              <Trash className="mr-1 h-4 w-4" />
              {dictionary.table.columnsForMobile.remove}
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};
