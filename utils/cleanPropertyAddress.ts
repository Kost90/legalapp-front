import { Address } from '@/types/power-of-attorney';

export const cleanPropertyAddress = (propertyAddress?: Address): Address | undefined => {
  if (!propertyAddress) return undefined;

  const { city, street, buildNumber, apartment, postCode } = propertyAddress;
  const hasAddress = city || street || buildNumber;

  return hasAddress
    ? {
        city: city || '',
        street: street || '',
        buildNumber: buildNumber || '',
        ...(apartment ? { apartment } : {}),
        ...(postCode ? { postCode } : {}),
      }
    : undefined;
};
