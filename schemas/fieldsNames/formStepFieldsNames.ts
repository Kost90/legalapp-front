import { DOCUMENT_TYPE } from '@/lib/constans';

export const formStepFields: Record<string, Record<string, string[]>> = {
  [DOCUMENT_TYPE.PAWER_OF_ATTORNEY_PROPERTY]: {
    person: ['fullName', 'birthDate', 'tin', 'address', 'passport', 'passportIssueDate'],
    representative: ['representativeName', 'representativeBirthDate', 'representativeTIN', 'representativeAddress'],
    property: [
      'propertyAddress.city',
      'propertyAddress.street',
      'propertyAddress.buildNumber',
      'propertyAddress.apartment',
      'propertyAddress.postCode',
    ],
    meta: ['city', 'date', 'validUntil'],
  },
  [DOCUMENT_TYPE.powerOfAttorneyDocuments]: {
    person: ['fullName', 'birthDate', 'tin', 'address', 'passport', 'passportIssueDate'],
    representative: ['representativeName', 'representativeBirthDate', 'representativeTIN', 'representativeAddress'],
    meta: ['city', 'date', 'validUntil'],
  },
};
