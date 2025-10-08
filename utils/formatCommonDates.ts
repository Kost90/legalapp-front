import { DATES_FILED_NOTARY } from '@/lib/constants/filed-for-formates';

import { formatDateToString } from './formatDateToString';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function formatCommonDates<T extends Record<string, any>>(data: T): T {
  const dateFields = Object.values(DATES_FILED_NOTARY);

  const formatted = { ...data } as Record<string, any>;

  for (const field of dateFields) {
    if (formatted[field]) {
      formatted[field] = formatDateToString(formatted[field]);
    }
  }

  return formatted as T;
}
