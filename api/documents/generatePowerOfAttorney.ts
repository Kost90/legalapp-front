'use server';
import { requestAdmin } from '@/api/request.admin';
import { buildUrl } from '@/api/utils';
import { PowerOfAttorney } from '@/types/power-of-attorney';
import { PowerOfAttorneyReceiveDocuments } from '@/types/power-of-attorney-receive-documents';

type GenerateDocumentBody = PowerOfAttorney | PowerOfAttorneyReceiveDocuments;

export const generatePowerOfAttorney = async (userId: string, body: GenerateDocumentBody): Promise<{ html: string; url: string }> => {
  const urlPath = buildUrl(`user/generate-document/${userId}`, {});
  const { html, url } = await requestAdmin<{ html: string; url: string }, GenerateDocumentBody>(urlPath, {
    method: 'POST',
    body,
  });

  return { html, url };
};
