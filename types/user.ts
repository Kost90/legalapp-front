import { IDocument } from './documents';

export type User = {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  isEmailVerified: boolean;
};

export type Tokens = {
  accessToken: string;
  refreshToken: string;
  actionToken: string;
};

export type userInformationData = {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  documents?: IDocument[];
};

export type CurrentUserResponse = {
  data: userInformationData;
  message: string;
  statusCode: string;
};
