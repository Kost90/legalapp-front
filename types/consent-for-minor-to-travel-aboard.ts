interface ChaperPersonData {
  chaperoneFullName: string;
  chaperoneBirthDate: Date;
}

interface ParentData {
  parentOneFullName: string;
  parentOneBirthDate: Date;
  parentOneTaxId: string;
  passportOneSeries: string;
  passportOneNumber: string;
  passportOneIssueDate: Date;
  passportOneIssueAuthority: string;
  parentOneAddress: string;
}

export interface ConsentForMinorToTravelAboardDetails extends ChaperPersonData, ParentData {
  userEmail?: string;
  city: string;
  date: Date;
  minorFullName: string;
  minorBirthDate: Date;
  minorRelationship: string;
  travelStartDate: Date;
  travelEndDate: Date;
  statementChildAbroad: boolean;
}

export interface ConsentForMinorToTravelAboard {
  email?: string;
  isPaid: boolean;
  documentType: string;
  documentLang: string;
  details: ConsentForMinorToTravelAboardDetails;
  textLang: 'ua' | 'en';
}
