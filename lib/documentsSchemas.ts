import {
  getReceiveDocumentsPowerOfAttorneySchema,
  ReceiveDocumentsPowerOfAttorneyFormData,
} from '@/schemas/generateDocuments/powerOfAttorneyReceiveDocumentsSchema';
import { getPropertyPowerOfAttorneySchema, PropertyPowerOfAttorneyFormData } from '@/schemas/generateDocuments/powerOfAttorneySchema';

import { DOCUMENT_TYPE } from './constans';

export const DOCUMENT_SCHEMAS = {
  [DOCUMENT_TYPE.PAWER_OF_ATTORNEY_PROPERTY]: {
    schema: getPropertyPowerOfAttorneySchema,
    type: {} as PropertyPowerOfAttorneyFormData,
  },
  [DOCUMENT_TYPE.powerOfAttorneyDocuments]: {
    schema: getReceiveDocumentsPowerOfAttorneySchema,
    type: {} as ReceiveDocumentsPowerOfAttorneyFormData,
  },
};

export const DOCUMENT_KEYS = [DOCUMENT_TYPE.PAWER_OF_ATTORNEY_PROPERTY, DOCUMENT_TYPE.powerOfAttorneyDocuments] as const;
