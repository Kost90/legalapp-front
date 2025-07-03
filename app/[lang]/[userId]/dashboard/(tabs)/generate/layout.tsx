import { Metadata } from 'next';
import { ReactNode } from 'react';

export const metadata: Metadata = { title: 'Generate Doocument' };

import { IGenerateDocumentsContent } from '@/types/generate-documents-dictionaries';

import { getGenerateDocumentsDictionary } from './generate-documents-dictionaries';
import GenerateDocumentLayoutClient from './layout.client';

export default async function GenerateDocumentLayout(props: Readonly<{ children: ReactNode; params: { lang: 'ua' | 'en' } }>) {
  const { lang } = await props.params;
  const dictionary: IGenerateDocumentsContent = await getGenerateDocumentsDictionary(lang);
  return (
    <GenerateDocumentLayoutClient lang={lang} dictionary={dictionary}>
      {props.children}
    </GenerateDocumentLayoutClient>
  );
}
