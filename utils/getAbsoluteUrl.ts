export function getAbsoluteUrl(request: Request, path: string) {
  const proto = request.headers.get('x-forwarded-proto') ?? 'http';
  const host = request.headers.get('host') ?? 'localhost:3000';
  return `${proto}://${host}${path}`;
}
