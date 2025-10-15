export interface ConsentForSellPropertyDetails {
  fullName: string;
  birthDate: string;
  taxId: string;
  address: string;
  passportCountryCode: string;
  passportNumber: string;
  passportRecordNumber: string;
  passportIssueDate: string;
  passportIssuingAuthority: string;
  passportExpiryDate: string;
  spouseFullName: string;
  propertyArea: string;
  propertyAddressForSell: string;
  isHouse: boolean;
  isApartment: boolean;
  isNonResidential: boolean;
  includeLand: boolean;
  landArea?: string;
  landCadastralNumber?: string;
  marriageCertNumber: string;
  marriageCertIssuer: string;
  marriageCertDate: string;
  marriageCertRecordNumber: string;
  documentDate: string;
  date: string;
  userEmail?: string;
  consentToSellProperty: boolean;
}

export interface CreateConsentForSellPropertyPayload {
  isPaid: boolean;
  documentType: string;
  documentLang: string;
  details: ConsentForSellPropertyDetails;
  textLang: 'ua' | 'en';
}
