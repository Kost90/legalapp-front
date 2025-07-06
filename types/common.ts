export type Pagination = {
  currentPage: number;
  totalPages: number;
  totalResult: number;
};

export type SuccessResponse = {
  data: string;
  message: string;
  statusCode: number;
};

export type PersonDetails = {
  fullName: string;
  birthDate: string;
  tin: string;
  address: string;
  passport: string;
  passportIssueDate: string;
};

export type RepresentativeDetails = {
  representativeName: string;
  representativeBirthDate: string;
  representativeTIN: string;
  representativeAddress: string;
};
