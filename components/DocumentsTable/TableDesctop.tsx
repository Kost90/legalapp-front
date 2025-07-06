import { ArrowUpDown, ArrowDownToLine, Trash } from 'lucide-react';

import { IDocument } from '@/types/documents';
import { DocumentPage } from '@/types/documents-table-dictionary';
import { cn } from '@/utils/cn';

interface TableDesktopProps {
  documents: IDocument[];
  sortType: 'ASC' | 'DESC';
  onSort: (sortType: string) => void;
  onDelete: (id: string) => void;
  onDownload: (id: string) => void;
  dictionary: DocumentPage;
}

export const TableDesktop: React.FC<TableDesktopProps> = ({ documents, sortType, onSort, onDelete, onDownload, dictionary }) => {
  return (
    <div className="bg-headerfooterwhite border-btn-border-color overflow-x-auto rounded-lg border shadow-md">
      <table className="w-full text-left">
        <thead className="bg-color-secondary">
          <tr>
            {dictionary.table.columns.map((column, index) => {
              if (column === 'Дата створення' || column === 'Creation Date') {
                return (
                  <>
                    <th
                      key={column + index}
                      className="text-muted-text hover:bg-btn-hover-border cursor-pointer p-4 font-semibold transition-colors"
                      onClick={() => onSort(sortType)}
                    >
                      <div className="flex items-center">
                        {column}
                        <ArrowUpDown />
                      </div>
                    </th>
                  </>
                );
              } else {
                return (
                  <>
                    <th key={column + index} className="text-muted-text p-4 font-semibold">
                      {column}
                    </th>
                    ;
                  </>
                );
              }
            })}
          </tr>
        </thead>
        <tbody>
          {documents.map((doc, index) => (
            <tr key={doc.id} className="border-btn-border-color hover:bg-bg-primary border-t transition-colors">
              <td className="text-muted-text p-4">{index + 1}</td>
              <td className="text-main-black p-4">
                <span
                  className={cn(`rounded-full px-2 py-1 text-sm`, {
                    'bg-color-yellow-bg text-main-black': doc.type === 'power-of-attorney-property',
                  })}
                >
                  {doc.type}
                </span>
              </td>
              <td className="text-main-black p-4 font-medium">{doc.fileKey}</td>
              <td className="text-muted-text p-4">{doc.createdAt}</td>
              <td className="p-4">
                <div className="flex items-center justify-center space-x-2">
                  <button
                    onClick={() => onDownload(doc.id)}
                    className="text-link-btn-text hover:bg-base-btn-hover-bg rounded-full p-2 transition-colors"
                    aria-label="Скачать документ"
                  >
                    <ArrowDownToLine />
                  </button>
                  <button
                    onClick={() => onDelete(doc.id)}
                    className="text-redbtn rounded-full p-2 transition-colors hover:bg-red-100"
                    aria-label="Удалить документ"
                  >
                    <Trash />
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
