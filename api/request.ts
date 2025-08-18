import { requestClient } from './request.client';

//! Make request from here when you need token
export const request = async <TResult, TBody = undefined>(...params: Parameters<typeof requestClient<TResult, TBody>>) => {
  if (typeof window === 'undefined') {
    const imp = await import('./request.server');
    const [url, options, errorMatchers] = params;

    const apiUrl = process.env.INTERNAL_API_URL || 'http://localhost:3030';
    const fullUrl = `${apiUrl}/api/${url}`;

    return await imp.requestServer<TResult, TBody>(fullUrl, options, errorMatchers);
  }

  return await requestClient<TResult, TBody>(...params);
};
