import { PersonDetails, RepresentativeDetails } from './common';

export type Address = {
  city: string;
  street: string;
  buildNumber: string;
  apartment?: string;
  postCode?: string;
};

type DocumentDetails = PersonDetails &
  RepresentativeDetails & {
    propertyAddress?: Address;
    city: string;
    date: string;
    validUntil: string;
  };

export type PowerOfAttorney = {
  email: string;
  isPaid: boolean;
  documentType: string;
  documentLang: string;
  details: DocumentDetails;
};
