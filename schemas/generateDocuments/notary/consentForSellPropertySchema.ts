import { z } from 'zod';

export const propertyTypes = ['house', 'apartment', 'nonResidential'] as const;

// export const getConsentForSellPropertySchema = (lang: string) =>
//   z
//     .object({
//       fullName: z.string().min(3, { message: lang === 'ua' ? 'Введіть повне імʼя' : 'Full name is required' }),
//       birthDate: z.date({ required_error: lang === 'ua' ? 'Оберіть дату народження' : 'Please select a date of birth' }),
//       taxId: z.string().regex(/^\d{10}$/, { message: lang === 'ua' ? 'ІПН має складатися з 10 цифр' : 'TIN must be 10 digits' }),
//       address: z.string().min(10, { message: lang === 'ua' ? 'Введіть повну адресу реєстрації' : 'Enter the full registration address' }),
//       userEmail: z.string().email({ message: lang === 'ua' ? 'Невірний формат email' : 'Invalid email format' }),

//       passportCountryCode: z
//         .string()
//         .length(3, { message: lang === 'ua' ? 'Код країни має складатися з 3 літер' : 'Country code must be 3 characters' }),
//       passportNumber: z.string().min(3, { message: lang === 'ua' ? 'Введіть номер паспорта мін 3 літери' : 'Passport number is required' }),
//       passportRecordNumber: z
//         .string()
//         .min(5, { message: lang === 'ua' ? 'Введіть номер запису мін 5 літер' : 'Record number is required' }),
//       passportIssueDate: z.date({
//         required_error: lang === 'ua' ? 'Оберіть дату видачі паспорту' : 'Please select the passport issue date',
//       }),
//       passportIssuingAuthority: z
//         .string()
//         .min(4, { message: lang === 'ua' ? 'Введіть орган, що видав паспорт' : 'Enter the issuing authority' }),
//       passportExpiryDate: z.date({
//         required_error: lang === 'ua' ? 'Оберіть дату закінчення терміну дії' : 'Please select the expiry date',
//       }),

//       spouseFullName: z
//         .string()
//         .min(3, { message: lang === 'ua' ? 'Введіть повне імʼя чоловіка/дружини' : 'Full name of spouse is required' }),
//       marriageCertNumber: z
//         .string()
//         .min(3, { message: lang === 'ua' ? 'Введіть номер свідоцтва мінімум 3 літери' : 'Certificate number is required' }),
//       marriageCertIssuer: z
//         .string()
//         .min(5, { message: lang === 'ua' ? 'Введіть, ким видано свідоцтво мінімум 5 літер' : 'Enter the certificate issuer' }),
//       marriageCertDate: z.date({
//         required_error: lang === 'ua' ? 'Оберіть дату видачі свідоцтва' : 'Please select the certificate issue date',
//       }),
//       marriageCertRecordNumber: z
//         .string()
//         .min(1, { message: lang === 'ua' ? 'Введіть номер актового запису' : 'Record number is required' }),

//       propertyType: z.enum(propertyTypes, {
//         required_error: lang === 'ua' ? 'Оберіть тип нерухомості' : 'Select the property type',
//       }),
//       propertyArea: z.string().min(1, { message: lang === 'ua' ? 'Введіть площу' : 'Area is required' }),
//       propertyAddressForSell: z.string().min(10, { message: lang === 'ua' ? 'Введіть адресу нерухомості' : 'Enter the property address' }),

//       includeLand: z.boolean(),
//       landArea: z.string().optional(),
//       landCadastralNumber: z.string().optional(),

