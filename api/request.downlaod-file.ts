'use server';
import { notFound } from 'next/navigation';

import { BASE_URL } from './utils';

export const requestDownloadDoc = async (
  url: string,
  options: Omit<RequestInit, 'body'> & {
    dontThrow?: boolean;
    noAdminTag?: boolean;
  },
): Promise<Blob> => {
  const res = await fetch(`${BASE_URL}/${url}`, {
    ...options,
    method: options.method || 'GET',
    headers: {
      'x-api-key': process.env.NEXT_API_ADMIN_KEY as string,
    },
  });

  if (!res.ok) {
    if (res.status === 404 && !options.dontThrow) {
      notFound();
    }
    const errorText = await res.text().catch(() => '');
    throw new Error(errorText || 'Download failed');
  }

  return res.blob();
};
