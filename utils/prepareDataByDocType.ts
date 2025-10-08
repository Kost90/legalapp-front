import { DOCUMENT_TYPE } from '@/lib/constants/common-documents';
import { userInformationData } from '@/types/user';

import {
  preparePropertyPowerOfAttorneyData,
  preparePowerOfAttorneyReceiveDocumentsData,
  preparePowerOfAttorneyVehicleData,
  prepareConsentForMinorToTravelAboardData,
} from './prepareNotaryDocumentsData';

const prepareHandlers = {
  [DOCUMENT_TYPE.PAWER_OF_ATTORNEY_PROPERTY]: preparePropertyPowerOfAttorneyData,
  [DOCUMENT_TYPE.powerOfAttorneyDocuments]: preparePowerOfAttorneyReceiveDocumentsData,
  [DOCUMENT_TYPE.powerAttorneyVehicle]: preparePowerOfAttorneyVehicleData,
  [DOCUMENT_TYPE.consentForMinorToTravelAboard]: prepareConsentForMinorToTravelAboardData,
} as const;

export function prepareDataByDocumentType(
  documentType: DOCUMENT_TYPE,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  data: any,
  lang: string,
  user: userInformationData | null,
  textLang: 'ua' | 'en',
) {
  const handler = prepareHandlers[documentType];
  if (!handler) throw new Error(`No prepare function found for document type: ${documentType}`);
  return handler(data, lang, user, textLang);
}
