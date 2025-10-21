import { z } from 'zod';

export const getConsentForMinorToTravelAboardSchema = (lang: string) =>
  z.object({
    parentOneFullName: z.preprocess(
      (val) => (val === '' ? undefined : val),
      z
        .string()
        // .min(3, lang === 'ua' ? 'Введіть повне імʼя' : 'Full name is required')
        .default(lang === 'ua' ? '(ПІБ Батька 1)' : '(Parent One Full Name)'),
    ),
    parentOneBirthDate: z.preprocess(
      (val) => (val === '' || val === null ? undefined : val),
      z.date({ required_error: lang === 'ua' ? 'Оберіть дату народження' : 'Please select a date' }).default(new Date('1970-01-01')),
    ),
    parentOneTaxId: z.preprocess(
      (val) => (val === '' ? undefined : val),
      z
        .string()
        // .regex(/^\d{10}$/, lang === 'ua' ? 'ІПН має складатися з 10 цифр' : 'TIN must be 10 digits')
        .default('(1234567890)'),
    ),
    passportOneSeries: z.preprocess(
      (val) => (val === '' ? undefined : val),
      z
        .string()
        // .min(2, lang === 'ua' ? 'Введіть серію паспорта' : 'Passport series is required')
        .default('(KM)'),
    ),
    passportOneNumber: z.preprocess(
      (val) => (val === '' ? undefined : val),
      z
        .string()
        /*
          .min(
            3,
            lang === 'ua' ? 'Введіть номер паспорта, має складатися мінімум з 3 цифр' : 'Passport number is required must be at least 3 digits',
          )
          */
        .default('(123456)'),
    ),
    passportOneIssueDate: z.preprocess(
      (val) => (val === '' || val === null ? undefined : val),
      z
        .date({ required_error: lang === 'ua' ? 'Оберіть дату видачі паспорту' : 'Please select a date of passport' })
        .default(new Date('1970-01-01')),
    ),
    passportOneIssueAuthority: z.preprocess(
      (val) => (val === '' ? undefined : val),
      z
        .string()
        // .min(6, lang === 'ua' ? 'Введіть орган, що видав паспорт' : 'Issuing authority is required')
        .default(lang === 'ua' ? '(Орган, що видав)' : '(Issuing Authority)'),
    ),
    parentOneAddress: z.preprocess(
      (val) => (val === '' ? undefined : val),
      z
        .string()
        // .min(10, lang === 'ua' ? 'Введіть адресу реєстрації, місця проживання' : 'Type address of registration')
        .default(lang === 'ua' ? '(Адреса реєстрації)' : '(Registration Address)'),
    ),
    minorFullName: z.preprocess(
      (val) => (val === '' ? undefined : val),
      z
        .string()
        // .min(3, lang === 'ua' ? 'Введіть повне імʼя дитини' : "Child's full name is required")
        .default(lang === 'ua' ? '(ПІБ Дитини)' : "(Child's Full Name)"),
    ),
    minorBirthDate: z.preprocess(
      (val) => (val === '' || val === null ? undefined : val),
      z
        .date({ required_error: lang === 'ua' ? 'Оберіть дату народження дитини' : "Please select child's date of birth" })
        .default(new Date('1970-01-01')),
    ),
    minorRelationship: z.string().min(3, lang === 'ua' ? 'Вкажіть, ким доводиться дитина' : 'Relationship is required'),
    chaperoneFullName: z.preprocess(
      (val) => (val === '' ? undefined : val),
      z
        .string()
        // .min(3, lang === 'ua' ? 'Введіть повне імʼя супроводжуючого' : "Chaperone's full name is required")
        .default(lang === 'ua' ? '(ПІБ Супроводжуючого)' : "(Chaperone's Full Name)"),
    ),
    chaperoneBirthDate: z.preprocess(
      (val) => (val === '' || val === null ? undefined : val),
      z
        .date({
          required_error: lang === 'ua' ? 'Оберіть дату народження супроводжуючого' : "Please select chaperone's date of birth",
        })
        .default(new Date('1970-01-01')),
    ),
    travelStartDate: z.preprocess(
      (val) => (val === '' || val === null ? undefined : val),
      z
        .date({
          required_error: lang === 'ua' ? 'Оберіть дату початку поїздки' : 'Please select travel start date',
        })
        .default(new Date('1970-01-01')),
    ),
    travelEndDate: z.preprocess(
      (val) => (val === '' || val === null ? undefined : val),
      z
        .date({ required_error: lang === 'ua' ? 'Оберіть дату закінчення поїздки' : 'Please select travel end date' })
        .default(new Date('1970-01-01')),
    ),
    city: z.string().min(2, lang === 'ua' ? 'Введіть місто' : 'City is required'),

    date: z.date({ required_error: lang === 'ua' ? 'Оберіть дату документа' : 'Please select a date' }),
    userEmail: z.string().email(lang === 'ua' ? 'Невірний формат email' : 'Invalid email format'),
  });

export type ConsentForMinorFormData = z.infer<ReturnType<typeof getConsentForMinorToTravelAboardSchema>>;
