export type User = {
  id: string;
  //   createdAt: string;
  //   updatedAt: string;
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

export interface IDocuments {
  id: string;
  fileKey: string;
  isPaid: boolean;
  expiredAt: string | null;
  lang: string;
  type: string;
}

export type userInformationData = {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  documents?: IDocuments[];
};

export type CurrentUserResponse = {
  data: userInformationData;
  message: string;
  statusCode: string;
};
