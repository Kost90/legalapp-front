import { z } from 'zod';

export const getVehiclePoAPrincipalSchema = (lang: string) =>
  z.object({
    fullName: z.string().min(3, lang === 'ua' ? 'Введіть повне імʼя' : 'Full name is required'),
    birthDate: z.date({
      required_error: lang === 'ua' ? 'Будь ласка, виберіть дату народження' : 'Please select a date of birth',
    }),
    taxId: z.string().regex(/^\d{10}$/, lang === 'ua' ? 'ІПН має складатися з 10 цифр' : 'Tax ID must be 10 digits'),

    passportSeries: z
      .string()
      .min(2, lang === 'ua' ? 'Серія паспорта - 2 літери' : 'Passport series requires 2 letters')
      .max(2),
    passportNumber: z
      .string()
      .regex(/^\d{6,9}$/, lang === 'ua' ? 'Номер паспорта має складатись з 6-9 цифр' : 'Passport number must be 6-9 digits'),
    passportIssueDate: z.date({ required_error: lang === 'ua' ? 'Вкажіть дату видачі' : 'Please select an issue date' }),
    passportIssueAuthority: z.string().min(5, lang === 'ua' ? 'Вкажіть, ким виданий паспорт' : 'Please enter the issuing authority'),

    internationalPassportSeries: z
      .string()
      .min(2, lang === 'ua' ? 'Серія паспорта - 2 літери' : 'Passport series requires 2 letters')
      .max(2),
    internationalPassportNumber: z
      .string()
      .regex(/^\d{6,9}$/, lang === 'ua' ? 'Номер паспорта має складатися з 6-9 цифр' : 'Passport number must be 6-9 digits'),
    internationalPassportIssueDate: z.date({ required_error: lang === 'ua' ? 'Вкажіть дату видачі' : 'Please select an issue date' }),
    internationalPassportIssueAuthority: z
      .string()
      .min(3, lang === 'ua' ? 'Вкажіть орган, що видав паспорт' : 'Please enter the issuing authority code'),
  });

export const getVehiclePoARepresentativeSchema = (lang: string) =>
  z.object({
    representativeName: z.string().min(3, lang === 'ua' ? 'Введіть повне імʼя представника' : 'Full representative name is required'),
    representativeBirthDate: z.date({
      required_error: lang === 'ua' ? 'Будь ласка, виберіть дату народження' : 'Please select a date of birth',
    }),
    representativeTaxId: z
      .string()
      .regex(/^\d{10}$/, lang === 'ua' ? 'ІПН представника має складатися з 10 цифр' : 'Representative Tax ID must be 10 digits'),

    representativePassportSeries: z
      .string()
      .min(2, lang === 'ua' ? 'Серія паспорта - 2 літери' : 'Passport series requires 2 letters')
      .max(2),
    representativePassportNumber: z
      .string()
      .regex(/^\d{6,9}$/, lang === 'ua' ? 'Номер паспорта має складатися з 6-9 цифр' : 'Passport number must be 6-9 digits'),
    representativePassportIssueDate: z.date({ required_error: lang === 'ua' ? 'Вкажіть дату видачі' : 'Please select an issue date' }),
    representativePassportIssueAuthority: z
      .string()
      .min(5, lang === 'ua' ? 'Вкажіть, ким виданий паспорт' : 'Please enter the issuing authority'),

    representativeInternationalPassportSeries: z
      .string()
      .min(2, lang === 'ua' ? 'Серія паспорта - 2 літери' : 'Passport series requires 2 letters')
      .max(2),
    representativeInternationalPassportNumber: z
      .string()
      .regex(/^\d{6,9}$/, lang === 'ua' ? 'Номер паспорта має складатися з 6-9 цифр' : 'Passport number must be 6-9 digits'),
    representativeInternationalPassportIssueDate: z.date({
      required_error: lang === 'ua' ? 'Вкажіть дату видачі' : 'Please select an issue date',
    }),
    representativeInternationalPassportAuthority: z
      .string()
      .min(3, lang === 'ua' ? 'Вкажіть орган, що видав паспорт' : 'Please enter the issuing authority code'),
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
