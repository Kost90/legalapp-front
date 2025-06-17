import { DOCUMENT_TYPE } from '@/lib/constans';
import { z } from 'zod';

export const formFieldsSchemas: Record<string, Record<string, any[]>> = {
  [DOCUMENT_TYPE.PAWER_OF_ATTORNEY_PROPERTY]: {
    ua: [
      { name: 'details.fullName', label: 'ПІБ', type: 'text', required: true },
      { name: 'details.birthDate', label: 'Дата народження', type: 'date', required: true },
      { name: 'details.tin', label: 'ІПН', type: 'text', required: true },
      { name: 'details.address', label: 'Адреса', type: 'text', required: true },
      { name: 'details.passport', label: 'Паспорт', type: 'text', required: true },
      { name: 'details.passportIssueDate', label: 'Дата видачі паспорта', type: 'date', required: true },

      { name: 'details.representativeName', label: 'ПІБ представника', type: 'text', required: true },
      { name: 'details.representativeBirthDate', label: 'Дата народження представника', type: 'date', required: true },
      { name: 'details.representativeTIN', label: 'ІПН представника', type: 'text', required: true },
      { name: 'details.representativeAddress', label: 'Адреса представника', type: 'text', required: true },

      { name: 'details.city', label: 'Місто', type: 'text', required: true },

      { name: 'details.propertyAddress.city', label: 'Місто нерухомості', type: 'text', required: false },
      { name: 'details.propertyAddress.street', label: 'Вулиця', type: 'text', required: false },
      { name: 'details.propertyAddress.buildNumber', label: 'Номер будинку', type: 'text', required: false },
      { name: 'details.propertyAddress.apartment', label: 'Квартира', type: 'text', required: false },
      { name: 'details.propertyAddress.postCode', label: 'Поштовий індекс', type: 'text', required: false },

      { name: 'details.date', label: 'Дата оформлення', type: 'date', required: true },
      { name: 'details.validUntil', label: 'Дійсна до', type: 'date', required: true },
    ],
    en: [
      { name: 'details.fullName', label: 'Full Name', type: 'text', required: true },
      { name: 'details.birthDate', label: 'Birth Date', type: 'date', required: true },
      { name: 'details.tin', label: 'TIN', type: 'text', required: true },
      { name: 'details.address', label: 'Address', type: 'text', required: true },
      { name: 'details.passport', label: 'Passport', type: 'text', required: true },
      { name: 'details.passportIssueDate', label: 'Passport Issue Date', type: 'date', required: true },

      { name: 'details.representativeName', label: 'Representative Name', type: 'text', required: true },
      { name: 'details.representativeBirthDate', label: 'Representative Birth Date', type: 'date', required: true },
      { name: 'details.representativeTIN', label: 'Representative TIN', type: 'text', required: true },
      { name: 'details.representativeAddress', label: 'Representative Address', type: 'text', required: true },

      { name: 'details.city', label: 'City', type: 'text', required: true },

      { name: 'details.propertyAddress.city', label: 'City of property', type: 'text', required: false },
      { name: 'details.propertyAddress.street', label: 'Street', type: 'text', required: false },
      { name: 'details.propertyAddress.buildNumber', label: 'Number of Aprt.', type: 'text', required: false },
      { name: 'details.propertyAddress.apartment', label: 'Apartment', type: 'text', required: false },
      { name: 'details.propertyAddress.postCode', label: 'Post code', type: 'text', required: false },

      { name: 'details.date', label: 'Date of Document', type: 'date', required: true },
      { name: 'details.validUntil', label: 'Valid Until', type: 'date', required: true },
    ],
  },
};

export const propertyPowerOfAttorneySchema = z.object({
  details: z.object({
    fullName: z.string().min(1),
    birthDate: z.string().min(1),
    tin: z.string().min(1),
    address: z.string().min(1),
    passport: z.string().min(1),
    passportIssueDate: z.string().min(1),

    representativeName: z.string().min(1),
    representativeBirthDate: z.string().min(1),
    representativeTIN: z.string().min(1),
    representativeAddress: z.string().min(1),

    city: z.string().min(1),
    date: z.string().min(1),
    validUntil: z.string().min(1),

    propertyAddress: z
      .object({
        city: z.string().optional(),
        street: z.string().optional(),
        buildNumber: z.string().optional(),
        apartment: z.string().optional(),
        postCode: z.string().optional(),
      })
      .optional(),
  }),
});
