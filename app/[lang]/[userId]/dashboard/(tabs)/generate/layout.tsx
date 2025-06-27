import { Metadata } from 'next';
import React, { ReactNode } from 'react';

export const metadata: Metadata = { title: 'Generate Doocument' };

import { IGenerateDocumentsContent } from '@/types/documents/generate-documents-dictionaries';

import { getGenerateDocumentsDictionary } from './generate-documents-dictionaries';
import GenerateDocumentLayoutClient from './layout.client';

export default async function GenerateDocumentLayout(props: Readonly<{ children: ReactNode; params: { lang: string } }>) {
  const { lang } = await props.params;
  const dictionary: IGenerateDocumentsContent = await getGenerateDocumentsDictionary(lang);
  return (
    <GenerateDocumentLayoutClient lang={lang} dictionary={dictionary}>
      {props.children}
    </GenerateDocumentLayoutClient>
  );
}
