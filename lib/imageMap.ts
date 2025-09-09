import { StaticImageData } from 'next/image';

import powerOfAttorneyPropertImg from '@/assets/documents-samples/power-of-attorney-property.png';
import { DOCUMENT_TYPE_FOR_LINK } from '@/lib/constants/common-documents';

export const documentsImagesMap: Record<DOCUMENT_TYPE_FOR_LINK, StaticImageData> = {
  [DOCUMENT_TYPE_FOR_LINK.PAWER_OF_ATTORNEY_PROPERTY]: powerOfAttorneyPropertImg,
};
