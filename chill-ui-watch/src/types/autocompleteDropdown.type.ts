import { FlatListProps } from 'react-native';

import { InputProps } from './input.types';
import { StringProps } from './string.types';
import { AutocompleteDropdownRefProps, DropdownProps, InputDropdownListProps } from './dropdown.types';

export interface AutocompleteDropdownProps<T> {
  dataSet: T[];
  maxHeight?: number;
  minHeight?: number;
  excludeItems?: T[];
  valueField: keyof T;
  onBlur?: () => void;
  isLoading?: boolean;
  onFocus?: () => void;
  searchField?: keyof T;
  inputProps?: InputProps;
  hasPerformSearch?: boolean;
  confirmSelectItem?: boolean;
  dropdownProps?: DropdownProps;
  onSelectItem: (item: T) => void;
  closeModalWhenSelectedItem?: boolean;
  onConfirmSelectItem?: (item: T) => void;
  searchQuery?: (keyword: string, labelValue: string) => boolean;
  customDropdownItem?: (item: T, selected?: boolean) => React.ReactElement | null;
  dropdownItemProps?: {
    className?: string;
    activeBackgroundColor?: string;
    textItemProps?: StringProps;
  };
  dropdownListProps?: Omit<FlatListProps<any>, 'renderItem' | 'data'> &
    InputDropdownListProps['customLoadingIndicator'];
  ref?:
    | React.RefObject<AutocompleteDropdownRefProps>
    | React.RefObject<AutocompleteDropdownRefProps>
    | null
    | undefined;
}
