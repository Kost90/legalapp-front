import { DOCUMENT_TYPE } from '@/lib/constants/common-documents';
import {
  getReceiveDocumentsPowerOfAttorneySchema,
  ReceiveDocumentsPowerOfAttorneyFormData,
} from '@/schemas/generateDocuments/notary/powerOfAttorneyReceiveDocumentsSchema';
import {
  getPropertyPowerOfAttorneySchema,
  PropertyPowerOfAttorneyFormData,
} from '@/schemas/generateDocuments/notary/powerOfAttorneySchema';

import { getConsentForMinorToTravelAboardSchema, ConsentForMinorFormData } from './notary/consentForMinorToTravelAboardSchema';
import { getVehiclePowerOfAttorneySchema, VehiclePowerOfAttorneyFormData } from './notary/powerOfAttorneyVehicleSchema';

export const DOCUMENT_SCHEMAS = {
  [DOCUMENT_TYPE.PAWER_OF_ATTORNEY_PROPERTY]: {
    schema: getPropertyPowerOfAttorneySchema,
    type: {} as PropertyPowerOfAttorneyFormData,
  },
  [DOCUMENT_TYPE.powerOfAttorneyDocuments]: {
    schema: getReceiveDocumentsPowerOfAttorneySchema,
    type: {} as ReceiveDocumentsPowerOfAttorneyFormData,
  },
  [DOCUMENT_TYPE.powerAttorneyVehicle]: {
    schema: getVehiclePowerOfAttorneySchema,
    type: {} as VehiclePowerOfAttorneyFormData,
  },
  [DOCUMENT_TYPE.consentForMinorToTravelAboard]: {
    schema: getConsentForMinorToTravelAboardSchema,
    type: {} as ConsentForMinorFormData,
  },
};

export const DOCUMENTS_SCHEMAS_KEYS = [
  DOCUMENT_TYPE.PAWER_OF_ATTORNEY_PROPERTY,
  DOCUMENT_TYPE.powerOfAttorneyDocuments,
  DOCUMENT_TYPE.powerAttorneyVehicle,
  DOCUMENT_TYPE.consentForMinorToTravelAboard,
] as const;
