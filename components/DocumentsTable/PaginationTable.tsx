import Button from '@/components/Button/Button';
import { DocumentPage } from '@/types/documents-table-dictionary';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  dictionary: DocumentPage;
}

export const TablePagination: React.FC<PaginationProps> = ({ currentPage, totalPages, onPageChange, dictionary }) => {
  if (totalPages <= 1) return null;

  return (
    <div className="mt-6 flex items-center justify-center space-x-2">
      <Button onClick={() => onPageChange(currentPage - 1)} disabled={currentPage === 1}>
        {dictionary.table.tablePagination.back}
      </Button>
      <span className="text-muted-text">
        {dictionary.table.tablePagination.page} {currentPage} {dictionary.table.tablePagination.from} {totalPages}
      </span>
      <Button onClick={() => onPageChange(currentPage + 1)} disabled={currentPage === totalPages}>
        {dictionary.table.tablePagination.continue}
      </Button>
    </div>
  );
};
