'use client';

import { useFormContext } from 'react-hook-form';

import Checkbox from '@/components/ui/checkbox/CheckBox';

type Options = {
  label: string;
  value: string;
};

interface ICHeckboxWithWatchingFormFieldProps {
  label: string;
  name: string;
  required?: boolean;
  options?: Options[];
  singleCheckboxLabel?: string;
  defaultValue?: string | string[];
  watchingField: string;
  watchingValue: string;
}

function CHeckboxWithWatchingFormField({ ...props }: ICHeckboxWithWatchingFormFieldProps) {
  const { watch } = useFormContext();

  const watchedFieldValue = watch(props.watchingField);

  const isGroup = props.options && props.options.length > 0;

  if (isGroup && watchedFieldValue === props.watchingValue) {
    return <Checkbox label={props.label} singleCheckboxLabel={props.singleCheckboxLabel} name={props.name} />;
  }

  return (
    <>
      {watchedFieldValue === props.watchingValue && (
        <Checkbox label={props.label} singleCheckboxLabel={props.singleCheckboxLabel} name={props.name} />
      )}
    </>
  );
}

export default CHeckboxWithWatchingFormField;
