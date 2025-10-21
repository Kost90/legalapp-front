import { z } from 'zod';

export const getPrincipalSchema = (lang: string) =>
  z.object({
    fullName: z.preprocess(
      (val) => (val === '' ? undefined : val), // Превращаем '' в undefined
      z
        .string()
        // .min(3, lang === 'ua' ? 'Введіть повне імʼя' : 'Full name is required')
        .default(lang === 'ua' ? '(Іванов Іван Іванович)' : '(Ivanov Ivan Ivanovich)'),
    ),
    birthDate: z.preprocess(
      (val) => (val === '' || val === null ? undefined : val), // Проверяем и '' и null для дат
      z
        .date({
          required_error: lang === 'ua' ? 'Будь ласка, виберіть дату' : 'Please select a date',
          invalid_type_error: lang === 'ua' ? 'Некоректна дата' : 'Invalid date',
        })
        .default(new Date('1970-01-01')),
    ),
    taxId: z.preprocess(
      (val) => (val === '' ? undefined : val),
      z
        .string()
        // .regex(/^\d{10}$/, lang === 'ua' ? 'ІПН має складатися з 10 цифр' : 'TIN must be 10 digits')
        .default('(1234567891)'),
    ),
    address: z.preprocess(
      (val) => (val === '' ? undefined : val),
      z
        .string()
        // .min(10, lang === 'ua' ? 'Введіть повну адресу, мінільна кількість 10' : 'Address is required, at least must be 10 characters')
        .default(lang === 'ua' ? '(Повна адреса реєстрації)' : '(Full address of registration)'),
    ),
    passport: z.preprocess(
      (val) => (val === '' ? undefined : val),
      z
        .string()
        // .min(6, lang === 'ua' ? 'Введіть серію та номер паспорта' : 'Passport number is required')
        .default('(КМ1234)'),
    ),
    passportIssueDate: z.preprocess(
      (val) => (val === '' || val === null ? undefined : val),
      z
        .date({
          required_error: lang === 'ua' ? 'Будь ласка, виберіть дату' : 'Please select a date',
          invalid_type_error: lang === 'ua' ? 'Некоректна дата' : 'Invalid date',
        })
        .default(new Date('1970-01-01')),
    ),
    passportIssueAuthority: z.preprocess(
      (val) => (val === '' ? undefined : val),
      z
        .string()
        // .min(
        //   6,
        //   lang === 'ua'
        //     ? 'Введіть назву органу, який видав паспор, мінільна кількість 6'
        //     : 'Passport authority, that gave passport at least must be 6 characters',
        // )
        .default(lang === 'ua' ? '(Приморським)' : '(Primorskim)'),
    ),
  });

export const getRepresentativeSchema = (lang: string) =>
  z.object({
    representativeName: z.preprocess(
      (val) => (val === '' ? undefined : val),
      z
        .string()
        // .min(3, lang === 'ua' ? 'Введіть імʼя представника' : 'Representative name is required')
        .default(lang === 'ua' ? '(Імʼя представника)' : '(Representative name)'),
    ),
    representativeBirthDate: z.preprocess(
      (val) => (val === '' || val === null ? undefined : val),
      z
        .date({
          required_error: lang === 'ua' ? 'Будь ласка, виберіть дату' : 'Please select a date',
          invalid_type_error: lang === 'ua' ? 'Некоректна дата' : 'Invalid date',
        })
        .default(new Date('1970-01-01')),
    ),
    representativeTaxId: z.preprocess(
      (val) => (val === '' ? undefined : val),
      z
        .string()
        // .regex(/^\d{10}$/, lang === 'ua' ? 'ІПН представника має складатися з 10 цифр' : 'Representative TIN must be 10 digits')
        .default('(0123456789)'),
    ),
    representativeAddress: z.preprocess(
      (val) => (val === '' ? undefined : val),
      z
        .string()
        // .min(1, lang === 'ua' ? 'Введіть адресу представника' : 'Representative address is required')
        .default(lang === 'ua' ? '(Адреса представника)' : '(Representative address)'),
    ),
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
