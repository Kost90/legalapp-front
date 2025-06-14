'use client';
import DocumentFlow from '@/components/Container/DocumentFlowSteper/DocumentFlowSteper';
import { SiteContent } from '@/types/dictionaries';
import React from 'react';

function GenerateDocumentClientPage({ dictionary }: { dictionary: SiteContent }) {
  return <DocumentFlow />;
}

export default GenerateDocumentClientPage;
