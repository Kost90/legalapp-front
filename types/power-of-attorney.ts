import { PersonDetails, RepresentativeDetails } from './common';

export type Address = {
  city: string;
  street: string;
  buildNumber: string;
  apartment?: string;
  postCode?: string;
  propertyType?: string;
};

export type Car = {
  vehicleMake: string;
  vehicleModel: string;
  vehicleYear: string;
  vehicleColor: string;
  vehicleVin: string;
  vehicleLicensePlate: string;
  vehicleType: string;
  vehicleRegistrationCertificate: string;
  vehicleRegistrationAuthority: string;
  vehicleRegistrationDate: Date | string;
};

export type DocumentDetailsProperty = PersonDetails &
  RepresentativeDetails & {
    propertyAddress?: Address;
    city: string;
    date: Date;
    validUntil: string;
  };

export type PowerOfAttorney = {
  email?: string;
  isPaid: boolean;
  documentType: string;
  documentLang: string;
  details: DocumentDetailsProperty;
  textLang: 'ua' | 'en';
};

export type DocumentDetailsReceiveDocuments = PersonDetails &
  RepresentativeDetails & {
    city: string;
    date: string;
    validUntil: string;
  };

export type PowerOfAttorneyReceiveDocuments = {
  email?: string;
  isPaid: boolean;
  documentType: string;
  documentLang: string;
  details: DocumentDetailsReceiveDocuments;
  textLang: 'ua' | 'en';
};

// Car power of attorney
export type PersonDetailCar = {
  fullName: string;
  taxId: string;
  passport: string;
  passportIssueDate: Date;
  passportIssueAuthority: string;
  internationalPassport: string;
  internationalPassportIssueDate: Date;
  internationalPassportIssueAuthority: string;
};

export type RepresentiveDetailsCar = {
  representativeName: string;
  representativeBirthDate: Date;
  representativeTaxId: string;
  representativePassport: string;
  representativePassportIssueDate: Date;
  representativePassportIssueAuthority: string;
  representativeInternationalPassportSeries: string;
  representativeInternationalPassportNumber: string;
  representativeInternationalPassportIssueDate: Date;
  representativeInternationalPassportAuthority: string;
};

export type DocumentDetailsCar = PersonDetailCar &
  RepresentiveDetailsCar & {
    car: Car;
    city: string;
    date: Date;
    validUntil: string;
  };

export type PowerOfAttorneyVehicle = {
  email?: string;
  isPaid: boolean;
  documentType: string;
  documentLang: string;
  details: DocumentDetailsCar;
  textLang: 'ua' | 'en';
};
