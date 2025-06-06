import { slugify } from '@/utils/slugify';

type PathOptions = {
  lang: string;
  userId?: string;
  brokerId?: string;
  segments?: string[];
};

export const buildUserPath = ({ lang, userId, brokerId, segments = [] }: PathOptions): string => {
  let path = `/${lang}`;

  if (userId) path += `/${slugify(userId, 'user')}`;
  if (brokerId) path += `/${slugify(brokerId, 'broker')}`;

  if (segments.length > 0) {
    path += '/' + segments.map(encodeURIComponent).join('/');
  }

  return path;
};
