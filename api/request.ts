import { requestClient } from './request.client';

//! Make request from here when you need token
export const request = async <TResult, TBody = undefined>(...params: Parameters<typeof requestClient<TResult, TBody>>) => {
  if (typeof window === 'undefined') {
    const imp = await import('./request.server');

    return await imp.requestServer<TResult, TBody>(...params);
  }

  return await requestClient<TResult, TBody>(...params);
};
