export type FieldSchema = {
  name: string;
  label: string;
  type: string;
  required: boolean;
};
// import { FieldValues } from 'react-hook-form';

// // TFormData будет представлять тип данных вашей формы,
// // например, PropertyPowerOfAttorneyFormData
// export type FieldSchema<TFormData extends FieldValues> = {
//   // Теперь `name` не просто строка, а один из ключей формы.
//   // TypeScript будет ругаться, если вы в схеме укажете несуществующее поле!
//   name: keyof TFormData;
//   label: string;
//   type: 'text' | 'date' | 'select' | 'group';
//   required: boolean;
// };
