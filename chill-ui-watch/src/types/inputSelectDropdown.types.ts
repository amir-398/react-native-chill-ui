import type { InputDropdownProps } from './dropdown.types';

export interface InputSelectDropdownProps<T> {
  dataSet: T[];
  valueField: keyof T;
  onSelectItem: (item: T) => void;
  dropdownProps?: InputDropdownProps;
}
