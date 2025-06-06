import Cookies from 'js-cookie';

import { createRequestClient, handleError, makeRequest } from './utils';

// !Make request from here if don't need any api keys and tokens
export const requestPublic = async <TResult, TBody = undefined>(
  url: string,
  options: Omit<RequestInit, 'body'> & { body?: TBody },
  errorMatchers?: Record<string, Record<string, string>>,
) => {
  const { res, json } = await makeRequest({
    url,
    options,
  });

  if (!res.ok) {
    handleError(json, errorMatchers);
  }

  return json as TResult;
};

export const requestClient = createRequestClient({
  getAccessToken: () => Cookies.get('access_token'),
  getRefreshToken: () => Cookies.get('refresh_token'),
  setToken: (name: string, value: string) => void Cookies.set(name, value),
});
