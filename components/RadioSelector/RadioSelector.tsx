'use client';

import { useFormContext } from 'react-hook-form';

import FormGroup from '@/components/FormGroup/FormGroup';

export const validPeriodValues = {
  ua: {
    oneYear: 'ОДИН РІК',
    twoYears: 'ДВА РОКИ',
    threeYears: 'ТРИ РОКИ',
  },
  en: {
    oneYear: 'ONE YEAR',
    twoYears: 'TWO YEARS',
    threeYears: 'THREE YEARS',
  },
};

function PeriodValidRadioSelector({ label, name, required, lang }: { label: string; name: string; required: boolean; lang: string }) {
  const {
    register,
    formState: { errors },
  } = useFormContext();
  const periods = Object.values(validPeriodValues[lang as 'ua' | 'en']);

  const getNestedError = (errors: any, path: string) => {
    const pathParts = path.split('.');
    return pathParts.reduce((acc, part) => acc && acc[part], errors);
  };

  const errorObject = getNestedError(errors, name);

  const error = errorObject?.message as string | undefined;

  return (
    <FormGroup label={label} error={error}>
      <div className="mb-1 flex flex-col gap-2">
        <div className="flex items-center gap-4">
          {periods.map((period) => (
            <div key={period} className="flex items-center gap-2">
              <input
                type="radio"
                id={`${period}-${name}`}
                {...register(name)}
                value={period}
                required={required}
                className="focus:ring-link-btn-text text-link-btn-text h-4 w-4 border-gray-300"
              />
              <label htmlFor={`${period}-${name}`} className="cursor-pointer text-sm font-medium text-gray-700">
                {period}
              </label>
            </div>
          ))}
        </div>
      </div>
    </FormGroup>
  );
}

export default PeriodValidRadioSelector;
