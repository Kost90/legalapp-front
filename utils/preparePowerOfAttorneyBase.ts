import { DOCUMENT_TYPE } from '@/lib/constants/common-documents';
import { ConsentForSellPropertyFormData } from '@/schemas/generateDocuments/notary/consentForSellPropertySchema';
import { ConsentForMinorToTravelAboard, ConsentForMinorToTravelAboardDetails } from '@/types/consent-for-minor-to-travel-aboard';
import { CreateConsentForSellPropertyPayload } from '@/types/consent-for-sell-property';
import {
  DocumentDetailsCar,
  DocumentDetailsProperty,
  DocumentDetailsReceiveDocuments,
  PowerOfAttorney,
  PowerOfAttorneyReceiveDocuments,
  PowerOfAttorneyVehicle,
} from '@/types/power-of-attorney';
import { userInformationData } from '@/types/user';

import { formatCommonDates } from './formatCommonDates';
import { formatDateToString } from './formatDateToString';

type PreparedMap = {
  [DOCUMENT_TYPE.PAWER_OF_ATTORNEY_PROPERTY]: PowerOfAttorney;
  [DOCUMENT_TYPE.powerOfAttorneyDocuments]: PowerOfAttorneyReceiveDocuments;
  [DOCUMENT_TYPE.powerAttorneyVehicle]: PowerOfAttorneyVehicle;
  [DOCUMENT_TYPE.consentForMinorToTravelAboard]: ConsentForMinorToTravelAboard;
  [DOCUMENT_TYPE.consentToSellProperty]: CreateConsentForSellPropertyPayload;
};

type RawDetailsMap = {
  [DOCUMENT_TYPE.PAWER_OF_ATTORNEY_PROPERTY]: DocumentDetailsProperty;
  [DOCUMENT_TYPE.powerOfAttorneyDocuments]: DocumentDetailsReceiveDocuments;
  [DOCUMENT_TYPE.powerAttorneyVehicle]: DocumentDetailsCar;
  [DOCUMENT_TYPE.consentForMinorToTravelAboard]: ConsentForMinorToTravelAboardDetails;
  [DOCUMENT_TYPE.consentToSellProperty]: ConsentForSellPropertyFormData;
};

type PrepareOptions = {
  documentType: DOCUMENT_TYPE;
  lang: string;
  user?: userInformationData | null;
  textLang: 'ua' | 'en';
};

export function preparePowerOfAttorneyBase<TDoc extends keyof PreparedMap>(
  raw: RawDetailsMap[TDoc],
  { documentType, lang, user, textLang }: PrepareOptions,
): PreparedMap[TDoc] {
  if ('car' in raw) {
    const { car } = raw;

    const registration = formatDateToString(car.vehicleRegistrationDate as Date);

    raw.car.vehicleRegistrationDate = registration;
  }

  const formatted = formatCommonDates(raw);

  const base = {
    documentLang: lang,
    documentType: documentType,
    isPaid: true,
    details: formatted,
    textLang: textLang,
  } as PreparedMap[TDoc];

  return user ? ({ ...base, email: user.email } as PreparedMap[TDoc]) : base;
}
