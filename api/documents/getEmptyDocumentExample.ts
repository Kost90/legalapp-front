'use server';
import { requestAdmin } from '@/api/request.admin';
import { buildUrl } from '@/api/utils';
import { DOCUMENT_TYPE } from '@/lib/constants/common-documents';

export const getEmptyDocumentExample = async (documentType: DOCUMENT_TYPE, email: string, textLang: string): Promise<{ url: string }> => {
  const urlPath = buildUrl(`documents/emppty-example/${documentType}/email/${email}/textLang/${textLang}`, {});

  const { url } = await requestAdmin<{ url: string }>(urlPath, {
    method: 'GET',
  });

  return { url };
};
