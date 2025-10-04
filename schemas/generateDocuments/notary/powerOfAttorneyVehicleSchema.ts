import { z } from 'zod';

import { getBaseVehiclePowerOfAttorneySchema } from '@/schemas/common/base-vehicle-poa-schema';

const getVehicleSchema = (lang: string) =>
  z.object({
    vehicleMake: z.string().min(2, lang === 'ua' ? 'Введіть марку авто' : 'Vehicle make is required'),
    vehicleModel: z.string().min(1, lang === 'ua' ? 'Введіть модель авто' : 'Vehicle model is required'),
    vehicleYear: z
      .string({ required_error: lang === 'ua' ? 'Введіть рік випуску' : 'Year of manufacture is required' })
      .min(4)
      .max(4),
    vehicleColor: z.string().min(3, lang === 'ua' ? 'Введіть колір' : 'Color is required'),
    vehicleVin: z.string().length(17, lang === 'ua' ? 'VIN-код має містити 17 символів' : 'VIN must be 17 characters long'),
    vehicleLicensePlate: z.string().min(4, lang === 'ua' ? 'Введіть номерний знак' : 'License plate is required'),
    vehicleType: z.string().min(5, lang === 'ua' ? 'Введіть тип ТЗ' : 'Vehicle type is required'),
    vehicleRegistrationCertificate: z
      .string()
      .min(6, lang === 'ua' ? 'Введіть номер свідоцтва' : 'Registration certificate number is required'),
    vehicleRegistrationAuthority: z.string().min(5, lang === 'ua' ? 'Введіть, ким видано свідоцтво' : 'Issuing authority is required'),
    vehicleRegistrationDate: z.date({ required_error: lang === 'ua' ? 'Вкажіть дату реєстрації' : 'Please select registration date' }),
  });

export const getVehiclePowerOfAttorneySchema = (lang: string) =>
  getBaseVehiclePowerOfAttorneySchema(lang).extend({ car: getVehicleSchema(lang) });

export type VehiclePowerOfAttorneyFormData = z.infer<ReturnType<typeof getVehiclePowerOfAttorneySchema>>;
