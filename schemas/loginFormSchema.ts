import { z } from 'zod';

// TODO: Update validation schema
export const loginFormSchema = z.object({
  password: z.string().min(2, 'Password invalid validation'),
  email: z.string().email('Невірний формат email'),
});

export type typeLoginFormSchema = z.infer<typeof loginFormSchema>;
