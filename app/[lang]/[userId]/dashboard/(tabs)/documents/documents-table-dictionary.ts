import 'server-only';

const dictionaries: Record<string, any> = {
  ua: () => import('@/public/dictionaries/documents-table/ua.json').then((module) => module.default),
  en: () => import('@/public/dictionaries/generate-documents/en.json').then((module) => module.default),
};

export const getDocumentsTableDictionary = async (locale: string) => dictionaries[locale]();
