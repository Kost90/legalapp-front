import { z } from 'zod';

export const getSignUpFormSchema = (lang: string) =>
  z.object({
    firstName: z.string().min(2, lang === 'ua' ? 'Імʼя повинно містити щонайменше 2 символи' : 'First name must be at least 2 characters'),
    lastName: z
      .string()
      .min(2, lang === 'ua' ? 'Прізвище повинно містити щонайменше 2 символи' : 'Last name must be at least 2 characters'),
    email: z.string().email(lang === 'ua' ? 'Невірний формат email' : 'Invalid email format'),
    password: z.string().min(6, lang === 'ua' ? 'Пароль повинен містити щонайменше 6 символів' : 'Password must be at least 6 characters'),
    phone: z
      .string()
      .min(9, lang === 'ua' ? 'Номер телефону повинен містити щонайменше 9 цифр' : 'Phone number must be at least 9 digits')
      .max(9, lang === 'ua' ? 'Номер телефону повинен містити не більше 9 цифр' : 'Phone number must be no more than 9 digits'),
    callingCode: z.string(),
  });

export type TypeSignUpFormSchema = z.infer<ReturnType<typeof getSignUpFormSchema>>;
