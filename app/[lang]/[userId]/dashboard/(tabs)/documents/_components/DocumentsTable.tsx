'use client';

import { useState, useEffect, useCallback } from 'react';
import toast from 'react-hot-toast';

import { deleteDocument, getSortedDocuments } from '@/app/actions/documents';
import { downloadDocument } from '@/app/actions/documents-client';
import { useDevice } from '@/context/DeviceProvider';
import { DOCUMENT_TYPE } from '@/lib/constants/common-documents';
import { Pagination } from '@/types/common';
import { IDocument } from '@/types/documents';
import { DocumentPage } from '@/types/documents-table-dictionary';

import { TablePagination } from './PaginationTable';
import { TableDesktop } from './TableDesctop';
import { TableFilter } from './TableFilter';
import { TableMobile } from './TableMobile';

const DocumentsTable = ({
  documents,
  dictionary,
  userId,
}: {
  documents: {
    items: IDocument[];
    pagination: Pagination;
  };
  dictionary: DocumentPage;
  userId: string;
}) => {
  const deviceContext = useDevice();
  const [isClient, setIsClient] = useState<boolean>(false);

  const [documentsList, setDocumentsList] = useState<IDocument[]>(documents.items);
  const [totalPages, setTotalPages] = useState<number>(documents.pagination.totalPages);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [sortOrder, setSortOrder] = useState<'ASC' | 'DESC'>('DESC');
  const [filterType, setFilterType] = useState<DOCUMENT_TYPE | 'all'>('all');

  const DOCUMENTS_PER_PAGE = 5;

  useEffect(() => {
    setIsClient(true);
  }, []);

  const isDesktop = isClient && deviceContext.isLg === true;

  const handleSort = useCallback(async () => {
    try {
      setLoading(true);
      const newSortOrder = sortOrder === 'ASC' ? 'DESC' : 'ASC';
      const response = await getSortedDocuments(userId, newSortOrder, currentPage);
      setSortOrder(newSortOrder);
      setCurrentPage(1);
      setTotalPages(response.pagination.totalPages);
      setDocumentsList(response.items);
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error: any) {
      setLoading(false);
      toast.error(dictionary.errorMessage);
    } finally {
      setLoading(false);
    }
  }, [currentPage, dictionary.errorMessage, sortOrder, userId]);

  const handleDelete = useCallback(
    async (id: string) => {
      try {
        setLoading(true);
        await deleteDocument(id);
        setDocumentsList((prev: IDocument[]) => prev.filter((doc) => doc.id !== id));
        const newSortOrder = sortOrder === 'ASC' ? 'DESC' : 'ASC';
        const response = await getSortedDocuments(userId, newSortOrder, currentPage);
        setCurrentPage(1);
        setTotalPages(response.pagination.totalPages);
        setLoading(false);
        toast.success(dictionary.removeDocumentSuccMessage);
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
      } catch (error: any) {
        setLoading(false);
        toast.error(dictionary.errorMessage);
      } finally {
        setLoading(false);
      }
    },
    [currentPage, dictionary.errorMessage, dictionary.removeDocumentSuccMessage, sortOrder, userId],
  );

  const handleDownload = useCallback(
    async (documentId: string) => {
      try {
        await downloadDocument(documentId, userId);
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
      } catch (error: any) {
        toast.error(dictionary.errorMessage);
      }
    },
    [dictionary.errorMessage, userId],
  );

  const handelFetchDocuments = useCallback(
    async (page: number, documentType?: string) => {
      try {
        setLoading(true);
        setCurrentPage(page);
        const response = await getSortedDocuments(userId, sortOrder, page, documentType);
        setDocumentsList(response.items);
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
      } catch (error: any) {
        setLoading(false);
        toast.error(dictionary.errorMessage);
      } finally {
        setLoading(false);
      }
    },
    [dictionary.errorMessage, sortOrder, userId],
  );

  const startIndex = (currentPage - 1) * DOCUMENTS_PER_PAGE;

  return (
    <div className="min-h-screen p-4 md:p-8">
      <div className="mx-auto max-w-6xl">
        <TableFilter
          filterType={filterType}
          setFilterType={setFilterType}
          dictionary={dictionary}
          handelFetchDocuments={handelFetchDocuments}
        />

        {loading ? (
          <div className="text-muted-text py-10 text-center">Загрузка документов...</div>
        ) : documentsList.length === 0 ? (
          <div className="text-muted-text rounded-lg bg-white py-10 text-center shadow-md">{dictionary.foundDocuments}</div>
        ) : (
          <>
            {isClient && !isDesktop ? (
              <TableMobile
                documents={documentsList}
                onDelete={handleDelete}
                onDownload={handleDownload}
                startIndex={startIndex}
                dictionary={dictionary}
              />
            ) : (
              <TableDesktop
                documents={documentsList}
                onSort={handleSort}
                onDelete={handleDelete}
                onDownload={handleDownload}
                dictionary={dictionary}
              />
            )}
            <TablePagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={handelFetchDocuments}
              dictionary={dictionary}
            />
          </>
        )}
      </div>
    </div>
  );
};

export default DocumentsTable;
