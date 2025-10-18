import { DOCUMENT_TYPE } from '@/lib/constants/common-documents';
import { ConsentForMinorFormData } from '@/schemas/generateDocuments/notary/consentForMinorToTravelAboardSchema';
import { ConsentForSellPropertyFormData } from '@/schemas/generateDocuments/notary/consentForSellPropertySchema';
import { ReceiveDocumentsPowerOfAttorneyFormData } from '@/schemas/generateDocuments/notary/powerOfAttorneyReceiveDocumentsSchema';
import { PropertyPowerOfAttorneyFormData } from '@/schemas/generateDocuments/notary/powerOfAttorneySchema';
import { VehiclePowerOfAttorneyFormData } from '@/schemas/generateDocuments/notary/powerOfAttorneyVehicleSchema';
import { ConsentForMinorToTravelAboard } from '@/types/consent-for-minor-to-travel-aboard';
import { CreateConsentForSellPropertyPayload } from '@/types/consent-for-sell-property';
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

export function prepareConsentForMinorToTravelAboardData(
  raw: ConsentForMinorFormData,
  lang: string,
  user: userInformationData | null,
  textLang: 'ua' | 'en',
): ConsentForMinorToTravelAboard {
  const finalData = {
    ...raw,
    statementChildAbroad: true,
  };

  return preparePowerOfAttorneyBase(finalData, {
    documentType: DOCUMENT_TYPE.consentForMinorToTravelAboard,
    lang,
    user,
    textLang,
  }) as ConsentForMinorToTravelAboard;
}

export function prepareConsentForSellPropertyData(
  raw: ConsentForSellPropertyFormData,
  lang: string,
  user: userInformationData | null,
  textLang: 'ua' | 'en',
): CreateConsentForSellPropertyPayload {
  let finalData = { ...raw, isHouse: false, isApartment: false, isNonResidential: false, includeLand: false, consentToSellProperty: true };

  switch (raw.propertyType) {
    case 'house':
      finalData = {
        ...raw,
        isHouse: true,
        isApartment: false,
        isNonResidential: false,
        consentToSellProperty: true,
      };
      break;

    case 'apartment':
      finalData = {
        ...raw,
        isHouse: false,
        isApartment: true,
        isNonResidential: false,
        includeLand: false,
        consentToSellProperty: true,
      };
      break;

    case 'nonResidential':
      finalData = {
        ...raw,
        isHouse: false,
        isApartment: false,
        isNonResidential: true,
        includeLand: false,
        consentToSellProperty: true,
      };
      break;

    default:
      finalData = {
        ...raw,
        isHouse: false,
        isApartment: false,
        isNonResidential: false,
        includeLand: false,
        consentToSellProperty: true,
      };
  }

  return preparePowerOfAttorneyBase(finalData, {
    documentType: DOCUMENT_TYPE.consentToSellProperty,
    lang,
    user,
    textLang,
  }) as CreateConsentForSellPropertyPayload;
}
