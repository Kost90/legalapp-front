import { DOCUMENT_TYPE } from '@/lib/constants/common-documents';

export type StepKey = 'person' | 'representative' | 'property' | 'vehicle' | 'meta' | 'result' | 'minor';

export type GenerateStep = {
  label: string;
  key: StepKey;
};

export const FORM_STEPS: Record<DOCUMENT_TYPE, Record<'ua' | 'en', GenerateStep[]>> = {
  [DOCUMENT_TYPE.PAWER_OF_ATTORNEY_PROPERTY]: {
    ua: [
      { label: 'Данні особи яка надає документ', key: 'person' },
      { label: 'Данні представника (на кого надається доручення)', key: 'representative' },
      { label: 'Данні об’єкту нерухомості', key: 'property' },
      { label: 'Місце складання, строк дії доручення', key: 'meta' },
      { label: 'Документ успішно згенеровано', key: 'result' },
    ],
    en: [
      { label: "Grantor's Information", key: 'person' },
      { label: "Representative's Information", key: 'representative' },
      { label: 'Property Information', key: 'property' },
      { label: 'Place and Validity Period', key: 'meta' },
      { label: 'Document Successfully Generated', key: 'result' },
    ],
  },
  [DOCUMENT_TYPE.powerOfAttorneyDocuments]: {
    ua: [
      { label: 'Данні особи яка надає документ', key: 'person' },
      { label: 'Данні представника (на кого надається доручення)', key: 'representative' },
      { label: 'Місце складання, строк дії доручення', key: 'meta' },
      { label: 'Документ успішно згенеровано', key: 'result' },
    ],
    en: [
      { label: "Grantor's Information", key: 'person' },
      { label: "Representative's Information", key: 'representative' },
      { label: 'Place and Validity Period', key: 'meta' },
      { label: 'Document Successfully Generated', key: 'result' },
    ],
  },
  [DOCUMENT_TYPE.powerAttorneyVehicle]: {
    ua: [
      { label: 'Дані особи, яка надає довіреність', key: 'person' },
      { label: 'Дані представника (на кого довіреність)', key: 'representative' },
      { label: 'Дані транспортного засобу', key: 'vehicle' },
      { label: 'Місце та строк дії довіреності', key: 'meta' },
      { label: 'Документ успішно згенеровано', key: 'result' },
    ],
    en: [
      { label: "Grantor's Information", key: 'person' },
      { label: "Representative's Information", key: 'representative' },
      { label: 'Vehicle Information', key: 'vehicle' },
      { label: 'Place and Validity Period', key: 'meta' },
      { label: 'Document Successfully Generated', key: 'result' },
    ],
  },
  [DOCUMENT_TYPE.consentForMinorToTravelAboard]: {
    ua: [
      { label: 'Дані особи, яка надає заяву', key: 'person' },
      { label: 'Дані представника (на кого надається дозвіл)', key: 'representative' },
      { label: 'Дані неповнолітньої особи', key: 'minor' },
      { label: 'Місце та дата складання заяви', key: 'meta' },
      { label: 'Документ успішно згенеровано', key: 'result' },
    ],
    en: [
      { label: "Grantor's Information", key: 'person' },
      { label: "Representative's Information", key: 'representative' },
      { label: 'Information of minor', key: 'minor' },
      { label: 'Place and Validity Period', key: 'meta' },
      { label: 'Document Successfully Generated', key: 'result' },
    ],
  },
};
