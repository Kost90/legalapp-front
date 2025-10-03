import { PersonDetails, RepresentativeDetails } from './common';

type DocumentDetails = PersonDetails &
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
  details: DocumentDetails;
  textLang: 'ua' | 'en';
};
