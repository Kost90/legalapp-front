import { request } from '@/api/request';
import { PowerOfAttorney } from '@/types/power-of-attorney';

type PowerOfAttorneyBody = PowerOfAttorney;

// TODO: Make correct error handler change body
export const generatePowerOfAttorney = async (userId: string, body: PowerOfAttorneyBody): Promise<{ html: string; url: string }> => {
  const { html, url } = await request<{ html: string; url: string }, PowerOfAttorneyBody>(`/user/create-power-of-attorney/${userId}`, {
    method: 'POST',
    body,
    responseType: 'json',
  });

  return { html, url };
};
