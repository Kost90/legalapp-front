import { Metadata } from 'next';

import { fetchUserDocuments } from '@/api/documents/fetchUserDocuments';
import DocumentsTable from '@/components/DocumentsTable/DocumentsTable';
import PageTitle from '@/components/PageTitle/PageTitle';
import { DocumentPage } from '@/types/documents-table-dictionary';

import { getDocumentsTableDictionary } from './documents-table-dictionary';

import { PageProps } from '@/.next/types/app/[lang]/[userId]/dashboard/(tabs)/documents/page';

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { lang } = await params;
  const dictionary: DocumentPage = await getDocumentsTableDictionary(lang);

  return {
    title: dictionary.pageTitle,
    robots: {
      index: false,
      follow: false,
    },
  };
}

export default async function DocumentsPage({ params }: PageProps) {
  const resolvedParams = await params;
  const { lang, userId } = resolvedParams!;
  const documents = await fetchUserDocuments(userId);
  const dictionary: DocumentPage = await getDocumentsTableDictionary(lang);
  return (
    <>
      <PageTitle title={dictionary.pageTitle} />
      <DocumentsTable documents={documents} dictionary={dictionary} userId={userId} />
    </>
  );
}
