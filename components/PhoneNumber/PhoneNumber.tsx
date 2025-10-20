'use client';
import { useFormContext, useWatch } from 'react-hook-form';

import Dropdown from '@/components/Dropdown/Dropdown';
import Flag from '@/components/Flag/Flag';
import FormInput from '@/components/ui/Input/Input';

import countryCallingCodes from './countryCallingCodes.json';

const items = countryCallingCodes.map(({ code, name, callingCode }) => ({
  icon: () => <Flag value={code.toLowerCase()} />,
  label: name,
  rightLabel: `+${callingCode}`,
  activeLabel: `+${callingCode}`,
  value: callingCode,
  searchAliases: [code, name, callingCode],
}));

export const mergePhoneNumber = (callingCode: string, phoneNumber: string) => {
  return `+${callingCode} ${phoneNumber}`;
};

export const splitPhoneNumber = (number: string) => {
  const splitted = number.split(' ');

  const num = splitted.pop();

  return {
    callingCode: splitted.join(' ').replace('+', ''),
    phoneNumber: num,
  };
};

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export default function PhoneNumber({ occupyErrorSpace = true }: { occupyErrorSpace?: boolean }) {
  const form = useFormContext();

  const country = useWatch({
    control: form.control,
    name: 'callingCode',
  });

  return (
    <div className="relative flex w-full gap-2">
      <div className="w-[128px]">
        <Dropdown
          items={items}
          popoverAttributes={{
            fullWidth: true,
          }}
          value={country}
          searchInput
          onChange={(value: string) => form.setValue('callingCode', value)}
          buttonClassName="h-full w-full"
        />
      </div>

      <div className="flex-1">
        <FormInput
          label=""
          placeholder="234 567 890"
          type="tel"
          {...form.register('phone', {
            required: 'Phone number is required',
            pattern: {
              value: /^[0-9]+$/,
              message: 'Only numbers are allowed',
            },
            maxLength: {
              value: 12,
              message: 'Phone number must be less than 12 characters',
            },
            setValueAs: (value: string) => value.trim().replace(/\s+/g, ''),
          })}
          onKeyDown={(e) => {
            if (
              !/^[0-9]$/.test(e.key) &&
              !['Backspace', 'Delete', 'ArrowLeft', 'ArrowRight', 'Tab'].includes(e.key) &&
              !(e.metaKey || e.ctrlKey)
            ) {
              e.preventDefault();
            }
          }}
        />
      </div>
    </div>
  );
}
