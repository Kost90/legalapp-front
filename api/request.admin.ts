'use server';
import { notFound } from 'next/navigation';

import { handleError } from './utils';

// Make request from here when don't need jwt token on endpoint
export const requestAdmin = async <Request, Body = any>(
  url: string,
  options: Omit<RequestInit, 'body'> & {
    body?: Body;
    dontThrow?: boolean;
    noAdminTag?: boolean;
  },
): Promise<Request> => {
  // TODO: Remove than when buy domain
  console.log(`http://134.209.224.92/api/${url}`);
  const res = await fetch(`http://134.209.224.92/api/${url}`, {
    ...options,
    headers: {
      'Content-Type': options.body ? 'application/json' : '',
      'x-api-key': process.env.NEXT_API_ADMIN_KEY as string,
    },
    body: options.body ? JSON.stringify(options.body) : undefined,
  });

  console.log(res);

  const json = await res.json();

  if (!res.ok) {
    if (res.status === 404 && !options.dontThrow) {
      notFound();
    }

    handleError(json.message);
  }

  return json as Request;
};
