import { unslugify } from './slugify';

export default async function consumePageParams<
  T extends {
    userId?: string;
    brokerId?: string;
  },
>(params: Promise<T>): Promise<T> {
  const p = { ...(await params) };

  if (p.userId) {
    p.userId = unslugify(p.userId, 'user');
  }

  if (p.brokerId) {
    p.brokerId = unslugify(p.brokerId, 'broker');
  }

  return p;
}
