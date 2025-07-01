import { InputDropdownProps } from './dropdown.types';

export interface InputSelectDropdownProps<T> {
  dataSet: T[];
  valueField: string;
  onSelectItem: (item: T) => void;

  // Optional props
  inputProps?: any;
  disable?: boolean;
  excludeItems?: T[];
  maxHeight?: number;
  minHeight?: number;
  hasSearch?: boolean;
  onBlur?: () => void;
  autoScroll?: boolean;
  onFocus?: () => void;
  searchField?: string;
  searchInputProps?: any;
  excludeSearchItems?: T[];
  keyboardAvoiding?: boolean;
  confirmSelectItem?: boolean;
  dropdownProps?: InputDropdownProps;
  customInputSearch?: React.ReactNode;
  closeModalWhenSelectedItem?: boolean;
  onConfirmSelectItem?: (item: T) => void;
  dropdownPosition?: 'auto' | 'top' | 'bottom';
  searchQuery?: (keyword: string, labelValue: string) => boolean;
  customDropdownItem?: (item: T, selected?: boolean) => React.ReactElement | null;
  dropdownItemProps?: {
    className?: string;
    activeBackgroundColor?: string;
    textItemProps?: any;
  };
}
