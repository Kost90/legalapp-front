import 'server-only';
import { notFound } from 'next/navigation';

import { BASE_URL } from './utils';

// Make request from here when don't need jwt token on endpoint
export const requestAdmin = async <Request, Body = any>(
  url: string,
  options: Omit<RequestInit, 'body'> & {
    body?: Body;
    dontThrow?: boolean;
    noAdminTag?: boolean;
  },
): Promise<Request> => {
  const res = await fetch(`${BASE_URL}/${url}`, {
    ...options,
    headers: {
      'Content-Type': options.body ? 'application/json' : '',
      'x-api-key': process.env.NEXT_API_ADMIN_KEY as string,
    },
    body: options.body ? JSON.stringify(options.body) : undefined,
  });

  const json = await res.json();

  if (res.status !== 200) {
    if (res.status === 404 && !options.dontThrow) {
      notFound();
    }

    throw new Error(json.message);
  }

  return json as Request;
};
