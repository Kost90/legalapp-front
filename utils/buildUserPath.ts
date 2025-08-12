import { slugify } from '@/utils/slugify';

type PathOptions = {
  lang: string;
  userId?: string;
  brokerId?: string;
  segments?: string[];
};

export const buildUserPath = ({ lang, userId, segments = [] }: PathOptions): string => {
  let path = `/${lang}`;

  if (userId) path += `/${slugify(userId, 'user')}`;

  if (segments.length > 0) {
    path += '/' + segments.map(encodeURIComponent).join('/');
  }

  return path;
};
