'use client';

import { useMemo } from 'react';
import { useFormContext } from 'react-hook-form';

import CHeckboxWithWatchingFormField from '@/components/CHeckboxWithWatchingFormField/CHeckboxWithWatchingFormField';
import DatePickerInput from '@/components/DatePickerInput/DatePickerInput';
import PeriodValidRadioSelector from '@/components/RadioSelector/RadioSelector';
import Checkbox from '@/components/ui/checkbox/CheckBox';
import FormInput from '@/components/ui/Input/Input';
import RadioButtons from '@/components/ui/radio-buttons/RadioButtons';
import FormSelect from '@/components/ui/Select/Select';
import { FieldSchema, Options } from '@/types/formInput';

export default function DynamicFormFields({ schema, lang }: { schema: FieldSchema[]; lang: string }) {
  const { watch } = useFormContext();
  const fieldsToWatch = useMemo(() => {
    const conditionalFields = schema.map((field) => field.conditionalOn).filter(Boolean);
    return [...new Set(conditionalFields)] as string[];
  }, [schema]);

  const watchedValuesArray = watch(fieldsToWatch);

  const formValues = useMemo(() => {
    const valuesObject: { [key: string]: unknown } = {};
    fieldsToWatch.forEach((fieldName, index) => {
      valuesObject[fieldName] = watchedValuesArray[index];
    });
    return valuesObject;
  }, [fieldsToWatch, watchedValuesArray]);

  return (
    <>
      {schema.map((field) => {
        if (field.conditionalOn) {
          if (!formValues[field.conditionalOn]) {
            return null;
          }
        }

        if (field.type === 'date') {
          return <DatePickerInput key={field.name} label={field.label} name={field.name} lang={lang} />;
        }

        if (field.type === 'radio') {
          if (field.isPeriod) {
            return (
              <PeriodValidRadioSelector key={field.name} label={field.label} name={field.name} lang={lang} required={field.required} />
            );
          } else if (field.options) {
            return (
              <RadioButtons name={field.name} key={field.name} label={field.label} options={field.options} required={field.required} />
            );
          }
        }

        if (field.type === 'select') {
          return <FormSelect key={field.name} name={field.name} label={field.label} options={field.options as Options[]} />;
        }

        if (field.type === 'checkbox') {
          if (!field.isWatchingCheckbox) {
            return <Checkbox key={field.name} name={field.name} label={field.label} options={field.options as Options[]} />;
          } else {
            return (
              <CHeckboxWithWatchingFormField
                key={field.name}
                name={field.name}
                label={field.label}
                watchingField={field.watchingField}
                watchingValue={field.watchingValue}
                singleCheckboxLabel={field.singleCheckboxLabel}
              />
            );
          }
        }

        return <FormInput key={field.name} label={field.label} name={field.name} type={field.type} />;
      })}
    </>
  );
}
