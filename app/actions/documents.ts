'use server';

import { fetchUserDocuments, PaginatedDocumentsResponse } from '@/api/documents/fetchUserDocuments';
import { generatePowerOfAttorney as generatePowerOfAttorneyApi } from '@/api/documents/generatePowerOfAttorney';
import { removeUserDocument } from '@/api/documents/removeUserDocument';
import { DocumentKey } from '@/types/documents';
import { userInformationData } from '@/types/user';
import { prepareDataByDocumentType } from '@/utils/prepareFormData';

type ActionResult =
  | {
      success: true;
      data: {
        html: string;
        url: string;
      };
    }
  | {
      success: false;
      error: {
        message: string;
        field?: string;
      };
    };

export async function generateDocumentAction(
  selectedDocument: DocumentKey,
  formData: any,
  lang: 'ua' | 'en',
  user: userInformationData,
): Promise<ActionResult> {
  try {
    const dataForSend = prepareDataByDocumentType(selectedDocument, formData, lang, user);

    const { html, url } = await generatePowerOfAttorneyApi(user.id, dataForSend);

    return {
      success: true,
      data: { html, url },
    };
  } catch (error: any) {
    let parsedError;
    try {
      parsedError = JSON.parse(error.message);
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (e: any) {
      parsedError = { message: error.message || 'An unknown error occurred' };
    }

    return {
      success: false,
      error: {
        message: parsedError.message,
        field: parsedError.field,
      },
    };
  }
}

export async function deleteDocument(documentId: string): Promise<PaginatedDocumentsResponse> {
  try {
    return await removeUserDocument(documentId);
  } catch (error: any) {
    let parsedError;
    try {
      parsedError = JSON.parse(error.message);
      throw new Error(parsedError.message);
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (e: any) {
      parsedError = { message: error.message || 'An unknown error occurred' };
      throw new Error(parsedError.message);
    }
  }
}

export async function getSortedDocuments(userId: string, sorType: 'ASC' | 'DESC', page: number) {
  try {
    return await fetchUserDocuments(userId, sorType, page);
  } catch (error: any) {
    let parsedError;
    try {
      parsedError = JSON.parse(error.message);
      throw new Error(parsedError.message);
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (e: any) {
      parsedError = { message: error.message || 'An unknown error occurred' };
      throw new Error(parsedError.message);
    }
  }
}
