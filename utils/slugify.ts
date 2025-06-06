export const prefixes = {
  user: 'usr_',
  broker: 'brk_',
} as const;

export const slugify = (str: string | undefined, prefix: keyof typeof prefixes) => {
  if (!str) return str;

  if (str.includes(prefixes[prefix])) return str;

  return `${prefixes[prefix]}${str}`;
};

export const unslugify = (str: string, prefix: keyof typeof prefixes) => {
  if (!str) return str;

  return str.replace(prefixes[prefix], '');
};
