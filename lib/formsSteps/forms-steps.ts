// TODO: Think about make it automation by choose different doc
export const FORM_STEPS = [
  {
    label: 'Данні особи яка надає доручення',
    key: 'person',
  },
  {
    label: 'Данні представника (на кого надається доручення)',
    key: 'representative',
  },
  {
    label: 'Данні обєкту нерухомості',
    key: 'property',
  },
  {
    label: 'Місце складання, строк дії доручення',
    key: 'meta',
  },
  {
    label: 'Документ успішно згенеровано',
    key: 'result',
  },
] as const;
