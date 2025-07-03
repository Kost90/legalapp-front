export interface IDocumentCategoryItem {
  [key: string]: string;
}

export interface IDocumentsMetadata {
  pageTitle: string;
  pageDescription: string;
  resultMessage: string;
}

export interface IGenerateDocumentsContent {
  documentsCategories: IDocumentsMetadata & {
    [categoryName: string]: IDocumentCategoryItem[];
  };
  generatedMessage: string;
  downloadMessage: string;
}
