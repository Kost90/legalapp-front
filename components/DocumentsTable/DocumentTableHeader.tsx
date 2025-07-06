import { ArrowUpDown } from 'lucide-react';

interface DocumentTableHeaderProps {
  columns: string[];
  onSort: () => void;
}

export const DocumentTableHeader: React.FC<DocumentTableHeaderProps> = ({ columns, onSort }) => {
  return (
    <thead className="bg-color-secondary">
      <tr>
        {columns.map((column, index) => {
          const isSortable = column === 'Дата створення' || column === 'Creation Date';

          return (
            <th
              key={column + index}
              className={`text-muted-text p-4 font-semibold ${
                isSortable ? 'hover:bg-btn-hover-border cursor-pointer transition-colors' : ''
              }`}
              onClick={isSortable ? onSort : undefined}
            >
              <div className="flex items-center">
                {column}
                {isSortable && <ArrowUpDown className="ml-1 h-4 w-4" />}
              </div>
            </th>
          );
        })}
      </tr>
    </thead>
  );
};
