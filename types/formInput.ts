export type Options = {
  label: string;
  value: string;
};

export type FieldSchema = {
  name: string;
  label: string;
  type: string;
  required: boolean;
  options?: Options[];
  isPeriod?: boolean;
  isWatchingCheckbox?: boolean;
  watchingField: string;
  watchingValue: string;
  singleCheckboxLabel?: string;
  conditionalOn?: 'includeLand' | 'apartment';
};
