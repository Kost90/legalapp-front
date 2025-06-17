'use client';
import DocumentFlow from '@/components/Container/DocumentFlowSteper/DocumentFlowSteper';
import { SiteContent } from '@/types/dictionaries';
import React from 'react';

function GenerateDocumentClientPage({ dictionary, language }: { dictionary: SiteContent; language: string }) {
  return <DocumentFlow lang={language} dictionary={dictionary} />;
}

export default GenerateDocumentClientPage;
