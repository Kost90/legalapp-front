export enum DOCUMENT_TYPE {
  PAWER_OF_ATTORNEY_PROPERTY = 'power-of-attorney-property',
  powerOfAttorneyDocuments = 'power-of-attorney-documents',
}

export const documenType: Record<DOCUMENT_TYPE, string> = {
  [DOCUMENT_TYPE.PAWER_OF_ATTORNEY_PROPERTY]: 'Довіренність з оформлення нерухомості',
  [DOCUMENT_TYPE.powerOfAttorneyDocuments]: 'Довіренність на отримання документів',
};
