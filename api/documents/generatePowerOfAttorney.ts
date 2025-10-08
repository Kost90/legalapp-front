'use server';
import { requestAdmin } from '@/api/request.admin';
import { buildUrl } from '@/api/utils';
import { ConsentForMinorToTravelAboard } from '@/types/consent-for-minor-to-travel-aboard';
import { PowerOfAttorney, PowerOfAttorneyReceiveDocuments, PowerOfAttorneyVehicle } from '@/types/power-of-attorney';

type GenerateDocumentBody = PowerOfAttorney | PowerOfAttorneyReceiveDocuments | PowerOfAttorneyVehicle | ConsentForMinorToTravelAboard;

export const generatePowerOfAttorney = async (userId: string, body: GenerateDocumentBody): Promise<{ html: string; url: string }> => {
  const urlPath = buildUrl(`user/generate-document/${userId}`, {});

  const { html, url } = await requestAdmin<{ html: string; url: string }, GenerateDocumentBody>(urlPath, {
    method: 'POST',
    body,
  });

  return { html, url };
};
