import { InputProps } from './input.types';
import { InputDropdownListProps, InputDropdownProps } from './dropdown.types';

export interface InputSelectDropdownProps<T> {
  dataSet: T[];
  offsetX?: number;
  offsetY?: number;
  valueField: string;
  excludeItems?: T[];
  maxHeight?: number;
  minHeight?: number;
  hasSearch?: boolean;
  onBlur?: () => void;
  onFocus?: () => void;
  searchField?: string;
  inputProps?: InputProps;
  excludeSearchItems?: T[];
  searchInputProps?: InputProps;
  onSelectItem: (item: T) => void;
  customSearchInput?: React.ReactNode;
  closeModalWhenSelectedItem?: boolean;
  dropdownPosition?: 'auto' | 'top' | 'bottom';
  searchQuery?: (keyword: string, labelValue: string) => boolean;
  dropdownItemProps?: InputDropdownListProps['dropdownItemProps'];
  customDropdownItem?: (item: T, selected?: boolean) => React.ReactElement | null;
  dropdownProps?: Partial<
    Omit<
      InputDropdownProps,
      | 'data'
      | 'onSelectItem'
      | 'valueField'
      | 'hasSearch'
      | 'dropdownItemProps'
      | 'customDropdownItem'
      | 'searchInputProps'
    >
  >;
}
