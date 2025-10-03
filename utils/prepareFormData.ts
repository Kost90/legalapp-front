import { DOCUMENT_TYPE } from '@/lib/constants/common-documents';
import { ReceiveDocumentsPowerOfAttorneyFormData } from '@/schemas/generateDocuments/notary/powerOfAttorneyReceiveDocumentsSchema';
import { PropertyPowerOfAttorneyFormData } from '@/schemas/generateDocuments/notary/powerOfAttorneySchema';
import { PowerOfAttorney } from '@/types/power-of-attorney';
import { PowerOfAttorneyReceiveDocuments } from '@/types/power-of-attorney-receive-documents';
import { userInformationData } from '@/types/user';

import { cleanPropertyAddress } from './cleanPropertyAddress';
import { formatDateToString } from './formatDateToString';

export function preparePropertyPowerOfAttorneyData(
  raw: PropertyPowerOfAttorneyFormData,
  lang: string,
  user: userInformationData | undefined | null,
  textLang: 'ua' | 'en',
): PowerOfAttorney {
  const { propertyAddress, ...rest } = raw;

  const formatted = {
    ...rest,
    birthDate: formatDateToString(rest.birthDate),
    passportIssueDate: formatDateToString(rest.passportIssueDate),
    representativeBirthDate: formatDateToString(rest.representativeBirthDate),
    date: formatDateToString(rest.date),
    validUntil: formatDateToString(rest.validUntil),
    ...(cleanPropertyAddress(propertyAddress) ? { propertyAddress: cleanPropertyAddress(propertyAddress) } : {}),
  };

  if (!user) {
    return {
      documentLang: lang,
      documentType: DOCUMENT_TYPE.PAWER_OF_ATTORNEY_PROPERTY,
      isPaid: true,
      details: formatted,
      textLang: textLang,
    };
  }

  return {
    email: user.email,
    documentLang: lang,
    documentType: DOCUMENT_TYPE.PAWER_OF_ATTORNEY_PROPERTY,
    isPaid: true,
    details: formatted,
    textLang: textLang,
  };
}

export function preparePowerOfAttorneyReceiveDocumentsData(
  raw: ReceiveDocumentsPowerOfAttorneyFormData,
  lang: string,
  user: userInformationData | undefined | null,
  textLang: 'ua' | 'en',
): PowerOfAttorneyReceiveDocuments {
  const formatted = {
    ...raw,
    birthDate: formatDateToString(raw.birthDate),
    passportIssueDate: formatDateToString(raw.passportIssueDate),
    representativeBirthDate: formatDateToString(raw.representativeBirthDate),
    date: formatDateToString(raw.date),
    validUntil: formatDateToString(raw.validUntil),
  };

  if (!user) {
    return {
      documentLang: lang,
      documentType: DOCUMENT_TYPE.powerOfAttorneyDocuments,
      isPaid: true,
      details: formatted,
      textLang: textLang,
    };
  }

  return {
    email: user.email,
    documentLang: lang,
    documentType: DOCUMENT_TYPE.powerOfAttorneyDocuments,
    isPaid: true,
    details: formatted,
    textLang: textLang,
  };
}

export function prepareDataByDocumentType(
  documentType: DOCUMENT_TYPE,
  data: any,
  lang: string,
  user: userInformationData | undefined | null = null,
  textLang: 'ua' | 'en',
) {
  switch (documentType) {
    case DOCUMENT_TYPE.PAWER_OF_ATTORNEY_PROPERTY:
      return preparePropertyPowerOfAttorneyData(data, lang, user, textLang);

    case DOCUMENT_TYPE.powerOfAttorneyDocuments:
      return preparePowerOfAttorneyReceiveDocumentsData(data, lang, user, textLang);

    default:
      throw new Error(`No prepare function found for document type: ${documentType}`);
  }
}
