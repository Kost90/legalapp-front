import { NextMiddlewareResult } from 'next/dist/server/web/types';
import type { NextRequest, NextFetchEvent } from 'next/server';
import { NextResponse } from 'next/server';

type MiddlewareNext = (req: NextRequest, event: NextFetchEvent, res: NextResponse) => Promise<NextMiddlewareResult>;

export type MiddlewareCustom = (
  req: NextRequest,
  event: NextFetchEvent,
  res: NextResponse,
  next: MiddlewareNext,
) => Promise<NextMiddlewareResult> | NextMiddlewareResult;

export const chainMiddlewares = (
  middlewares: MiddlewareCustom[],
  request: NextRequest,
  event: NextFetchEvent,
): Promise<NextMiddlewareResult> => {
  const response = NextResponse.next();

  const runMiddleware = async (
    index: number,
    currentRequest: NextRequest,
    currentEvent: NextFetchEvent,
    currentResponse: NextResponse,
  ): Promise<NextMiddlewareResult> => {
    if (index >= middlewares.length) {
      return currentResponse;
    }

    const middleware = middlewares[index];
    const result = await middleware(currentRequest, currentEvent, currentResponse, (newReq, newEvt, newRes) =>
      runMiddleware(index + 1, newReq, newEvt, newRes),
    );

    if (result instanceof NextResponse) {
      return result;
    }

    return runMiddleware(index + 1, currentRequest, currentEvent, currentResponse);
  };

  return runMiddleware(0, request, event, response);
};
