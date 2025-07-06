import { IDocument } from '@/types/documents';
import { DocumentPage } from '@/types/documents-table-dictionary';

import { DocumentTableHeader } from './DocumentTableHeader';
import { DocumentTableRow } from './DocumentTableRow';

interface TableDesktopProps {
  documents: IDocument[];
  onSort: () => void;
  onDelete: (id: string) => void;
  onDownload: (id: string) => void;
  dictionary: DocumentPage;
}

export const TableDesktop: React.FC<TableDesktopProps> = ({ documents, onSort, onDelete, onDownload, dictionary }) => {
  return (
    <div className="bg-headerfooterwhite border-btn-border-color overflow-x-auto rounded-lg border shadow-md">
      <table className="w-full text-left">
        <DocumentTableHeader columns={dictionary.table.columns} onSort={onSort} />
        <tbody>
          {documents.map((doc, index) => (
            <DocumentTableRow
              key={doc.id}
              index={index}
              document={doc}
              onDownload={onDownload}
              onDelete={onDelete}
              dictionary={dictionary}
            />
          ))}
        </tbody>
      </table>
    </div>
  );
};
