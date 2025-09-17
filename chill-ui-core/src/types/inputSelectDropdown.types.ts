import { InputProps } from './input.types';
import { HighlightStringProps } from './highlightString.types';
import { InputDropdownListProps, InputDropdownProps } from './dropdown.types';

/**
 * Props for the InputSelectDropdown component
 */
export interface InputSelectDropdownProps<T> {
  /** Array of data items */
  dataSet: T[];
  /** Horizontal offset for dropdown positioning */
  offsetX?: number;
  /** Vertical offset for dropdown positioning */
  offsetY?: number;
  /** Field name to use as value */
  valueField: string;
  /** Items to exclude from the dropdown */
  excludeItems?: T[];
  /** Maximum height of the dropdown */
  maxHeight?: number;
  /** Minimum height of the dropdown */
  minHeight?: number;
  /** Whether to show search functionality */
  hasSearch?: boolean;
  /** Callback when input loses focus */
  onBlur?: () => void;
  /** Callback when input gains focus */
  onFocus?: () => void;
  /** Field name to use for search */
  searchField?: string;
  /** Props for the input component */
  inputProps?: InputProps;
  /** Items to exclude from search results */
  excludeSearchItems?: T[];
  /** Whether to highlight search terms */
  hasHighlightString?: boolean;
  /** Props for the search input */
  searchInputProps?: InputProps;
  /** Callback when an item is selected */
  onSelectItem: (item: T) => void;
  /** Custom search input component */
  customSearchInput?: React.ReactNode;
  /** Whether to close modal when item is selected */
  closeModalWhenSelectedItem?: boolean;
  /** Position of the dropdown */
  dropdownPosition?: 'auto' | 'top' | 'bottom';
  /** Props for highlight string functionality */
  highlightProps?: Partial<Omit<HighlightStringProps, 'text'>>;
  /** Custom search query function */
  searchQuery?: (keyword: string, labelValue: string) => boolean;
  /** Props for dropdown items */
  dropdownItemProps?: InputDropdownListProps['dropdownItemProps'];
  /** Custom render function for dropdown items */
  customDropdownItem?: (item: T, selected?: boolean) => React.ReactElement | null;
  /** Props for the dropdown component */
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
