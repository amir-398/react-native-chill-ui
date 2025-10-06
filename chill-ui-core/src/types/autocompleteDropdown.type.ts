import { FlatListProps } from 'react-native';

import { InputProps } from './input.types';
import { StringProps } from './string/string.ss.types';
import { HighlightStringProps } from './highlightString/highlightString.ss.types';
import { InputDropdownListProps, InputDropdownProps } from './inputDropdown/inputDropdown.tw.types';

/**
 * Ref methods for controlling AutocompleteDropdown externally
 *

 */
export type AutocompleteDropdownRefProps = {
  /** Open the dropdown */
  open: () => void;
  /** Close the dropdown */
  close: () => void;
  /** Toggle dropdown visibility */
  toggle: () => void;
};

/**
 * Props for AutocompleteDropdown component
 *
 * @template T - Type of data items in the dropdown
 *
 * @example
 * ```tsx
 * interface Product {
 *   id: string;
 *   name: string;
 *   category: string;
 * }
 *
 * <AutocompleteDropdown<Product>
 *   dataSet={products}
 *   valueField="name"
 *   searchField="name"
 *   onSelectItem={(product) => console.log(product)}
 * />
 * ```
 */
export interface AutocompleteDropdownProps<T> {
  /** Array of data items to display in the dropdown */
  dataSet: T[];
  /** Horizontal offset for dropdown positioning (default: 0) */
  offsetX?: number;
  /** Vertical offset for dropdown positioning (default: 0) */
  offsetY?: number;
  /** Maximum height of dropdown (default: 300) */
  maxHeight?: number;
  /** Minimum height of dropdown (default: 0) */
  minHeight?: number;
  /** Items to exclude from dropdown */
  excludeItems?: T[];
  /** Field to use as the display value and identifier */
  valueField: keyof T;
  /** Callback when input loses focus */
  onBlur?: () => void;
  /** Show loading indicator */
  isLoading?: boolean;
  /** Callback when input gains focus */
  onFocus?: () => void;
  /** Field to search in (defaults to valueField) */
  searchField?: keyof T;
  /** Props to pass to the input component */
  inputProps?: Omit<InputProps, 'onChangeText'>;
  /** Enable search functionality (default: true) */
  hasPerformSearch?: boolean;
  /** Require confirmation before selecting */
  confirmSelectItem?: boolean;
  /** Highlight search terms in results (default: true) */
  hasHighlightString?: boolean;

  /** Callback function when the input text changes */
  onChangeText?: (text: string) => void;

  /** Callback function when an item is selected */
  onSelectItem?: (item: T) => void;
  /** Close dropdown after selection (default: true) */
  closeModalWhenSelectedItem?: boolean;
  /** Callback for confirmed selection */
  onConfirmSelectItem?: (item: T) => void;
  /** Dropdown positioning: 'auto', 'top', or 'bottom' */
  dropdownPosition?: 'auto' | 'top' | 'bottom';
  /** Props for text highlighting configuration */
  highlightProps?: Partial<Omit<HighlightStringProps, 'text'>>;
  /** Custom search function for filtering items */
  searchQuery?: (keyword: string, labelValue: string) => boolean;
  /** Custom renderer for dropdown items */
  customDropdownItem?: (item: T, selected?: boolean) => React.ReactElement | null;
  /** Props for styling dropdown items */
  dropdownItemProps?: {
    /** Custom CSS classes for dropdown items */
    className?: string;
    /** Background color for active/selected items */
    activeBackgroundColor?: string;
    /** Props for the String component used in dropdown items */
    stringItemProps?: StringProps;
  };
  /** Props for the dropdown FlatList component */
  dropdownListProps?: Omit<FlatListProps<any>, 'renderItem' | 'data'> &
    InputDropdownListProps['customLoadingIndicator'];
  /** Ref for controlling the dropdown externally */
  ref?:
    | React.RefObject<AutocompleteDropdownRefProps>
    | React.RefObject<AutocompleteDropdownRefProps>
    | null
    | undefined;
  /** Props for the dropdown container */
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
