export type Pagination = {
  currentPage: number;
  totalPages: number;
  totalResult: number;
};

export type SuccessResponse = {
  data: Date;
  message: string;
  statusCode: number;
};

export type PersonDetails = {
  fullName: string;
  birthDate: Date;
  taxId: string;
  address: string;
  passport: string;
  passportIssueDate: Date;
  passportIssueAuthority: string;
};

export type RepresentativeDetails = {
  representativeName: string;
  representativeBirthDate: Date;
  representativeTaxId: string;
  representativeAddress: string;
};
