import { z } from 'zod';

export const demoFormSchema = z.object({
  name: z.string().min(2, 'Імʼя повинно містити щонайменше 2 символи'),
  email: z.string().email('Невірний формат email'),
  role: z.string().min(1, 'Оберіть роль'),
});

export type DemoFormSchema = z.infer<typeof demoFormSchema>;
