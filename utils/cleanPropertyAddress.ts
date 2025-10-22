import { Address } from '@/types/power-of-attorney';

export const cleanPropertyAddress = (propertyAddress?: Address): Address | undefined => {
  if (!propertyAddress) return undefined;

  const { city, street, buildNumber, apartment, postCode, propertyType } = propertyAddress;
  const hasAddress = city || street || buildNumber;

  const updatedBuildNumber = `буд. ${buildNumber}`;
  const updatedApartValue = propertyType === 'apartment' ? `кв. ${apartment}` : `прим. ${apartment}`;

  return hasAddress
    ? {
        city: city || '',
        street: street || '',
        buildNumber: updatedBuildNumber || '',
        ...(apartment ? { updatedApartValue } : {}),
        ...(postCode ? { postCode } : {}),
      }
    : undefined;
};
