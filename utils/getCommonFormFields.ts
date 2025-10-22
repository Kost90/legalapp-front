export const getParentFields = (lang: 'ua' | 'en', isOptional = false) => {
  const t = {
    ua: {
      parentOneFullName: 'ПІБ',
      parentOneBirthDate: 'Дата народження',
      parentOneTaxId: 'ІПН',
      parentOneAddress: 'Адреса реєстрації',
      passport: 'Данні внутрішнього паспорта громадянина',
      passportOneIssueDate: 'Дата видачі',
      passportOneIssueAuthority: 'Орган, що видав',
    },
    en: {
      parentOneFullName: 'Full Name',
      parentOneBirthDate: 'Date of Birth',
      parentOneTaxId: 'Tax ID (TIN)',
      parentOneAddress: 'Registered Address',
      passport: 'Passport information number and series',
      passportOneIssueDate: 'Date of Issue',
      passportOneIssueAuthority: 'Issuing Authority',
    },
  };

  return [
    { name: 'parentOneFullName', label: t[lang].parentOneFullName, type: 'text', required: !isOptional },
    { name: 'parentOneBirthDate', label: t[lang].parentOneBirthDate, type: 'date', required: !isOptional },
    { name: 'parentOneTaxId', label: t[lang].parentOneTaxId, type: 'text', required: !isOptional },
    { name: 'passport', label: t[lang].passport, type: 'text', required: !isOptional },
    { name: 'passportOneIssueDate', label: t[lang].passportOneIssueDate, type: 'date', required: !isOptional },
    { name: 'passportOneIssueAuthority', label: t[lang].passportOneIssueAuthority, type: 'text', required: !isOptional },
    { name: 'parentOneAddress', label: t[lang].parentOneAddress, type: 'text', required: !isOptional },
  ];
};

export const getMinorFields = (lang: 'ua' | 'en') => {
  const t = {
    ua: {
      fullName: 'ПІБ дитини',
      birthDate: 'Дата народження дитини',
      relationship: 'Ким доводиться (син/донька)',
      options: [
        { label: 'донька', value: 'донька' },
        { label: 'син', value: 'син' },
      ],
    },
    en: {
      fullName: "Child's Full Name",
      birthDate: "Child's Date of Birth",
      relationship: 'Relationship (son/daughter)',
      options: [
        { label: 'daughter', value: 'донька' },
        { label: 'son', value: 'син' },
      ],
    },
  };
  return [
    { name: 'minorFullName', label: t[lang].fullName, type: 'text', required: true },
    { name: 'minorBirthDate', label: t[lang].birthDate, type: 'date', required: true },
    {
      name: 'minorRelationship',
      label: t[lang].relationship,
      type: 'radio',
      required: true,
      options: t[lang].options,
    },
  ];
};

export const getChaperoneFields = (lang: 'ua' | 'en', prefix: string, isOptional = false) => {
  const t = {
    ua: { fullName: 'ПІБ супроводжуючого', birthDate: 'Дата народження супроводжуючого' },
    en: { fullName: "Chaperone's Full Name", birthDate: "Chaperone's Date of Birth" },
  };
  return [
    { name: `${prefix}FullName`, label: t[lang].fullName, type: 'text', required: !isOptional },
    { name: `${prefix}BirthDate`, label: t[lang].birthDate, type: 'date', required: !isOptional },
  ];
};

export const getTravelDateFields = (lang: 'ua' | 'en') => {
  const t = {
    ua: { startDate: 'Дата початку поїздки', endDate: 'Дата закінчення поїздки' },
    en: { startDate: 'Travel Start Date', endDate: 'Travel End Date' },
  };
  return [
    { name: 'travelStartDate', label: t[lang].startDate, type: 'date', required: true },
    { name: 'travelEndDate', label: t[lang].endDate, type: 'date', required: true },
  ];
};

export const getMetaFields = (lang: 'ua' | 'en') => {
  const t = {
    ua: {
      city: 'Місто оформлення',
      date: 'Дата оформлення',
      userEmail: 'Email для відправки документа',
    },
    en: {
      city: 'City of Issue',
      date: 'Date of Issue',
      userEmail: 'Email to send the document',
    },
  };
  return [
    { name: 'city', label: t[lang].city, type: 'text', required: true },
    { name: 'date', label: t[lang].date, type: 'date', required: true },
    { name: 'userEmail', label: t[lang].userEmail, type: 'email', required: true },
  ];
};
