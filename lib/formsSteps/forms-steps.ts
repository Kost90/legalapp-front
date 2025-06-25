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

// export const FORM_STEPS = {
//   ua: [
//     { label: 'Данні особи яка надає доручення', key: 'person' },
//     { label: 'Данні представника (на кого надається доручення)', key: 'representative' },
//     { label: 'Данні обєкту нерухомості', key: 'property' },
//     { label: 'Місце складання, строк дії доручення', key: 'meta' },
//     { label: 'Документ успішно згенеровано', key: 'result' },
//   ],
//   en: [
//     { label: "Grantor's Information", key: 'person' },
//     { label: "Representative's Information", key: 'representative' },
//     { label: 'Property Information', key: 'property' },
//     { label: 'Place and Validity Period', key: 'meta' },
//     { label: 'Document Successfully Generated', key: 'result' },
//   ],
// } as const;
