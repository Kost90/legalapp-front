import { DOCUMENT_TYPE } from '@/lib/constants/common-documents';
import { getParentFields, getMinorFields, getChaperoneFields, getTravelDateFields, getMetaFields } from '@/utils/getCommonFormFields';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const commonFormFields: Record<string, any> = {
  ua: {
    person: [
      { name: 'fullName', label: 'ПІБ', type: 'text', required: true },
      { name: 'birthDate', label: 'Дата народження', type: 'date', required: true },
      { name: 'taxId', label: 'ІПН', type: 'text', required: true },
      { name: 'address', label: 'Адреса', type: 'text', required: true },
      { name: 'passport', label: 'Паспорт', type: 'text', required: true },
      { name: 'passportIssueDate', label: 'Дата видачі паспорта', type: 'date', required: true },
      { name: 'passportIssueAuthority', label: 'Ким виданий паспорт', type: 'text', required: true },
    ],
    representative: [
      { name: 'representativeName', label: 'ПІБ представника', type: 'text', required: true },
      { name: 'representativeBirthDate', label: 'Дата народження представника', type: 'date', required: true },
      { name: 'representativeTaxId', label: 'ІПН представника', type: 'text', required: true },
      { name: 'representativeAddress', label: 'Адреса представника', type: 'text', required: true },
    ],
    meta: [
      { name: 'city', label: 'Місто', type: 'text', required: true },
      { name: 'date', label: 'Дата оформлення', type: 'date', required: true },
      { name: 'validUntil', label: 'Термін дії', type: 'radio', required: true },
      { name: 'userEmail', label: 'Пошта для відправки згенерованного документа', type: 'email', required: true },
    ],
  },

  en: {
    person: [
      { name: 'fullName', label: 'Full Name', type: 'text', required: true },
      { name: 'birthDate', label: 'Birth Date', type: 'date', required: true },
      { name: 'taxId', label: 'Tax identification number', type: 'text', required: true },
      { name: 'address', label: 'Address', type: 'text', required: true },
      { name: 'passport', label: 'Passport', type: 'text', required: true },
      { name: 'passportIssueDate', label: 'Passport Issue Date', type: 'date', required: true },
      { name: 'passportIssueAuthority', label: 'Whom give you this passport', type: 'text', required: true },
    ],
    representative: [
      { name: 'representativeName', label: 'Representative Name', type: 'text', required: true },
      { name: 'representativeBirthDate', label: 'Representative Birth Date', type: 'date', required: true },
      { name: 'representativeTaxId', label: 'Representative TIN', type: 'text', required: true },
      { name: 'representativeAddress', label: 'Representative Address', type: 'text', required: true },
    ],
    meta: [
      { name: 'city', label: 'City', type: 'text', required: true },
      { name: 'date', label: 'Date of Document', type: 'date', required: true },
      { name: 'validUntil', label: 'Validity Period', type: 'radio', required: true },
      { name: 'userEmail', label: 'Email for send generated document', type: 'email', required: true },
    ],
  },
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const formFieldsSchemas: Record<string, Record<string, any>> = {
  [DOCUMENT_TYPE.PAWER_OF_ATTORNEY_PROPERTY]: {
    ua: {
      ...commonFormFields.ua,
      property: [
        { name: 'propertyAddress.city', label: 'Місто нерухомості', type: 'text', required: false },
        { name: 'propertyAddress.street', label: 'Вулиця', type: 'text', required: false },
        { name: 'propertyAddress.buildNumber', label: 'Номер будинку', type: 'text', required: false },
        { name: 'propertyAddress.apartment', label: 'Квартира', type: 'text', required: false },
        { name: 'propertyAddress.postCode', label: 'Поштовий індекс', type: 'text', required: false },
      ],
    },
    en: {
      ...commonFormFields.en,
      property: [
        { name: 'propertyAddress.city', label: 'City of property', type: 'text', required: false },
        { name: 'propertyAddress.street', label: 'Street', type: 'text', required: false },
        { name: 'propertyAddress.buildNumber', label: 'Number of Building', type: 'text', required: false },
        { name: 'propertyAddress.apartment', label: 'Apartment', type: 'text', required: false },
        { name: 'propertyAddress.postCode', label: 'Post Code', type: 'text', required: false },
      ],
    },
  },
  [DOCUMENT_TYPE.powerOfAttorneyDocuments]: {
    ...commonFormFields,
  },
  [DOCUMENT_TYPE.powerAttorneyVehicle]: {
    ua: {
      person: [
        { name: 'fullName', label: 'ПІБ', type: 'text', required: true },
        { name: 'birthDate', label: 'Дата народження', type: 'date', required: true },
        { name: 'taxId', label: 'ІПН', type: 'text', required: true },
        { name: 'passportSeries', label: 'Серія внутрішнього паспорта громадянина', type: 'text', required: true },
        { name: 'passportNumber', label: 'Номер внутрішнього паспорта громадянина', type: 'text', required: true },
        { name: 'passportIssueDate', label: 'Дата видачі внутрішнього паспорта громадянина', type: 'date', required: true },
        { name: 'passportIssueAuthority', label: 'Ким виданий внутрішнього паспорта громадянина', type: 'text', required: true },
        { name: 'internationalPassportSeries', label: 'Серія паспорта для виїзду за кордон', type: 'text', required: true },
        { name: 'internationalPassportNumber', label: 'Номер паспорта для виїзду за кордон', type: 'text', required: true },
        { name: 'internationalPassportIssueDate', label: 'Дата видачі паспорта для виїзду за кордон', type: 'date', required: true },
        {
          name: 'internationalPassportIssueAuthority',
          label: 'Орган, що видав паспорт для виїзду за кордон',
          type: 'text',
          required: true,
        },
      ],
      representative: [
        { name: 'representativeName', label: 'ПІБ представника', type: 'text', required: true },
        { name: 'representativeBirthDate', label: 'Дата народження', type: 'date', required: true },
        { name: 'representativeTaxId', label: 'ІПН представника', type: 'text', required: true },
        { name: 'representativePassportSeries', label: 'Серія внутрішнього паспорта громадянина', type: 'text', required: true },
        { name: 'representativePassportNumber', label: 'Номер внутрішнього паспорта громадянина', type: 'text', required: true },
        { name: 'representativePassportIssueDate', label: 'Дата видачі внутрішнього паспорта громадянина', type: 'date', required: true },
        {
          name: 'representativePassportIssueAuthority',
          label: 'Ким виданий внутрішній паспорт громадянина',
          type: 'text',
          required: true,
        },
        { name: 'representativeInternationalPassportSeries', label: 'Серія паспорта для виїзду за кордон', type: 'text', required: true },
        { name: 'representativeInternationalPassportNumber', label: 'Номер паспорта для виїзду за кордон', type: 'text', required: true },
        {
          name: 'representativeInternationalPassportIssueDate',
          label: 'Дата видачі паспорта для виїзду за кордон',
          type: 'date',
          required: true,
        },
        {
          name: 'representativeInternationalPassportAuthority',
          label: 'Орган, що видав паспорта для виїзду за кордон',
          type: 'text',
          required: true,
        },
      ],
      vehicle: [
        { name: 'car.vehicleMake', label: 'Марка', type: 'text', required: true },
        { name: 'car.vehicleModel', label: 'Модель', type: 'text', required: true },
        { name: 'car.vehicleYear', label: 'Рік випуску', type: 'text', required: true },
        { name: 'car.vehicleColor', label: 'Колір', type: 'text', required: true },
        { name: 'car.vehicleVin', label: 'Номер шасі (VIN)', type: 'text', required: true },
        { name: 'car.vehicleLicensePlate', label: 'Реєстраційний номер', type: 'text', required: true },
        { name: 'car.vehicleType', label: 'Тип ТЗ', type: 'text', required: true },
        { name: 'car.vehicleRegistrationCertificate', label: 'Номер свідоцтва про реєстрацію', type: 'text', required: true },
        { name: 'car.vehicleRegistrationAuthority', label: 'Ким видано свідоцтво', type: 'text', required: true },
        { name: 'car.vehicleRegistrationDate', label: 'Дата реєстрації', type: 'date', required: true },
      ],
      meta: [
        { name: 'city', label: 'Місто складання довіреності', type: 'text', required: true },
        { name: 'date', label: 'Дата складання', type: 'date', required: true },
        { name: 'validUntil', label: 'Термін дії', type: 'radio', required: true },
        { name: 'userEmail', label: 'Ваша пошта для отримання документа', type: 'email', required: true },
      ],
    },
    en: {
      person: [
        { name: 'fullName', label: 'Full Name', type: 'text', required: true },
        { name: 'birthDate', label: 'Date of Birth', type: 'date', required: true },
        { name: 'taxId', label: 'Tax ID', type: 'text', required: true },
        { name: 'passportSeries', label: 'Passport Series', type: 'text', required: true },
        { name: 'passportNumber', label: 'Passport Number', type: 'text', required: true },
        { name: 'passportIssueDate', label: 'Date of Issue', type: 'date', required: true },
        { name: 'passportIssueAuthority', label: 'Issuing Authority', type: 'text', required: true },
        { name: 'internationalPassportSeries', label: 'Series', type: 'text', required: true },
        { name: 'internationalPassportNumber', label: 'Number', type: 'text', required: true },
        { name: 'internationalPassportIssueDate', label: 'Date of Issue', type: 'date', required: true },
        { name: 'internationalPassportIssueAuthority', label: 'Issuing Authority', type: 'text', required: true },
      ],
      representative: [
        { name: 'representativeName', label: "Representative's Full Name", type: 'text', required: true },
        { name: 'representativeBirthDate', label: 'Date of Birth', type: 'date', required: true },
        { name: 'representativeTaxId', label: "Representative's Tax ID", type: 'text', required: true },
        { name: 'representativePassportSeries', label: 'Passport Series', type: 'text', required: true },
        { name: 'representativePassportNumber', label: 'Passport Number', type: 'text', required: true },
        { name: 'representativePassportIssueDate', label: 'Date of Issue', type: 'date', required: true },
        { name: 'representativePassportIssueAuthority', label: 'Issuing Authority', type: 'text', required: true },
        { group: "Representative's International Passport" },
        { name: 'representativeInternationalPassportSeries', label: 'Series', type: 'text', required: true },
        { name: 'representativeInternationalPassportNumber', label: 'Number', type: 'text', required: true },
        { name: 'representativeInternationalPassportIssueDate', label: 'Date of Issue', type: 'date', required: true },
        { name: 'representativeInternationalPassportAuthority', label: 'Issuing Authority', type: 'text', required: true },
      ],
      vehicle: [
        { name: 'car.vehicleMake', label: 'Make', type: 'text', required: true },
        { name: 'car.vehicleModel', label: 'Model', type: 'text', required: true },
        { name: 'car.vehicleYear', label: 'Year of Manufacture', type: 'number', required: true },
        { name: 'car.vehicleColor', label: 'Color', type: 'text', required: true },
        { name: 'car.vehicleVin', label: 'Chassis Number (VIN)', type: 'text', required: true },
        { name: 'car.vehicleLicensePlate', label: 'Registration Number', type: 'text', required: true },
        { name: 'car.vehicleType', label: 'Vehicle Type', type: 'text', required: true },
        { name: 'car.vehicleRegistrationCertificate', label: 'Registration Certificate No.', type: 'text', required: true },
        { name: 'car.vehicleRegistrationAuthority', label: 'Certificate Issuing Authority', type: 'text', required: true },
        { name: 'car.vehicleRegistrationDate', label: 'Date of Registration', type: 'date', required: true },
      ],
      meta: [
        { name: 'city', label: 'City of Signing', type: 'text', required: true },
        { name: 'date', label: 'Date of Signing', type: 'date', required: true },
        { name: 'validUntil', label: 'Valid period', type: 'radio', required: true },
        { name: 'userEmail', label: 'Your Email to Receive the Document', type: 'email', required: true },
      ],
    },
  },
  [DOCUMENT_TYPE.consentForMinorToTravelAboard]: {
    ua: {
      person: [...getParentFields('ua')],
      representative: [...getChaperoneFields('ua', 'chaperone')],
      minor: [...getMinorFields('ua'), ...getTravelDateFields('ua')],
      // parentTwo: getParentFields('ua', 'parentTwo', true),
      meta: [...getMetaFields('ua')],
    },
    en: {
      person: [...getParentFields('en')],
      representative: [...getChaperoneFields('ua', 'chaperone')],
      minor: [...getMinorFields('en'), ...getTravelDateFields('en')],
      // parentTwo: getParentFields('ua', 'parentTwo', true),
      meta: [...getMetaFields('en')],
    },
  },
};
