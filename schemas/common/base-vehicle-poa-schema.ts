import { z } from 'zod';

export const getVehiclePoAPrincipalSchema = (lang: string) =>
  z.object({
    fullName: z.preprocess(
      (val) => (val === '' ? undefined : val),
      z
        .string()
        // .min(3, lang === 'ua' ? 'Введіть повне імʼя' : 'Full name is required')
        .default(lang === 'ua' ? '(Іванов Іван Іванович)' : '(Ivanov Ivan Ivanovich)'),
    ),
    birthDate: z.preprocess(
      (val) => (val === '' || val === null ? undefined : val),
      z
        .date({
          required_error: lang === 'ua' ? 'Будь ласка, виберіть дату народження' : 'Please select a date of birth',
        })
        .default(new Date('1970-01-01')),
    ),
    taxId: z.preprocess(
      (val) => (val === '' ? undefined : val),
      z
        .string()
        // .regex(/^\d{10}$/, lang === 'ua' ? 'ІПН має складатися з 10 цифр' : 'Tax ID must be 10 digits')
        .default('(1234567890)'),
    ),

    passportSeries: z.preprocess(
      (val) => (val === '' ? undefined : val),
      z
        .string()
        // .min(2, lang === 'ua' ? 'Серія паспорта - 2 літери' : 'Passport series requires 2 letters')
        // .max(2)
        .default('(KM)'),
    ),
    passportNumber: z.preprocess(
      (val) => (val === '' ? undefined : val),
      z
        .string()
        // .regex(/^\d{3,9}$/, lang === 'ua' ? 'Номер паспорта має складатись з 3-9 цифр' : 'Passport number must be 3-9 digits')
        .default('(123456)'),
    ),
    passportIssueDate: z.preprocess(
      (val) => (val === '' || val === null ? undefined : val),
      z.date({ required_error: lang === 'ua' ? 'Вкажіть дату видачі' : 'Please select an issue date' }).default(new Date('1970-01-01')),
    ),
    passportIssueAuthority: z.preprocess(
      (val) => (val === '' ? undefined : val),
      z
        .string()
        // .min(3, lang === 'ua' ? 'Вкажіть, ким виданий паспорт' : 'Please enter the issuing authority')
        .default(lang === 'ua' ? '(Приморським РВ)' : '(Primorsky RV)'),
    ),

    internationalPassportSeries: z.preprocess(
      (val) => (val === '' ? undefined : val),
      z
        .string()
        // .min(2, lang === 'ua' ? 'Серія паспорта - 2-5 літери' : 'Passport series requires 2-5 letters')
        // .max(5)
        .default('(FA)'),
    ),
    internationalPassportNumber: z.preprocess(
      (val) => (val === '' ? undefined : val),
      z
        .string()
        // .regex(/^\d{3,9}$/, lang === 'ua' ? 'Номер паспорта має складатися з 3-9 цифр' : 'Passport number must be 3-9 digits')
        .default('(123456)'),
    ),
    internationalPassportIssueDate: z.preprocess(
      (val) => (val === '' || val === null ? undefined : val),
      z.date({ required_error: lang === 'ua' ? 'Вкажіть дату видачі' : 'Please select an issue date' }).default(new Date('1970-01-01')),
    ),
    internationalPassportIssueAuthority: z.preprocess(
      (val) => (val === '' ? undefined : val),
      z
        .string()
        // .min(3, lang === 'ua' ? 'Вкажіть орган, що видав паспорт' : 'Please enter the issuing authority code')
        .default('(1234)'),
    ),
  });

