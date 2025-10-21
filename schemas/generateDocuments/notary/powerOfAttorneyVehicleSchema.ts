import { z } from 'zod';

import { getBaseVehiclePowerOfAttorneySchema } from '@/schemas/common/base-vehicle-poa-schema';

export const getVehicleSchema = (lang: string) =>
  z.object({
    vehicleMake: z.preprocess(
      (val) => (val === '' ? undefined : val),
      z
        .string()
        // .min(2, lang === 'ua' ? 'Введіть марку авто' : 'Vehicle make is required')
        .default('(Toyota)'),
    ),
    vehicleModel: z.preprocess(
      (val) => (val === '' ? undefined : val),
      z
        .string()
        // .min(1, lang === 'ua' ? 'Введіть модель авто' : 'Vehicle model is required')
        .default('(Camry)'),
    ),
    vehicleYear: z.preprocess(
      (val) => (val === '' ? undefined : val),
      z
        .string({ required_error: lang === 'ua' ? 'Введіть рік випуску' : 'Year of manufacture is required' })
        // .min(4)
        // .max(4)
        .default('(2010)'),
    ),
    vehicleColor: z.preprocess(
      (val) => (val === '' ? undefined : val),
      z
        .string()
        // .min(3, lang === 'ua' ? 'Введіть колір' : 'Color is required')
        .default(lang === 'ua' ? '(Чорний)' : '(Black)'),
    ),
    vehicleVin: z.preprocess(
      (val) => (val === '' ? undefined : val),
      z
        .string()
        // .length(17, lang === 'ua' ? 'VIN-код має містити 17 символів' : 'VIN must be 17 characters long')
        .default('(123456789ABCDEFG)'), // 17 символов
    ),
    vehicleLicensePlate: z.preprocess(
      (val) => (val === '' ? undefined : val),
      z
        .string()
        // .min(4, lang === 'ua' ? 'Введіть номерний знак' : 'License plate is required')
        .default('(AA1234BB)'),
    ),
    vehicleType: z.preprocess(
      (val) => (val === '' ? undefined : val),
      z
        .string()
        // .min(5, lang === 'ua' ? 'Введіть тип ТЗ' : 'Vehicle type is required')
        .default(lang === 'ua' ? '(Легковий)' : '(Passenger car)'),
    ),
    vehicleRegistrationCertificate: z.preprocess(
      (val) => (val === '' ? undefined : val),
      z
        .string()
        // .min(5, lang === 'ua' ? 'Введіть номер свідоцтва' : 'Registration certificate number is required')
        .default('(CAA 123456)'),
    ),
    vehicleRegistrationAuthority: z.preprocess(
      (val) => (val === '' ? undefined : val),
      z
        .string()
        // .min(3, lang === 'ua' ? 'Введіть, ким видано свідоцтво' : 'Issuing authority is required')
        .default('(1234)'),
    ),
    vehicleRegistrationDate: z.preprocess(
      (val) => (val === '' || val === null ? undefined : val),
      z
        .date({ required_error: lang === 'ua' ? 'Вкажіть дату реєстрації' : 'Please select registration date' })
        .default(new Date('1970-01-01')),
    ),
  });

export const getVehiclePowerOfAttorneySchema = (lang: string) =>
  getBaseVehiclePowerOfAttorneySchema(lang).extend({ car: getVehicleSchema(lang) });

export type VehiclePowerOfAttorneyFormData = z.infer<ReturnType<typeof getVehiclePowerOfAttorneySchema>>;
