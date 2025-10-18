import { z } from 'zod';

export const propertyTypes = ['house', 'apartment', 'nonResidential'] as const;

export const getConsentForSellPropertySchema = (lang: string) =>
  z
    .object({
      fullName: z.string().min(3, { message: lang === 'ua' ? 'Введіть повне імʼя' : 'Full name is required' }),
      birthDate: z.date({ required_error: lang === 'ua' ? 'Оберіть дату народження' : 'Please select a date of birth' }),
      taxId: z.string().regex(/^\d{10}$/, { message: lang === 'ua' ? 'ІПН має складатися з 10 цифр' : 'TIN must be 10 digits' }),
      address: z.string().min(10, { message: lang === 'ua' ? 'Введіть повну адресу реєстрації' : 'Enter the full registration address' }),
      userEmail: z.string().email({ message: lang === 'ua' ? 'Невірний формат email' : 'Invalid email format' }),

      passportCountryCode: z
        .string()
        .length(3, { message: lang === 'ua' ? 'Код країни має складатися з 3 літер' : 'Country code must be 3 characters' }),
      passportNumber: z.string().min(3, { message: lang === 'ua' ? 'Введіть номер паспорта мін 3 літери' : 'Passport number is required' }),
      passportRecordNumber: z
        .string()
        .min(5, { message: lang === 'ua' ? 'Введіть номер запису мін 5 літер' : 'Record number is required' }),
      passportIssueDate: z.date({
        required_error: lang === 'ua' ? 'Оберіть дату видачі паспорту' : 'Please select the passport issue date',
      }),
      passportIssuingAuthority: z
        .string()
        .min(4, { message: lang === 'ua' ? 'Введіть орган, що видав паспорт' : 'Enter the issuing authority' }),
      passportExpiryDate: z.date({
        required_error: lang === 'ua' ? 'Оберіть дату закінчення терміну дії' : 'Please select the expiry date',
      }),

      spouseFullName: z
        .string()
        .min(3, { message: lang === 'ua' ? 'Введіть повне імʼя чоловіка/дружини' : 'Full name of spouse is required' }),
      marriageCertNumber: z
        .string()
        .min(3, { message: lang === 'ua' ? 'Введіть номер свідоцтва мінімум 3 літери' : 'Certificate number is required' }),
      marriageCertIssuer: z
        .string()
        .min(5, { message: lang === 'ua' ? 'Введіть, ким видано свідоцтво мінімум 5 літер' : 'Enter the certificate issuer' }),
      marriageCertDate: z.date({
        required_error: lang === 'ua' ? 'Оберіть дату видачі свідоцтва' : 'Please select the certificate issue date',
      }),
      marriageCertRecordNumber: z
        .string()
        .min(1, { message: lang === 'ua' ? 'Введіть номер актового запису' : 'Record number is required' }),

      propertyType: z.enum(propertyTypes, {
        required_error: lang === 'ua' ? 'Оберіть тип нерухомості' : 'Select the property type',
      }),
      propertyArea: z.string().min(1, { message: lang === 'ua' ? 'Введіть площу' : 'Area is required' }),
      propertyAddressForSell: z.string().min(10, { message: lang === 'ua' ? 'Введіть адресу нерухомості' : 'Enter the property address' }),

      includeLand: z.boolean(),
      landArea: z.string().optional(),
      landCadastralNumber: z.string().optional(),

      date: z.date({ required_error: lang === 'ua' ? 'Оберіть дату підписання документа' : 'Please select the document date' }),
    })
    .superRefine((data, ctx) => {
      if (data.includeLand) {
        if (!data.landArea || data.landArea.trim() === '') {
          ctx.addIssue({
            code: z.ZodIssueCode.custom,
            path: ['landArea'],
            message: lang === 'ua' ? 'Введіть площу земельної ділянки' : 'Land area is required',
          });
        }
        if (!data.landCadastralNumber || data.landCadastralNumber.trim() === '') {
          ctx.addIssue({
            code: z.ZodIssueCode.custom,
            path: ['landCadastralNumber'],
            message: lang === 'ua' ? 'Введіть кадастровий номер' : 'Cadastral number is required',
          });
        }
      }
    });

export type ConsentForSellPropertyFormData = z.infer<ReturnType<typeof getConsentForSellPropertySchema>>;
