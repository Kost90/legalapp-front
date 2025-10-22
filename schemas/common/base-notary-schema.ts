import { z } from 'zod';

export const passportTypes = ['paperBook', 'plasticCard'] as const;

export const getPrincipalSchema = (lang: string) =>
  z.object({
    fullName: z.string().min(3, lang === 'ua' ? 'Введіть повне імʼя' : 'Full name is required'),
    birthDate: z.date({
      required_error: lang === 'ua' ? 'Будь ласка, виберіть дату' : 'Please select a date',
      invalid_type_error: lang === 'ua' ? 'Некоректна дата' : 'Invalid date',
    }),
    taxId: z.string().regex(/^\d{10}$/, lang === 'ua' ? 'ІПН має складатися з 10 цифр' : 'TIN must be 10 digits'),
    address: z
      .string()
      .min(5, lang === 'ua' ? 'Введіть повну адресу, мінільна кількість 5' : 'Address is required, at least must be 5 characters'),
    passport: z
      .string()
      .min(3, lang === 'ua' ? 'Введіть серію та номер паспорта, або тільки номер якщо ID картка.' : 'Passport number is required'),
    passportIssueDate: z.date({
      required_error: lang === 'ua' ? 'Будь ласка, виберіть дату видачі паспорту' : 'Please select a date of passport',
      invalid_type_error: lang === 'ua' ? 'Некоректна дата' : 'Invalid date',
    }),
    passportIssueAuthority: z
      .string()
      .min(
        3,
        lang === 'ua'
          ? 'Введіть назву або номер органу, який видав паспорт'
          : 'Passport authority, that gave passport at least must be 6 characters',
      ),
  });

export const getRepresentativeSchema = (lang: string) =>
  z.object({
    representativeName: z.string().min(3, lang === 'ua' ? 'Введіть імʼя представника' : 'Representative name is required'),
    representativeBirthDate: z.date({
      required_error: lang === 'ua' ? 'Будь ласка, виберіть дату' : 'Please select a date',
      invalid_type_error: lang === 'ua' ? 'Некоректна дата' : 'Invalid date',
    }),
    representativeTaxId: z
      .string()
      .regex(/^\d{10}$/, lang === 'ua' ? 'ІПН представника має складатися з 10 цифр' : 'Representative TIN must be 10 digits'),
    representativeAddress: z.string().min(1, lang === 'ua' ? 'Введіть адресу представника' : 'Representative address is required'),
  });

export const getCommonDocumentSchema = (lang: string) =>
  z.object({
    city: z.string().min(1, lang === 'ua' ? 'Введіть місто' : 'City is required'),
    date: z.date({
      required_error: lang === 'ua' ? 'Будь ласка, виберіть дату' : 'Please select a date',
      invalid_type_error: lang === 'ua' ? 'Некоректна дата' : 'Invalid date',
    }),
    validUntil: z.string({
      required_error: lang === 'ua' ? 'Будь ласка, виберіть дату' : 'Please select a date',
      invalid_type_error: lang === 'ua' ? 'Некоректна дата' : 'Invalid date',
    }),
    userEmail: z.string().email(lang === 'ua' ? 'Невірний формат email' : 'Invalid email format'),
  });

export const getBasePowerOfAttorneySchema = (lang: string) => {
  return z.object({
    ...getPrincipalSchema(lang).shape,
    ...getRepresentativeSchema(lang).shape,
    ...getCommonDocumentSchema(lang).shape,
  });
};
