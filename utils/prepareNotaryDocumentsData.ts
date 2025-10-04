import { DOCUMENT_TYPE } from '@/lib/constants/common-documents';
import { ReceiveDocumentsPowerOfAttorneyFormData } from '@/schemas/generateDocuments/notary/powerOfAttorneyReceiveDocumentsSchema';
import { PropertyPowerOfAttorneyFormData } from '@/schemas/generateDocuments/notary/powerOfAttorneySchema';
import { VehiclePowerOfAttorneyFormData } from '@/schemas/generateDocuments/notary/powerOfAttorneyVehicleSchema';
import { PowerOfAttorney, PowerOfAttorneyReceiveDocuments, PowerOfAttorneyVehicle } from '@/types/power-of-attorney';
import { userInformationData } from '@/types/user';

import { cleanPropertyAddress } from './cleanPropertyAddress';
import { preparePowerOfAttorneyBase } from './preparePowerOfAttorneyBase';

export function preparePropertyPowerOfAttorneyData(
  raw: PropertyPowerOfAttorneyFormData,
  lang: string,
  user: userInformationData | null,
  textLang: 'ua' | 'en',
): PowerOfAttorney {
  const { propertyAddress, ...rest } = raw;
  const details = {
    ...rest,
    ...(cleanPropertyAddress(propertyAddress) ? { propertyAddress: cleanPropertyAddress(propertyAddress) } : {}),
  };

  return preparePowerOfAttorneyBase(details, {
    documentType: DOCUMENT_TYPE.PAWER_OF_ATTORNEY_PROPERTY,
    lang,
    user,
    textLang,
  }) as PowerOfAttorney;
}

export function preparePowerOfAttorneyReceiveDocumentsData(
  raw: ReceiveDocumentsPowerOfAttorneyFormData,
  lang: string,
  user: userInformationData | null,
  textLang: 'ua' | 'en',
): PowerOfAttorneyReceiveDocuments {
  return preparePowerOfAttorneyBase(raw, {
    documentType: DOCUMENT_TYPE.powerOfAttorneyDocuments,
    lang,
    user,
    textLang,
  }) as PowerOfAttorneyReceiveDocuments;
}

export function preparePowerOfAttorneyVehicleData(
  raw: VehiclePowerOfAttorneyFormData,
  lang: string,
  user: userInformationData | null,
  textLang: 'ua' | 'en',
): PowerOfAttorneyVehicle {
  return preparePowerOfAttorneyBase(raw, {
    documentType: DOCUMENT_TYPE.powerAttorneyVehicle,
    lang,
    user,
    textLang,
  }) as PowerOfAttorneyVehicle;
}
