import { DOCUMENT_TYPE } from '@/lib/constants/common-documents';

const commonFormFields: Record<string, any> = {
  ua: {
    person: [
      { name: 'fullName', label: 'ПІБ', type: 'text', required: true },
      { name: 'birthDate', label: 'Дата народження', type: 'date', required: true },
      { name: 'taxId', label: 'ІПН', type: 'text', required: true },
      { name: 'address', label: 'Адреса', type: 'text', required: true },
      { name: 'passport', label: 'Паспорт', type: 'text', required: true },
      { name: 'passportIssueDate', label: 'Дата видачі паспорта', type: 'date', required: true },
      { name: 'passportIssueAuthority', label: 'Ким виданий паспорт', type: 'text', required: true },
    ],
    representative: [
      { name: 'representativeName', label: 'ПІБ представника', type: 'text', required: true },
      { name: 'representativeBirthDate', label: 'Дата народження представника', type: 'date', required: true },
      { name: 'representativeTIN', label: 'ІПН представника', type: 'text', required: true },
      { name: 'representativeAddress', label: 'Адреса представника', type: 'text', required: true },
    ],
    meta: [
      { name: 'city', label: 'Місто', type: 'text', required: true },
      { name: 'date', label: 'Дата оформлення', type: 'date', required: true },
      { name: 'validUntil', label: 'Дійсна до', type: 'date', required: true },
    ],
  },

  en: {
    person: [
      { name: 'fullName', label: 'Full Name', type: 'text', required: true },
      { name: 'birthDate', label: 'Birth Date', type: 'date', required: true },
      { name: 'tin', label: 'TIN', type: 'text', required: true },
      { name: 'address', label: 'Address', type: 'text', required: true },
      { name: 'passport', label: 'Passport', type: 'text', required: true },
      { name: 'passportIssueDate', label: 'Passport Issue Date', type: 'date', required: true },
      { name: 'passportIssueAuthority', label: 'Whom give you tthis passport', type: 'text', required: true },
    ],
    representative: [
      { name: 'representativeName', label: 'Representative Name', type: 'text', required: true },
      { name: 'representativeBirthDate', label: 'Representative Birth Date', type: 'date', required: true },
      { name: 'representativeTIN', label: 'Representative TIN', type: 'text', required: true },
      { name: 'representativeAddress', label: 'Representative Address', type: 'text', required: true },
    ],
    meta: [
      { name: 'city', label: 'City', type: 'text', required: true },
      { name: 'date', label: 'Date of Document', type: 'date', required: true },
      { name: 'validUntil', label: 'Valid Until', type: 'date', required: true },
    ],
  },
};

// TODO: Remove it when updated documents template!
const { person: uaPerson, ...restUaFields } = commonFormFields.ua;
const filteredUaPerson = uaPerson.filter(
  (field: { name: string; lable: string; type: string; required: boolean }) => field.name !== 'passportIssueAuthority',
);

const { person: enPerson, ...restEnFields } = commonFormFields.en;
const filteredEnPerson = enPerson.filter(
  (field: { name: string; lable: string; type: string; required: boolean }) => field.name !== 'passportIssueAuthority',
);

export const formFieldsSchemas: Record<string, Record<string, any>> = {
  [DOCUMENT_TYPE.PAWER_OF_ATTORNEY_PROPERTY]: {
    ua: {
      person: filteredUaPerson,
      ...restUaFields,
      property: [
        { name: 'propertyAddress.city', label: 'Місто нерухомості', type: 'text', required: false },
        { name: 'propertyAddress.street', label: 'Вулиця', type: 'text', required: false },
        { name: 'propertyAddress.buildNumber', label: 'Номер будинку', type: 'text', required: false },
        { name: 'propertyAddress.apartment', label: 'Квартира', type: 'text', required: false },
        { name: 'propertyAddress.postCode', label: 'Поштовий індекс', type: 'text', required: false },
      ],
    },
    en: {
      person: filteredEnPerson,
      ...restEnFields,
      property: [
        { name: 'propertyAddress.city', label: 'City of property', type: 'text', required: false },
        { name: 'propertyAddress.street', label: 'Street', type: 'text', required: false },
        { name: 'propertyAddress.buildNumber', label: 'Number of Building', type: 'text', required: false },
        { name: 'propertyAddress.apartment', label: 'Apartment', type: 'text', required: false },
        { name: 'propertyAddress.postCode', label: 'Post Code', type: 'text', required: false },
      ],
    },
  },
  [DOCUMENT_TYPE.powerOfAttorneyDocuments]: {
    ...commonFormFields,
  },
};
