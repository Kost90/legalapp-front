'use client';

import { useFormContext } from 'react-hook-form';

import FormGroup from '@/components/FormGroup/FormGroup';

type Options = {
  label: string;
  value: string;
};

interface ICheckboxProps {
  label: string;
  name: string;
  required?: boolean;
  options?: Options[];
  singleCheckboxLabel?: string;
  defaultValue?: string | string[];
}

function Checkbox({ ...props }: ICheckboxProps) {
  const {
    register,
    formState: { errors },
  } = useFormContext();

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const getNestedError = (errors: any, path: string) => {
    const pathParts = path.split('.');
    return pathParts.reduce((acc, part) => acc && acc[part], errors);
  };

  const errorObject = getNestedError(errors, props.name);
  const error = errorObject?.message as string | undefined;

  const isGroup = props.options && props.options.length > 0;

  return (
    <FormGroup label={props.label} error={error}>
      <div className="mb-1 flex flex-col gap-2">
        {isGroup ? (
          <div className="flex flex-col gap-2">
            {props.options?.map((option) => (
              <div key={`checkbox-option-${option.value}`} className="flex items-center gap-2">
                <input
                  type="checkbox"
                  id={`${option.value}-${props.name}`}
                  {...register(props.name, { required: props.required })}
                  value={option.value}
                  defaultChecked={Array.isArray(props.defaultValue) && props.defaultValue.includes(option.value)}
                  className="focus:ring-link-btn-text text-link-btn-text h-4 w-4 rounded border-gray-300"
                />
                <label htmlFor={`${option.value}-${props.name}`} className="cursor-pointer text-sm font-medium text-gray-700">
                  {option.label}
                </label>
              </div>
            ))}
          </div>
        ) : (
          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              id={props.name}
              {...register(props.name, { required: props.required })}
              defaultChecked={!!props.defaultValue}
              className="focus:ring-link-btn-text text-link-btn-text h-4 w-4 rounded border-gray-300"
            />
            {props.singleCheckboxLabel && (
              <label htmlFor={props.name} className="cursor-pointer text-sm font-medium text-gray-700">
                {props.singleCheckboxLabel}
              </label>
            )}
          </div>
        )}
      </div>
    </FormGroup>
  );
}

export default Checkbox;