//       date: z.date({ required_error: lang === 'ua' ? 'Оберіть дату підписання документа' : 'Please select the document date' }),
//     })
export const getConsentForSellPropertySchema = (lang: string) =>
  z
    .object({
      fullName: z.preprocess(
        (val) => (val === '' ? undefined : val),
        z
          .string()
          // .min(3, { message: lang === 'ua' ? 'Введіть повне імʼя' : 'Full name is required' })
          .default(lang === 'ua' ? '(ПІБ Заявника)' : '(Applicant Full Name)'),
      ),
      birthDate: z.preprocess(
        (val) => (val === '' || val === null ? undefined : val),
        z
          .date({ required_error: lang === 'ua' ? 'Оберіть дату народження' : 'Please select a date of birth' })
          .default(new Date('1970-01-01')),
      ),
      taxId: z.preprocess(
        (val) => (val === '' ? undefined : val),
        z
          .string()
          // .regex(/^\d{10}$/, { message: lang === 'ua' ? 'ІПН має складатися з 10 цифр' : 'TIN must be 10 digits' })
          .default('(1234567890)'),
      ),
      address: z.preprocess(
        (val) => (val === '' ? undefined : val),
        z
          .string()
          // .min(10, { message: lang === 'ua' ? 'Введіть повну адресу реєстрації' : 'Enter the full registration address' })
          .default(lang === 'ua' ? '(Повна адреса реєстрації)' : '(Full registration address)'),
      ),
      userEmail: z
        .string()
        // .email({ message: lang === 'ua' ? 'Невірний формат email' : 'Invalid email format' })
        .default('example@user.com'),

      passportCountryCode: z.preprocess(
        (val) => (val === '' ? undefined : val),
        z
          .string()
          // .length(3, { message: lang === 'ua' ? 'Код країни має складатися з 3 літер' : 'Country code must be 3 characters' })
          .default('(UKR)'),
      ),
      passportNumber: z.preprocess(
        (val) => (val === '' ? undefined : val),
        z
          .string()
          // .min(3, { message: lang === 'ua' ? 'Введіть номер паспорта мін 3 літери' : 'Passport number is required' })
          .default('(123456)'),
      ),
      passportRecordNumber: z.preprocess(
        (val) => (val === '' ? undefined : val),
        z
          .string()
          // .min(5, { message: lang === 'ua' ? 'Введіть номер запису мін 5 літер' : 'Record number is required' })
          .default('(19700101-12345)'),
      ),
      passportIssueDate: z.preprocess(
        (val) => (val === '' || val === null ? undefined : val),
        z
          .date({
            required_error: lang === 'ua' ? 'Оберіть дату видачі паспорту' : 'Please select the passport issue date',
          })
          .default(new Date('1970-01-01')),
      ),
      passportIssuingAuthority: z.preprocess(
        (val) => (val === '' ? undefined : val),
        z
          .string()
          // .min(4, { message: lang === 'ua' ? 'Введіть орган, що видав паспорт' : 'Enter the issuing authority' })
          .default('(1234)'),
      ),
      passportExpiryDate: z.preprocess(
        (val) => (val === '' || val === null ? undefined : val),
        z
          .date({
            required_error: lang === 'ua' ? 'Оберіть дату закінчення терміну дії' : 'Please select the expiry date',
          })
          .default(new Date('1970-01-01')),
      ),

      spouseFullName: z.preprocess(
        (val) => (val === '' ? undefined : val),
        z
          .string()
          // .min(3, { message: lang === 'ua' ? 'Введіть повне імʼя чоловіка/дружини' : 'Full name of spouse is required' })
          .default(lang === 'ua' ? '(ПІБ Чоловіка/Дружини)' : '(Spouse Full Name)'),
      ),
      marriageCertNumber: z.preprocess(
        (val) => (val === '' ? undefined : val),
        z
          .string()
          // .min(3, { message: lang === 'ua' ? 'Введіть номер свідоцтва мінімум 3 літери' : 'Certificate number is required' })
          .default('(I-AM 123456)'),
      ),
      marriageCertIssuer: z.preprocess(
        (val) => (val === '' ? undefined : val),
        z
          .string()
          // .min(5, { message: lang === 'ua' ? 'Введіть, ким видано свідоцтво мінімум 5 літер' : 'Enter the certificate issuer' })
          .default(lang === 'ua' ? '(Орган видачі)' : '(Issuing Authority)'),
      ),
      marriageCertDate: z.preprocess(
        (val) => (val === '' || val === null ? undefined : val),
        z
          .date({
            required_error: lang === 'ua' ? 'Оберіть дату видачі свідоцтва' : 'Please select the certificate issue date',
          })
          .default(new Date('1970-01-01')),
      ),
      marriageCertRecordNumber: z.preprocess(
        (val) => (val === '' ? undefined : val),
        z
          .string()
          // .min(1, { message: lang === 'ua' ? 'Введіть номер актового запису' : 'Record number is required' })
          .default('(123)'),
      ),

      // --- Поля без изменений ---
      propertyType: z.enum(propertyTypes, {
        required_error: lang === 'ua' ? 'Оберіть тип нерухомості' : 'Select the property type',
      }),
      includeLand: z.boolean(),
      // ------------------------

      propertyArea: z.preprocess(
        (val) => (val === '' ? undefined : val),
        z
          .string()
          // .min(1, { message: lang === 'ua' ? 'Введіть площу' : 'Area is required' })
          .default('(100.0)'),
      ),
      propertyAddressForSell: z.preprocess(
        (val) => (val === '' ? undefined : val),
        z
          .string()
          // .min(10, { message: lang === 'ua' ? 'Введіть адресу нерухомості' : 'Enter the property address' })
          .default(lang === 'ua' ? '(Адреса нерухомості)' : '(Property Address)'),
      ),

      landArea: z.preprocess(
        (val) => (val === '' ? undefined : val),
        z.string().optional().default('(10)'), // .optional() здесь можно оставить
      ),
      landCadastralNumber: z.preprocess(
        (val) => (val === '' ? undefined : val),
        z.string().optional().default('(123456:789:001)'), // .optional() здесь можно оставить
      ),

      date: z
        .date({ required_error: lang === 'ua' ? 'Оберіть дату підписання документа' : 'Please select the document date' })
        .default(new Date('1970-01-01')),
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
