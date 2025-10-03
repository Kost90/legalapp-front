import { z } from 'zod';

import { getBasePowerOfAttorneySchema } from '@/schemas/common/base-notary-schema';

export const isValidDateString = (val: string) => /^\d{2}\.\d{2}\.\d{4}$/.test(val);

export const getReceiveDocumentsPowerOfAttorneySchema = (lang: string) => getBasePowerOfAttorneySchema(lang);

export type ReceiveDocumentsPowerOfAttorneyFormData = z.infer<ReturnType<typeof getReceiveDocumentsPowerOfAttorneySchema>>;
