import { unslugify } from './slugify';

export default async function consumePageParams<
  T extends {
    userId?: string;
    lang?: string;
  },
>(params: Promise<T> | T): Promise<T> {
  const p = { ...(await params) };

  if (p.userId) {
    p.userId = unslugify(p.userId, 'user');
  }

  return p;
}
