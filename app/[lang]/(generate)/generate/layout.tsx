import { Metadata } from 'next';

export const metadata: Metadata = { title: 'Generate Doocument' };

import { getDictionary } from '@/app/[lang]/dictionaries';
import { SiteContent } from '@/types/dictionaries';
import { IGenerateDocumentsContent } from '@/types/generate-documents-dictionaries';

import { getGenerateDocumentsDictionary } from './generate-documents-dictionaries';
import GenerateDocumentLayoutClient from './layout.client';

import { LayoutProps } from '@/.next/types/app/[lang]/[userId]/dashboard/(tabs)/generate/layout';

export default async function GenerateDocumentLayout({ children, params }: LayoutProps) {
  const resolvedParams = await params;
  const { lang } = resolvedParams!;
  const dictionary: IGenerateDocumentsContent = await getGenerateDocumentsDictionary(lang);
  const documentsExplanationDictionary: SiteContent = await getDictionary(lang);

  return (
    <GenerateDocumentLayoutClient lang={lang} dictionary={dictionary} documentsExplanationDictionary={documentsExplanationDictionary}>
      {children}
    </GenerateDocumentLayoutClient>
  );
}
