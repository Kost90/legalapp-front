import { z } from 'zod';

export const getPropertyPowerOfAttorneySchema = (lang: string) =>
  z.object({
    fullName: z.string().min(1, lang === 'ua' ? 'Введіть повне імʼя' : 'Full name is required'),
    birthDate: z.string().min(1, lang === 'ua' ? 'Введіть дату народження' : 'Birth date is required'),
    tin: z.string().min(1, lang === 'ua' ? 'Введіть ІПН' : 'Tax ID is required'),
    address: z.string().min(1, lang === 'ua' ? 'Введіть адресу' : 'Address is required'),
    passport: z.string().min(1, lang === 'ua' ? 'Введіть номер паспорта' : 'Passport number is required'),
    passportIssueDate: z.string().min(1, lang === 'ua' ? 'Введіть дату видачі паспорта' : 'Passport issue date is required'),

    representativeName: z.string().min(1, lang === 'ua' ? 'Введіть імʼя представника' : 'Representative name is required'),
    representativeBirthDate: z
      .string()
      .min(1, lang === 'ua' ? 'Введіть дату народження представника' : 'Representative birth date is required'),
    representativeTIN: z.string().min(1, lang === 'ua' ? 'Введіть ІПН представника' : 'Representative TIN is required'),
    representativeAddress: z.string().min(1, lang === 'ua' ? 'Введіть адресу представника' : 'Representative address is required'),

    propertyAddress: z.object({
      city: z.string().min(1, lang === 'ua' ? 'Введіть місто' : 'City is required'),
      street: z.string().min(1, lang === 'ua' ? 'Введіть вулицю' : 'Street is required'),
      buildNumber: z.string().min(1, lang === 'ua' ? 'Введіть номер будинку' : 'Building number is required'),
      apartment: z.string().optional(),
      postCode: z.string().optional(),
    }),

    city: z.string().min(1, lang === 'ua' ? 'Введіть місто' : 'City is required'),
    date: z.string().min(1, lang === 'ua' ? 'Введіть дату' : 'Date is required'),
    validUntil: z.string().min(1, lang === 'ua' ? 'Введіть термін дії' : 'Valid until date is required'),
  });

export type PropertyPowerOfAttorneyFormData = z.infer<ReturnType<typeof getPropertyPowerOfAttorneySchema>>;
