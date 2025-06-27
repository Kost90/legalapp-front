import { z } from 'zod';

export const isValidDateString = (val: string) => /^\d{2}\.\d{2}\.\d{4}$/.test(val);

export const getPropertyPowerOfAttorneySchema = (lang: string) =>
  z.object({
    fullName: z.string().min(3, lang === 'ua' ? 'Введіть повне імʼя' : 'Full name is required'),
    birthDate: z.date({
      required_error: lang === 'ua' ? 'Будь ласка, виберіть дату' : 'Please select a date',
      invalid_type_error: lang === 'ua' ? 'Некоректна дата' : 'Invalid date',
    }),
    tin: z.string().regex(/^\d{10}$/, lang === 'ua' ? 'ІПН має складатися з 10 цифр' : 'TIN must be 10 digits'),
    address: z
      .string()
      .min(10, lang === 'ua' ? 'Введіть повну адресу, мінільна кількість 10' : 'Address is required, at least must be 10 characters'),
    passport: z.string().min(6, lang === 'ua' ? 'Введіть серію та номер паспорта' : 'Passport number is required'),
    passportIssueDate: z.date({
      required_error: lang === 'ua' ? 'Будь ласка, виберіть дату' : 'Please select a date',
      invalid_type_error: lang === 'ua' ? 'Некоректна дата' : 'Invalid date',
    }),

    representativeName: z.string().min(3, lang === 'ua' ? 'Введіть імʼя представника' : 'Representative name is required'),
    representativeBirthDate: z.date({
      required_error: lang === 'ua' ? 'Будь ласка, виберіть дату' : 'Please select a date',
      invalid_type_error: lang === 'ua' ? 'Некоректна дата' : 'Invalid date',
    }),
    representativeTIN: z
      .string()
      .regex(/^\d{10}$/, lang === 'ua' ? 'ІПН представника має складатися з 10 цифр' : 'Representative TIN must be 10 digits'),
    representativeAddress: z.string().min(1, lang === 'ua' ? 'Введіть адресу представника' : 'Representative address is required'),

    propertyAddress: z.object({
      city: z.string().min(1, lang === 'ua' ? 'Введіть місто' : 'City is required'),
      street: z.string().min(1, lang === 'ua' ? 'Введіть вулицю' : 'Street is required'),
      buildNumber: z.string().min(1, lang === 'ua' ? 'Введіть номер будинку' : 'Building number is required'),
      apartment: z.string().optional(),
      postCode: z
        .string()
        .regex(/^\d{5}$/, lang === 'ua' ? 'Поштовий індекс має складатися з 5 цифр' : 'Post code must be 5 digits')
        .optional(),
    }),

    city: z.string().min(1, lang === 'ua' ? 'Введіть місто' : 'City is required'),
    date: z.date({
      required_error: lang === 'ua' ? 'Будь ласка, виберіть дату' : 'Please select a date',
      invalid_type_error: lang === 'ua' ? 'Некоректна дата' : 'Invalid date',
    }),
    validUntil: z.date({
      required_error: lang === 'ua' ? 'Будь ласка, виберіть дату' : 'Please select a date',
      invalid_type_error: lang === 'ua' ? 'Некоректна дата' : 'Invalid date',
    }),
  });

export type PropertyPowerOfAttorneyFormData = z.infer<ReturnType<typeof getPropertyPowerOfAttorneySchema>>;
