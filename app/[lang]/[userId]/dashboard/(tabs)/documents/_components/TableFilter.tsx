import { DOCUMENT_TYPE } from '@/lib/constants/common-documents';
import { DocumentPage } from '@/types/documents-table-dictionary';

interface FilterProps {
  filterType: DOCUMENT_TYPE | 'all';
  setFilterType: (type: DOCUMENT_TYPE | 'all') => void;
  dictionary: DocumentPage;
  handelFetchDocuments: (page: number, documentType?: string) => void;
}

export const TableFilter: React.FC<FilterProps> = ({ dictionary, filterType, setFilterType, handelFetchDocuments }) => {
  const handleFilterChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setFilterType(e.target.value as DOCUMENT_TYPE | 'all');
    handelFetchDocuments(1, e.target.value);
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
        className="border-btn-border-color text-main-black focus:ring-link-btn-text w-full max-w-full truncate rounded-lg border bg-white px-3 py-2 transition focus:border-transparent focus:ring-2 focus:outline-none md:w-auto"
      >
        <option value="all">{dictionary.table.filterOptionsTitle}</option>
        {Object.entries(dictionary.documentsTypes).map((type, index) => {
          return (
            <option key={type[0] + index} value={type[0]}>
              {type[1]}
            </option>
          );
        })}
      </select>
    </div>
  );
};
