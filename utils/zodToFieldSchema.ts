// import { ZodTypeAny, ZodObject, ZodString, ZodNumber, ZodBoolean, ZodOptional, ZodEffects } from 'zod';

// import { FieldSchema } from '@/types/formInput';

// type Lang = 'ua' | 'en';

// export const zodToFieldSchema = (schema: ZodObject<any>, lang: Lang): FieldSchema[] => {
//   const shape = schema.shape as Record<string, ZodTypeAny>;

//   return Object.entries(shape).map(([key, value]) => {
//     const field = unwrapEffects(value);

//     const type = resolveType(field);
//     const label = getLabel(key, lang);

//     return {
//       name: key,
//       type,
//       label,
//       required: !isOptional(field),
//     };
//   });
// };

// const unwrapEffects = (zod: ZodTypeAny): ZodTypeAny => {
//   if (zod instanceof ZodEffects) return unwrapEffects(zod.innerType());
//   return zod;
// };

// const isOptional = (zod: ZodTypeAny): boolean => zod instanceof ZodOptional;

// const resolveType = (zod: ZodTypeAny): FieldSchema['type'] => {
//   if (zod instanceof ZodString) return 'text';
//   if (zod instanceof ZodNumber) return 'number';
//   if (zod instanceof ZodBoolean) return 'checkbox';
//   return 'text';
// };

// const getLabel = (fieldName: string, lang: Lang): string => {
//   const labels: Record<string, Record<string, string>> = {
//     fullName: {
//       ua: 'ПІБ',
//       ru: 'ФИО',
//       en: 'Full Name',
//     },
//     email: {
//       ua: 'Електронна пошта',
//       ru: 'Электронная почта',
//       en: 'Email',
//     },
//   };

//   return labels[fieldName]?.[lang] ?? fieldName;
// };
