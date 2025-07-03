import { DocumentKey } from '@/types/documents';

// TODO: Сюда можно добавлять
export type StepKey = 'person' | 'representative' | 'property' | 'meta' | 'result';

export type GenerateStep = {
  label: string;
  key: StepKey;
};

export const FORM_STEPS: Record<DocumentKey, Record<'ua' | 'en', GenerateStep[]>> = {
  ['power-of-attorney-property']: {
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
};
