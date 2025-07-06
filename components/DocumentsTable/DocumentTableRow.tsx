import { ArrowDownToLine, Trash } from 'lucide-react';

import { DocumentKey, IDocument } from '@/types/documents';
import { DocumentPage } from '@/types/documents-table-dictionary';
import { cn } from '@/utils/cn';

interface DocumentTableRowProps {
  document: IDocument;
  index: number;
  onDownload: (id: string) => void;
  onDelete: (id: string) => void;
  dictionary: DocumentPage;
}

export const DocumentTableRow: React.FC<DocumentTableRowProps> = ({ document, index, onDownload, onDelete, dictionary }) => {
  return (
    <tr className="border-btn-border-color hover:bg-bg-primary border-t transition-colors">
      <td className="text-muted-text p-4">{index + 1}</td>
      <td className="text-main-black p-4">
        <span className={cn(`rounded-full px-2 py-1 text-sm`)}>{dictionary.documentsTypes[document.type as DocumentKey]}</span>
      </td>
      <td className="text-main-black p-4 font-medium">{document.fileKey}</td>
      <td className="text-muted-text p-4">{document.createdAt}</td>
      <td className="p-4">
        <div className="flex items-center justify-center space-x-2">
          <button
            onClick={() => onDownload(document.id)}
            className="text-link-btn-text hover:bg-base-btn-hover-bg rounded-full p-2 transition-colors"
            aria-label="Download Document"
          >
            <ArrowDownToLine />
          </button>
          <button
            onClick={() => onDelete(document.id)}
            className="text-redbtn rounded-full p-2 transition-colors hover:bg-red-100"
            aria-label="Delete Document"
          >
            <Trash />
          </button>
        </div>
      </td>
    </tr>
  );
};
