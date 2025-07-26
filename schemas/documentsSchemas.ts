import { DOCUMENT_TYPE } from '@/lib/constants/common-documents';
import {
  getReceiveDocumentsPowerOfAttorneySchema,
  ReceiveDocumentsPowerOfAttorneyFormData,
} from '@/schemas/generateDocuments/powerOfAttorneyReceiveDocumentsSchema';
import { getPropertyPowerOfAttorneySchema, PropertyPowerOfAttorneyFormData } from '@/schemas/generateDocuments/powerOfAttorneySchema';

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

export const DOCUMENTS_SCHEMAS_KEYS = [DOCUMENT_TYPE.PAWER_OF_ATTORNEY_PROPERTY, DOCUMENT_TYPE.powerOfAttorneyDocuments] as const;
