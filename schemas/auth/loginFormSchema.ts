import { z } from 'zod';

export const getLoginFormSchema = (lang: string) =>
  z.object({
    email: z.string().email(lang === 'ua' ? 'Невірний формат email' : 'Invalid email format'),
    password: z.string().min(2, lang === 'ua' ? 'Пароль має бути не менше 2 символів' : 'Password must be at least 2 characters'),
  });

export type LoginFormSchema = z.infer<ReturnType<typeof getLoginFormSchema>>;
