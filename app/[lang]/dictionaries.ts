import 'server-only';

const dictionaries: Record<string, any> = {
  ua: () => import('@/public/dictionaries/ua.json').then((module) => module.default),
  en: () => import('@/public/dictionaries/en.json').then((module) => module.default),
};

export const getDictionary = async (locale: string) => dictionaries[locale]();
