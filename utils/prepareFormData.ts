import { DOCUMENT_TYPE } from '@/lib/constans';
import { PropertyPowerOfAttorneyFormData } from '@/schemas/generateDocuments/powerOfAttorneySchema';
import { DocumentKey } from '@/types/documents';
import { PowerOfAttorney } from '@/types/power-of-attorney';
import { userInformationData } from '@/types/user';

import { cleanPropertyAddress } from './cleanPropertyAddress';
import { formatDateToString } from './formatDateToString';

export function preparePowerOfAttorneyData(raw: PropertyPowerOfAttorneyFormData, lang: string, user: userInformationData): PowerOfAttorney {
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

  return {
    email: user.email,
    documentLang: lang,
    documentType: DOCUMENT_TYPE.PAWER_OF_ATTORNEY_PROPERTY,
    isPaid: true,
    details: formatted,
  };
}

export function prepareDataByDocumentType(documentType: DocumentKey, data: any, lang: string, user: any) {
  switch (documentType) {
    case 'power-of-attorney-property':
      return preparePowerOfAttorneyData(data, lang, user);

    default:
      throw new Error(`No prepare function found for document type: ${documentType}`);
  }
}
