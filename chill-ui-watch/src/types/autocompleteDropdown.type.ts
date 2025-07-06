import { FlatListProps } from 'react-native';

import { InputProps } from './input.types';
import { StringProps } from './string.types';
import { HighlightStringProps } from './highlightString.types';
import { InputDropdownListProps, InputDropdownProps } from './dropdown.types';

export type AutocompleteDropdownRefProps = {
  open: () => void;
  close: () => void;
  toggle: () => void;
};
export interface AutocompleteDropdownProps<T> {
  dataSet: T[];
  offsetX?: number;
  offsetY?: number;
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
  hasHighlightString?: boolean;
  onSelectItem: (item: T) => void;
  closeModalWhenSelectedItem?: boolean;
  onConfirmSelectItem?: (item: T) => void;
  dropdownPosition?: 'auto' | 'top' | 'bottom';
  highlightProps?: Partial<Omit<HighlightStringProps, 'text'>>;
  searchQuery?: (keyword: string, labelValue: string) => boolean;
  customDropdownItem?: (item: T, selected?: boolean) => React.ReactElement | null;
  dropdownItemProps?: {
    className?: string;
    activeBackgroundColor?: string;
    stringItemProps?: StringProps;
  };
  dropdownListProps?: Omit<FlatListProps<any>, 'renderItem' | 'data'> &
    InputDropdownListProps['customLoadingIndicator'];
  ref?:
    | React.RefObject<AutocompleteDropdownRefProps>
    | React.RefObject<AutocompleteDropdownRefProps>
    | null
    | undefined;
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
