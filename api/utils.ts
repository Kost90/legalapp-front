import { redirect } from 'next/navigation';

import { clearAuth } from './auth/clearAuth';

export const handleError = (
  error: {
    message: string;
    errors?: string[];
  },
  matchers?: Record<string, Record<string, string>>,
) => {
  if (!matchers) {
    throw new Error(
      JSON.stringify({
        message:
          error.errors && error.errors.length > 0 ? error.errors[0] : Array.isArray(error.message) ? error.message[0] : error.message,
      }),
    );
  }

  // Check for error.message match
  for (const [field, errorMap] of Object.entries(matchers)) {
    for (const [errorKey, translation] of Object.entries(errorMap)) {
      if (error.message === errorKey) {
        throw new Error(
          JSON.stringify({
            field,
            message: translation,
          }),
        );
      }
    }
  }

  // Check for error.errors matches
  if (error.errors && error.errors.length > 0) {
    for (const errorMessage of error.errors) {
      for (const [field, errorMap] of Object.entries(matchers)) {
        for (const [errorKey, translation] of Object.entries(errorMap)) {
          if (errorMessage === errorKey) {
            throw new Error(
              JSON.stringify({
                field,
                message: translation,
              }),
            );
          }
        }
      }
    }
  }

  throw new Error(JSON.stringify({ message: error.message }));
};

export const makeRequest = async ({
  url,
  options,
  accessToken,
  responseType = 'json',
}: {
  url: string;
  options: Omit<RequestInit, 'body'> & { body?: any };
  accessToken?: string;
  responseType?: 'json' | 'blob' | 'text';
}) => {
  const headers = new Headers(options.headers);
  let body = undefined;

  if (options.body) {
    if (options.body instanceof FormData) {
      body = options.body;
    } else {
      body = JSON.stringify(options.body);
      headers.set('Content-Type', 'application/json');
    }
  }

  if (accessToken) {
    headers.set('Authorization', `Bearer ${accessToken}`);
  }

  const res = await fetch(`${BASE_URL}${url}`, {
    headers,
    ...options,
    body,
  });

  if (!res.ok) {
    const json = await res.json();
    handleError(json);
  }

  let data: any;
  if (responseType === 'json') {
    data = await res.json();
  } else if (responseType === 'blob') {
    data = await res.blob();
  } else if (responseType === 'text') {
    data = await res.text();
  }

  return {
    res,
    json: data,
  };
};

export const refreshToken = async ({
  refreshToken,
  setToken,
}: {
  refreshToken?: string;
  setToken: (name: string, value: string) => any | Promise<any>;
}) => {
  if (refreshToken) {
    const refreshRes = await fetch(`${BASE_URL}/auth/refresh-token`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ token: refreshToken }),
    });

    const tokens = await refreshRes.json();

    if (refreshRes.ok) {
      await setToken('access_token', tokens.data.accessToken);
      await setToken('action_token', tokens.data.actionToken);

      return tokens;
    } else {
      await clearAuth();

      throw new Error('Failed to refresh token');
    }
  } else {
    await clearAuth();

    throw new Error('No refresh token found');
  }
};

export const createRequestClient = ({
  getAccessToken,
  getRefreshToken,
  setToken,
}: {
  getAccessToken: () => string | undefined | Promise<string | undefined>;
  getRefreshToken: () => string | undefined | Promise<string | undefined>;
  setToken: (name: string, value: string) => void | Promise<void>;
}) => {
  const doRequest = async <TResult, TBody = undefined>(
    url: string,
    options: Omit<RequestInit, 'body'> & { body?: TBody; responseType?: 'json' | 'blob' | 'text' },
    errorMatchers?: Record<string, Record<string, string>>,
  ): Promise<TResult> => {
    options.responseType = options.responseType ?? 'json';

    const accessToken = await getAccessToken();

    const { res, json } = await makeRequest({
      url,
      options,
      accessToken,
      responseType: options.responseType ?? 'json',
    });

    if (res.status === 401 && ['TOKEN_EXPIRED', 'INVALID_TOKEN', 'NO_TOKEN'].includes(json?.error)) {
      const r = await refreshToken({
        refreshToken: await getRefreshToken(),
        setToken,
      });

      if (!r) redirect('/auth/login');

      return doRequest(url, options, errorMatchers);
    }

    if (!res.ok) {
      handleError(json, errorMatchers);
    }

    return json as TResult;
  };

  return doRequest;
};

export const buildUrl = (url: string, params: Record<string, string | number | (string | number)[] | undefined>) => {
  const urlSearchParams = new URLSearchParams();

  for (const [key, value] of Object.entries(params)) {
    if (value === undefined) continue;

    if (Array.isArray(value)) {
      for (const item of value) {
        if (item !== undefined) {
          urlSearchParams.append(key, item.toString());
        }
      }
    } else {
      urlSearchParams.append(key, value.toString());
    }
  }

  const queryString = urlSearchParams.toString();

  return `${url}${queryString ? `?${queryString}` : ''}`;
};

export const BASE_URL = process.env.NEXT_PUBLIC_API_DOMAIN || '/api';
