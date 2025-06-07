import { z } from 'zod';

export const signUpFormSchema = z.object({
  firstName: z.string().min(2, 'Імʼя повинно містити щонайменше 2 символи'),
  lastName: z.string().min(2, 'Прізвище повинно містити щонайменше 2 символи'),
  email: z.string().email('Невірний формат email'),
  password: z.string().min(6, 'Пароль повинен містити щонайменше 6 символів'),
  phoneNumber: z
    .string()
    .min(9, 'Номер телефону повинен містити щонайменше 9 цифр')
    .max(9, 'Номер телефону повинен містити не більше 9 цифр'),
  callingCode: z.string(),
  // .regex(/^\+?\d+$/, 'Невірний формат номера телефону'),
});

export type TypeSignUpFormSchema = z.infer<typeof signUpFormSchema>;
