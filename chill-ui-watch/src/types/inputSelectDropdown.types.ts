import { InputProps } from './input.types';
import { InputDropdownListProps, InputDropdownProps } from './dropdown.types';

export interface InputSelectDropdownProps<T> {
  dataSet: T[];
  valueField: string;
  excludeItems?: T[];
  maxHeight?: number;
  minHeight?: number;
  hasSearch?: boolean;
  onBlur?: () => void;
  autoScroll?: boolean;
  onFocus?: () => void;
  searchField?: string;
  inputProps?: InputProps;
  excludeSearchItems?: T[];
  confirmSelectItem?: boolean;
  onSelectItem: (item: T) => void;
  customInputSearch?: React.ReactNode;
  closeModalWhenSelectedItem?: boolean;
  onConfirmSelectItem?: (item: T) => void;
  dropdownPosition?: 'auto' | 'top' | 'bottom';
  searchQuery?: (keyword: string, labelValue: string) => boolean;
  dropdownItemProps?: InputDropdownListProps['dropdownItemProps'];
  customDropdownItem?: (item: T, selected?: boolean) => React.ReactElement | null;
  dropdownProps?: Omit<
    InputDropdownProps,
    'data' | 'onSelectItem' | 'valueField' | 'hasSearch' | 'dropdownItemProps' | 'customDropdownItem'
  >;
}
