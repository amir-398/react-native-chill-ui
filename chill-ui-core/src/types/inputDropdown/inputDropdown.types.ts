import { StyleProp, View, FlatListProps, ModalProps, ViewStyle } from 'react-native';

import type { LoadingIndicatorProps } from '../loadingIndicatorsKit/loadingIndicatorsKit.types';

import { InputProps } from '../input/input.types';
import { StringProps } from '../string/string.tw.types';

/**
 * Props for dropdown items
 */
export interface DropdownItemProps {
  /** Props for the string component within the item */
  stringItemProps?: StringProps;
  /** Background color when item is active/selected */
  activeBackgroundColor?: string;
}

// InputDropdown ----------
/**
 * Base props for input dropdown components
 */
export interface InputDropdownBaseProps {
  /** Whether the dropdown is visible */
  visible: boolean;
  /** Maximum height of the dropdown */
  maxHeight?: number;
  /** Minimum height of the dropdown */
  minHeight?: number;
  /** Custom CSS classes for the dropdown */
  className?: string;
  /** Style for the dropdown */
  style?: StyleProp<ViewStyle>;
  /** Whether to show shadow */
  hasShadow?: boolean;
  /** Whether to show search input */
  hasSearch?: boolean;
  /** Whether to show animations */
  hasAnimation?: boolean;
  /** Child components */
  children: React.ReactNode;
  /** Props for the search input */
  searchInputProps?: InputProps;
  /** Custom search input component */
  customSearchInput?: React.ReactNode;
}

/**
 * Props for dropdown list functionality
 */
export interface InputDropdownListProps {
  /** Array of data items */
  data: any[];
  /** Text to show when list is empty */
  emptyText?: string;
  /** Whether the list is loading */
  isLoading?: boolean;
  /** Callback when an item is selected */
  onSelectItem?: (item: any) => void;
  /** Custom empty state component */
  customEmpty?: () => React.ReactNode;
  /** Props for dropdown items */
  dropdownItemProps?: DropdownItemProps;
  /** Props for the loading indicator */
  loadingIndicatorProps?: LoadingIndicatorProps;
  /** Custom loading indicator component */
  customLoadingIndicator?: () => React.ReactNode;
  /** Custom render function for dropdown items */
  DropdownItemRender?: (item: any) => React.ReactNode;
  /** Props for the FlatList component */
  dropdownListProps?: Omit<FlatListProps<any>, 'renderItem' | 'data'>;
  /** Type of touchable component to use for items
   * - `'touchable-opacity'`
   * - `'pressable'`
   * - `'touchable-highlight'`
   */
  itemClickableAs?: 'touchable-opacity' | 'pressable' | 'touchable-highlight';
}

/**
 * Complete props for InputDropdown component
 */
export type InputDropdownProps = Omit<InputDropdownBaseProps, 'children'> & InputDropdownListProps;

/**
 * Props for InputDropdownModal component
 */
export type InputDropdownModalProps = {
  /** Function to handle backdrop press */
  backdropPress?: () => void;
  /** Reference to the dropdown view */
  dropdownRef?: React.RefObject<View | null>;
  /** Reference to the wrapper view */
  wrapperRef?: React.RefObject<View | null>;
  /** Props for the modal component */
  modalProps: ModalProps;
  /** Props for the dropdown component */
  dropdownProps: InputDropdownProps;
  /** Position configuration for the dropdown */
  dropdownPosition?: {
    /** Left position */
    left?: number;
    /** Top position */
    top?: number;
    /** Width of the dropdown */
    width?: number;
    /** Bottom position */
    bottom?: number;
  } | null;
};
