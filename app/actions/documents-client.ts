'use client';

import { downloadUserDocument } from '@/api/documents/downloadUserDocument';

export async function downloadDocument(documentId: string, userId: string) {
  try {
    const blob = await downloadUserDocument(documentId, userId);
    const blobUrl = URL.createObjectURL(blob);

    window.open(blobUrl, '_blank');
  } catch (error: any) {
    const message = error?.message || 'Download document failed';
    throw new Error(message);
  }
}