export const getVehiclePoARepresentativeSchema = (lang: string) =>
  z.object({
    representativeName: z.preprocess(
      (val) => (val === '' ? undefined : val),
      z
        .string()
        // .min(3, lang === 'ua' ? 'Введіть повне імʼя представника' : 'Full representative name is required')
        .default(lang === 'ua' ? '(Імʼя Представника)' : '(Representative Name)'),
    ),
    representativeBirthDate: z.preprocess(
      (val) => (val === '' || val === null ? undefined : val),
      z
        .date({
          required_error: lang === 'ua' ? 'Будь ласка, виберіть дату народження' : 'Please select a date of birth',
        })
        .default(new Date('1970-01-01')),
    ),
    representativeTaxId: z.preprocess(
      (val) => (val === '' ? undefined : val),
      z
        .string()
        // .regex(/^\d{10}$/, lang === 'ua' ? 'ІПН представника має складатися з 10 цифр' : 'Representative Tax ID must be 10 digits')
        .default('(0123456789)'),
    ),

    representativePassportSeries: z.preprocess(
      (val) => (val === '' ? undefined : val),
      z
        .string()
        // .min(2, lang === 'ua' ? 'Серія паспорта - 2 літери' : 'Passport series requires 2 letters')
        // .max(6)
        .default('(KM)'),
    ),
    representativePassportNumber: z.preprocess(
      (val) => (val === '' ? undefined : val),
      z
        .string()
        // .regex(/^\d{3,9}$/, lang === 'ua' ? 'Номер паспорта має складатися з 3-9 цифр' : 'Passport number must be 3-9 digits')
        .default('(123456)'),
    ),
    representativePassportIssueDate: z.preprocess(
      (val) => (val === '' || val === null ? undefined : val),
      z.date({ required_error: lang === 'ua' ? 'Вкажіть дату видачі' : 'Please select an issue date' }).default(new Date('1970-01-01')),
    ),
    representativePassportIssueAuthority: z.preprocess(
      (val) => (val === '' ? undefined : val),
      z
        .string()
        // .min(3, lang === 'ua' ? 'Вкажіть, ким виданий паспорт' : 'Please enter the issuing authority')
        .default(lang === 'ua' ? '(Приморським РВ)' : '(Primorsky RV)'),
    ),

    representativeInternationalPassportSeries: z.preprocess(
      (val) => (val === '' ? undefined : val),
      z
        .string()
        // .min(2, lang === 'ua' ? 'Серія паспорта - 2 літери' : 'Passport series requires 2 letters')
        // .max(2)
        .default('(FA)'),
    ),
    representativeInternationalPassportNumber: z.preprocess(
      (val) => (val === '' ? undefined : val),
      z
        .string()
        // .regex(/^\d{3,9}$/, lang === 'ua' ? 'Номер паспорта має складатися з 3-9 цифр' : 'Passport number must be 3-9 digits')
        .default('(123456)'),
    ),
    representativeInternationalPassportIssueDate: z.preprocess(
      (val) => (val === '' || val === null ? undefined : val),
      z
        .date({
          required_error: lang === 'ua' ? 'Вкажіть дату видачі' : 'Please select an issue date',
        })
        .default(new Date('1970-01-01')),
    ),
    representativeInternationalPassportAuthority: z.preprocess(
      (val) => (val === '' ? undefined : val),
      z
        .string()
        // .min(3, lang === 'ua' ? 'Вкажіть орган, що видав паспорт' : 'Please enter the issuing authority code')
        .default('(1234)'),
    ),
  });

export const getVehiclePoAMetaSchema = (lang: string) =>
  z.object({
    city: z.string().min(2, lang === 'ua' ? 'Введіть місто' : 'City is required'),
    date: z.date({ required_error: lang === 'ua' ? 'Будь ласка, виберіть дату' : 'Please select a date' }),
    validUntil: z.string({ required_error: lang === 'ua' ? 'Будь ласка, виберіть дату' : 'Please select a date' }),
    userEmail: z.string().email(lang === 'ua' ? 'Невірний формат email' : 'Invalid email format'),
  });

export const getBaseVehiclePowerOfAttorneySchema = (lang: string) => {
  return z.object({
    ...getVehiclePoAPrincipalSchema(lang).shape,
    ...getVehiclePoARepresentativeSchema(lang).shape,
    ...getVehiclePoAMetaSchema(lang).shape,
  });
};
