import { z } from 'zod';

import { getBasePowerOfAttorneySchema } from '@/schemas/common/base-notary-schema';

export const isValidDateString = (val: string) => /^\d{2}\.\d{2}\.\d{4}$/.test(val);

export const getPropertyPowerOfAttorneySchema = (lang: string) =>
  getBasePowerOfAttorneySchema(lang).extend({
    propertyAddress: z.object({
      city: z.preprocess(
        (val) => (val === '' ? undefined : val),
        z
          .string()
          // .min(1, lang === 'ua' ? 'Введіть місто' : 'City is required')
          .default(lang === 'ua' ? 'Одеса' : 'Odesa'),
      ),
      street: z.preprocess(
        (val) => (val === '' ? undefined : val),
        z
          .string()
          // .min(1, lang === 'ua' ? 'Введіть вулицю' : 'Street is required')
          .default(lang === 'ua' ? '(Вулиця)' : '(Street)'),
      ),
      buildNumber: z.preprocess(
        (val) => (val === '' ? undefined : val),
        z
          .string()
          // .min(1S, lang === 'ua' ? 'Введіть номер будинку' : 'Building number is required')
          .default('(1)'),
      ),
      apartment: z.preprocess(
        (val) => (val === '' ? undefined : val),
        z.string().optional().default('(1)'), // .default() можно использовать и с .optional()
      ),
      postCode: z.preprocess(
        (val) => (val === '' ? undefined : val),
        z
          .string()
          // .regex(/^\d{5}$/, lang === 'ua' ? 'Поштовий індекс має складатися з 5 цифр' : 'Post code must be 5 digits')
          .optional()
          .default('(12345)'),
      ),
    }),
  });

export type PropertyPowerOfAttorneyFormData = z.infer<ReturnType<typeof getPropertyPowerOfAttorneySchema>>;
