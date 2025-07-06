import { DocumentKey } from '@/types/documents';
import { DocumentPage } from '@/types/documents-table-dictionary';

interface FilterProps {
  filterType: DocumentKey | 'all';
  setFilterType: (type: DocumentKey | 'all') => void;
  setCurrentPage: (page: number) => void;
  dictionary: DocumentPage;
}

const documentType = ['power-of-attorney-property', 'all'];

export const TableFilter: React.FC<FilterProps> = ({ dictionary, filterType, setFilterType, setCurrentPage }) => {
  const handleFilterChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setFilterType(e.target.value as DocumentKey | 'all');
    setCurrentPage(1);
  };

  return (
    <div className="mb-4">
      <label htmlFor="docTypeFilter" className="text-muted-text mb-1 block text-sm font-medium">
        {dictionary.table.filter}
      </label>
      <select
        id="docTypeFilter"
        value={filterType}
        onChange={handleFilterChange}
        className="border-btn-border-color text-main-black focus:ring-link-btn-text w-full rounded-lg border bg-white px-3 py-2 transition focus:border-transparent focus:ring-2 focus:outline-none md:w-auto"
      >
        <option value="all">{dictionary.table.filterOptionsTitle}</option>
        {documentType.map((type) => (
          <option key={type} value={type}>
            {type}
          </option>
        ))}
      </select>
    </div>
  );
};
