import { COMMON_FILED_NOTARY } from '@/lib/constants/filed-for-formates';

import { formatDateToString } from './formatDateToString';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function formatCommonDates<T extends Record<string, any>>(data: T): T {
  const dateFields = [
    COMMON_FILED_NOTARY.birthDate,
    COMMON_FILED_NOTARY.passportIssueDate,
    COMMON_FILED_NOTARY.representativeBirthDate,
    COMMON_FILED_NOTARY.date,
    COMMON_FILED_NOTARY.representativeInternationalPassportIssueDate,
    COMMON_FILED_NOTARY.internationalPassportIssueDate,
    COMMON_FILED_NOTARY.representativePassportIssueDate,
    COMMON_FILED_NOTARY.vehicleRegistrationDate,
  ] as const;

  const formatted = { ...data } as Record<string, any>;

  for (const field of dateFields) {
    if (formatted[field]) {
      formatted[field] = formatDateToString(formatted[field]);
    }
  }

  return formatted as T;
}
