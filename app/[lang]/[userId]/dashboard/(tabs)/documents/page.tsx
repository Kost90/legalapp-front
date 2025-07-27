import { Metadata } from 'next';

import { fetchUserDocuments } from '@/api/documents/fetchUserDocuments';
import DocumentsTable from '@/components/DocumentsTable/DocumentsTable';
import PageTitle from '@/components/PageTitle/PageTitle';
import { DocumentPage } from '@/types/documents-table-dictionary';

import { getDocumentsTableDictionary } from './documents-table-dictionary';

export const metadata: Metadata = { title: 'Your documents' };

type PageProps = {
  params: {
    lang: string;
    userId: string;
  };
};

export default async function DocumentsPage({ params }: PageProps) {
  const { lang, userId } = await params;
  const documents = await fetchUserDocuments(userId);
  const dictionary: DocumentPage = await getDocumentsTableDictionary(lang);
  return (
    <>
      <PageTitle title={dictionary.pageTitle} />
      <DocumentsTable documents={documents} dictionary={dictionary} userId={userId} />
    </>
  );
}
