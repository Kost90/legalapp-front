import 'server-only';

const dictionaries: Record<string, any> = {
  ua: () => import('@/public/dictionaries/generate-documents/ua.json').then((module) => module.default),
  en: () => import('@/public/dictionaries/generate-documents/en.json').then((module) => module.default),
};

export const getGenerateDocumentsDictionary = async (locale: string) => dictionaries[locale]();
