import { request } from '@/api/request';
import { PowerOfAttorney } from '@/types/documents/power-of-attorney';

interface PowerOfAttorneyBody extends PowerOfAttorney {}

// TODO: Make correct error handler
export const generatePowerOfAttorney = async (userId: string, body: PowerOfAttorneyBody): Promise<Blob> => {
  const pdfBlob = await request<Blob, PowerOfAttorneyBody>(`/user/create-power-of-attorney/${userId}`, {
    method: 'POST',
    body,
    responseType: 'blob',
  });

  return pdfBlob;
};
