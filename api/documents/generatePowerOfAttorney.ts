'use server';
import { requestAdmin } from '@/api/request.admin';
import { buildUrl } from '@/api/utils';
import { PowerOfAttorney } from '@/types/power-of-attorney';

type PowerOfAttorneyBody = PowerOfAttorney;

export const generatePowerOfAttorney = async (userId: string, body: PowerOfAttorneyBody): Promise<{ html: string; url: string }> => {
  const urlPath = buildUrl(`user/create-power-of-attorney/${userId}`, {});
  const { html, url } = await requestAdmin<{ html: string; url: string }, PowerOfAttorneyBody>(urlPath, {
    method: 'POST',
    body,
  });

  return { html, url };
};
