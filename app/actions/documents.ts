'use server';

import z from 'zod';

import { fetchUserDocuments, PaginatedDocumentsResponse } from '@/api/documents/fetchUserDocuments';
import { generatePowerOfAttorney as generatePowerOfAttorneyApi } from '@/api/documents/generatePowerOfAttorney';
import { generatePowerOfAttorneyPublic } from '@/api/documents/generatePowerOfAttorneyPublic';
import { removeUserDocument } from '@/api/documents/removeUserDocument';
import { SchemaType } from '@/context/generateDocument/GenerateDocumentProvider';
import { DOCUMENT_TYPE } from '@/lib/constants/common-documents';
import { userInformationData } from '@/types/user';
import { prepareDataByDocumentType } from '@/utils/prepareDataByDocType';

export type ActionResult =
  | {
      success: true;
      data: {
        html: string;
        url?: string;
      };
    }
  | {
      success: false;
      error: {
        message: string;
        field?: string;
      };
    };

type FormData = z.infer<SchemaType<DOCUMENT_TYPE>>;

export async function generateDocumentAction(
  selectedDocument: DOCUMENT_TYPE,
  formData: FormData,
  documentLang: 'ua' | 'en',
  user: userInformationData,
  textLang: 'ua' | 'en',
): Promise<ActionResult> {
  try {
    const dataForSend = prepareDataByDocumentType(selectedDocument, formData, documentLang, user, textLang);
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

export async function generateDocumentPublicAction(
  selectedDocument: DOCUMENT_TYPE,
  formData: FormData,
  documentLang: 'ua' | 'en',
  textLang: 'ua' | 'en',
): Promise<ActionResult> {
  try {
    const user = null;
    const dataForSend = prepareDataByDocumentType(selectedDocument, formData, documentLang, user, textLang);

    const { html, url } = await generatePowerOfAttorneyPublic(dataForSend);

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

export async function getSortedDocuments(userId: string, sorType: 'ASC' | 'DESC', page: number, documentType?: string) {
  try {
    if (documentType === 'all' || !documentType) {
      return await fetchUserDocuments(userId, sorType, page);
    } else {
      return await fetchUserDocuments(userId, sorType, page, documentType);
    }
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
