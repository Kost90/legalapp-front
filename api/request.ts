import { requestClient } from './request.client';
import { BASE_SERVER_URL } from './utils';

//! Make request from here when you need token
export const request = async <TResult, TBody = undefined>(...params: Parameters<typeof requestClient<TResult, TBody>>) => {
  if (typeof window === 'undefined') {
    const imp = await import('./request.server');
    const [url, options, errorMatchers] = params;

    const fullUrl = `${BASE_SERVER_URL}/${url}`;

    return await imp.requestServer<TResult, TBody>(fullUrl, options, errorMatchers);
  }

  return await requestClient<TResult, TBody>(...params);
};
