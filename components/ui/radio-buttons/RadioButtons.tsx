'use client';

import { useFormContext } from 'react-hook-form';

import FormGroup from '@/components/FormGroup/FormGroup';

type Options = {
  label: string;
  value: string;
};

interface IRadioButtonProps {
  label: string;
  name: string;
  required: boolean;
  options?: Options[];
}

function RadioButtons({ ...props }: IRadioButtonProps) {
  const {
    register,
    formState: { errors },
  } = useFormContext();
  const values = props.options ? Object.values(props?.options) : [];

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const getNestedError = (errors: any, path: string) => {
    const pathParts = path.split('.');
    return pathParts.reduce((acc, part) => acc && acc[part], errors);
  };

  const errorObject = getNestedError(errors, props.name);

  const error = errorObject?.message as string | undefined;

  return (
    <FormGroup label={props.label} error={error}>
      <div className="mb-1 flex flex-col gap-2">
        <div className="flex items-center gap-4">
          {values.length > 0
            ? values.map((option) => (
                <div key={`option-${option.value}`} className="flex items-center gap-2">
                  <input
                    type="radio"
                    id={`${option.value}-${props.name}`}
                    {...register(props.name)}
                    value={option.value}
                    required={props.required}
                    className="focus:ring-link-btn-text text-link-btn-text h-4 w-4 border-gray-300"
                  />
                  <label htmlFor={`${option.value}-${name}`} className="cursor-pointer text-sm font-medium text-gray-700">
                    {option.label}
                  </label>
                </div>
              ))
            : null}
        </div>
      </div>
    </FormGroup>
  );
}

export default RadioButtons;
