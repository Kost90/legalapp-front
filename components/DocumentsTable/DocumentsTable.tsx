'use client';

import { useState, useEffect } from 'react';

import { useDevice } from '@/context/DeviceProvider';
import { Pagination } from '@/types/common';
import { DocumentKey, IDocument } from '@/types/documents';
import { DocumentPage } from '@/types/documents-table-dictionary';

import { TablePagination } from './PaginationTable';
import { TableDesktop } from './TableDesctop';
import { TableFilter } from './TableFilter';
import { TableMobile } from './TableMobile';

const DocumentsTable = ({
  documents,
  dictionary,
}: {
  documents: {
    items: IDocument[];
    pagination: Pagination;
  };
  dictionary: DocumentPage;
}) => {
  const deviceContext = useDevice();
  const [isClient, setIsClient] = useState<boolean>(false);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [sortOrder, setSortOrder] = useState<'ASC' | 'DESC'>('DESC');
  const [filterType, setFilterType] = useState<DocumentKey | 'all'>('all');

  const DOCUMENTS_PER_PAGE = 5;

  useEffect(() => {
    setIsClient(true);
  }, []);

  const isDesktop = isClient && deviceContext.isLg === true;

  const handleSort = () => {
    setSortOrder((prev) => (prev === 'ASC' ? 'DESC' : 'ASC'));
    setCurrentPage(1);
  };

  const handleDelete = (id: string) => {
    console.log('delete', id);
  };

  const handleDownload = (id: string) => {
    console.log('download', id);
  };

  const startIndex = (currentPage - 1) * DOCUMENTS_PER_PAGE;

  return (
    <div className="bg-bg-primary min-h-screen p-4 md:p-8">
      <div className="mx-auto max-w-6xl">
        <h1 className="text-main-black mb-6 text-3xl font-bold">Мои документы</h1>

        <TableFilter filterType={filterType} setFilterType={setFilterType} setCurrentPage={setCurrentPage} dictionary={dictionary} />

        {loading ? (
          <div className="text-muted-text py-10 text-center">Загрузка документов...</div>
        ) : documents.items.length === 0 ? (
          <div className="text-muted-text rounded-lg bg-white py-10 text-center shadow-md">Документы не найдены.</div>
        ) : (
          <>
            {isClient && !isDesktop ? (
              <TableMobile
                documents={documents.items}
                onDelete={handleDelete}
                onDownload={handleDownload}
                startIndex={startIndex}
                dictionary={dictionary}
              />
            ) : (
              <TableDesktop
                sortType="DESC"
                documents={documents.items}
                onSort={handleSort}
                onDelete={handleDelete}
                onDownload={handleDownload}
                dictionary={dictionary}
              />
            )}
            <TablePagination
              currentPage={currentPage}
              totalPages={documents.pagination.totalPages}
              onPageChange={setCurrentPage}
              dictionary={dictionary}
            />
          </>
        )}
      </div>
    </div>
  );
};

// Экспортируем главный компонент для использования в Next.js
export default DocumentsTable;
