'use server';
import { notFound } from 'next/navigation';

import { BASE_SERVER_URL, handleError } from './utils';

export const requestAdmin = async <Request, Body = any>(
  url: string,
  options: Omit<RequestInit, 'body'> & {
    body?: Body;
    dontThrow?: boolean;
    noAdminTag?: boolean;
  },
): Promise<Request> => {
  try {
    const fullUrl = `${BASE_SERVER_URL}/${url}`;
    const res = await fetch(fullUrl, {
      ...options,
      headers: {
        'Content-Type': options.body ? 'application/json' : '',
        'x-api-key': process.env.NEXT_API_ADMIN_KEY as string,
      },
      body: options.body ? JSON.stringify(options.body) : undefined,
    });

    const json = await res.json();

    if (!res.ok) {
      if (res.status === 404 && !options.dontThrow) {
        notFound();
      }
      handleError({ message: json.message, errors: json.errors });
    }

    return json as Request;
  } catch (error) {
    console.error('An error occurred in requestAdmin:', error);

    if (error instanceof Error && error.message.startsWith('{')) {
      throw error;
    }

    handleError({ message: 'An unexpected error occurred. Please try again later.' });

    throw new Error('An unexpected error occurred.');
  }
};
