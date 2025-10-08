import { z } from 'zod';
// TODO: Can add parent two
export const getConsentForMinorToTravelAboardSchema = (lang: string) =>
  z
    .object({
      parentOneFullName: z.string().min(3, lang === 'ua' ? 'Введіть повне імʼя' : 'Full name is required'),
      parentOneBirthDate: z.date({ required_error: lang === 'ua' ? 'Оберіть дату народження' : 'Please select a date' }),
      parentOneTaxId: z.string().regex(/^\d{10}$/, lang === 'ua' ? 'ІПН має складатися з 10 цифр' : 'TIN must be 10 digits'),
      passportOneSeries: z.string().min(2, lang === 'ua' ? 'Введіть серію паспорта' : 'Passport series is required'),
      passportOneNumber: z
        .string()
        .min(
          3,
          lang === 'ua'
            ? 'Введіть номер паспорта, має складатися мінімум з 3 цифр'
            : 'Passport number is required must be at least 3 digits',
        ),
      passportOneIssueDate: z.date({ required_error: lang === 'ua' ? 'Оберіть дату видачі паспорту' : 'Please select a date of passport' }),
      passportOneIssueAuthority: z.string().min(6, lang === 'ua' ? 'Введіть орган, що видав паспорт' : 'Issuing authority is required'),
      parentOneAddress: z.string().min(10, lang === 'ua' ? 'Введіть адресу реєстрації, місця проживання' : 'Type address of registration'),
      minorFullName: z.string().min(3, lang === 'ua' ? 'Введіть повне імʼя дитини' : "Child's full name is required"),
      minorBirthDate: z.date({ required_error: lang === 'ua' ? 'Оберіть дату народження дитини' : "Please select child's date of birth" }),
      minorRelationship: z.string().min(3, lang === 'ua' ? 'Вкажіть, ким доводиться дитина' : 'Relationship is required'),
      chaperoneFullName: z.string().min(3, lang === 'ua' ? 'Введіть повне імʼя супроводжуючого' : "Chaperone's full name is required"),
      chaperoneBirthDate: z.date({
        required_error: lang === 'ua' ? 'Оберіть дату народження супроводжуючого' : "Please select chaperone's date of birth",
      }),
      travelStartDate: z.date({
        required_error: lang === 'ua' ? 'Оберіть дату початку поїздки' : 'Please select travel start date',
      }),
      travelEndDate: z.date({ required_error: lang === 'ua' ? 'Оберіть дату закінчення поїздки' : 'Please select travel end date' }),
      city: z.string().min(2, lang === 'ua' ? 'Введіть місто' : 'City is required'),
      date: z.date({ required_error: lang === 'ua' ? 'Оберіть дату документа' : 'Please select a date' }),
      userEmail: z.string().email(lang === 'ua' ? 'Невірний формат email' : 'Invalid email format'),
    })
    // TODO: Think how to fix
    .refine((data) => data.travelEndDate >= data.travelStartDate, {
      message: lang === 'ua' ? 'Дата закінчення поїздки не може бути раніше дати початку' : 'End date cannot be earlier than start date',
      path: ['travelEndDate'],
    });

export type ConsentForMinorFormData = z.infer<ReturnType<typeof getConsentForMinorToTravelAboardSchema>>;
