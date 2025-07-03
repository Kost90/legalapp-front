import { getPropertyPowerOfAttorneySchema, PropertyPowerOfAttorneyFormData } from '@/schemas/generateDocuments/powerOfAttorneySchema';

export const DOCUMENT_SCHEMAS = {
  'power-of-attorney-property': {
    schema: getPropertyPowerOfAttorneySchema,
    type: {} as PropertyPowerOfAttorneyFormData,
  },
};

export const DOCUMENT_KEYS = ['power-of-attorney-property'] as const;
