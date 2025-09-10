import { StaticImageData } from 'next/image';

import spousalConsentForPropertyySale from '@/assets/documents-samples/consent-rigth-to-sale-property.png';
import consentForMinorToTravelAboard from '@/assets/documents-samples/consent-rigth-to-trvel-abroad.png';
import powerOfAttornerCar from '@/assets/documents-samples/power-of-attorney-car.png';
import powerOfAttorneyDocuments from '@/assets/documents-samples/power-of-attorney-documents.png';
import powerOfAttorneyPropertImg from '@/assets/documents-samples/power-of-attorney-property.png';
import { DOCUMENT_TYPE_FOR_LINK } from '@/lib/constants/common-documents';

export type AllowedDocumentsTypes =
  | DOCUMENT_TYPE_FOR_LINK.PAWER_OF_ATTORNEY_PROPERTY
  | DOCUMENT_TYPE_FOR_LINK.powerAttorneyVehicle
  | DOCUMENT_TYPE_FOR_LINK.spousalConsentForPropertyySale
  | DOCUMENT_TYPE_FOR_LINK.consentForMinorToTravelAboard
  | DOCUMENT_TYPE_FOR_LINK.powerOfAttorneyDocuments;

export const documentsImagesMap: Record<AllowedDocumentsTypes, StaticImageData> = {
  [DOCUMENT_TYPE_FOR_LINK.PAWER_OF_ATTORNEY_PROPERTY]: powerOfAttorneyPropertImg,
  [DOCUMENT_TYPE_FOR_LINK.powerAttorneyVehicle]: powerOfAttornerCar,
  [DOCUMENT_TYPE_FOR_LINK.powerOfAttorneyDocuments]: powerOfAttorneyDocuments,
  [DOCUMENT_TYPE_FOR_LINK.consentForMinorToTravelAboard]: consentForMinorToTravelAboard,
  [DOCUMENT_TYPE_FOR_LINK.spousalConsentForPropertyySale]: spousalConsentForPropertyySale,
};
