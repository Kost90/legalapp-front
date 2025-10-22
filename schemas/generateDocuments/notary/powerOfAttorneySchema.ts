import { z } from 'zod';

import { getBasePowerOfAttorneySchema } from '@/schemas/common/base-notary-schema';

import { propertyTypes } from './consentForSellPropertySchema';

export const isValidDateString = (val: string) => /^\d{2}\.\d{2}\.\d{4}$/.test(val);

export const getPropertyPowerOfAttorneySchema = (lang: string) =>
  getBasePowerOfAttorneySchema(lang).extend({
    propertyAddress: z.object({
      city: z.string().min(1, lang === 'ua' ? 'Введіть місто' : 'City is required'),
      street: z.string().min(1, lang === 'ua' ? 'Введіть вулицю' : 'Street is required'),
      propertyType: z.enum(propertyTypes, {
        required_error: lang === 'ua' ? 'Оберіть тип нерухомості' : 'Select the property type',
      }),
      buildNumber: z.string().min(1, lang === 'ua' ? 'Введіть номер будинку' : 'Building number is required'),
      apartment: z.string().optional(),
      postCode: z
        .string()
        .regex(new RegExp(`^(\\d{5})?$`), {
          message: lang === 'ua' ? 'Поштовий індекс має складатися з 5 цифр' : 'Post code must be 5 digits',
        })
        .optional(),
    }),
  });

export type PropertyPowerOfAttorneyFormData = z.infer<ReturnType<typeof getPropertyPowerOfAttorneySchema>>;
