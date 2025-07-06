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
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className="border-btn-border-color text-main-black hover:bg-base-btn-hover-bg rounded-lg border bg-white px-4 py-2 transition disabled:cursor-not-allowed disabled:opacity-50"
      >
        {dictionary.table.tablePagination.back}
      </button>
      <span className="text-muted-text">
        {dictionary.table.tablePagination.page} {currentPage} {dictionary.table.tablePagination.from} {totalPages}
      </span>
      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="border-btn-border-color text-main-black hover:bg-base-btn-hover-bg rounded-lg border bg-white px-4 py-2 transition disabled:cursor-not-allowed disabled:opacity-50"
      >
        {dictionary.table.tablePagination.continue}
      </button>
    </div>
  );
};
