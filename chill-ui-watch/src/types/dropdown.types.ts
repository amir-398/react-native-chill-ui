import type { FlatListProps, ModalProps } from 'react-native';

import type { InputProps } from './input.types';
import type { LoadingIndicatorProps } from './loadingIndicator.types';

// InputDropdown ----------
export interface InputDropdownBaseProps {
  visible: boolean;
  maxHeight: number;
  minHeight?: number;
  className?: string;
  hasShadow?: boolean;
  hasSearch?: boolean;
  withAnimation?: boolean;
  children: React.ReactNode;
  searchInputProps?: InputProps;
}

export interface InputDropdownListProps {
  data: any[];
  currentValue?: any;
  emptyText?: string;
  valueField?: string;
  dropdownProps?: any;
  isLoading?: boolean;
  onSelectItem?: (item: any) => void;
  customEmpty?: () => React.ReactNode;
  loadingIndicatorProps?: LoadingIndicatorProps;
  customLoadingIndicator?: () => React.ReactNode;
  dropdownListProps?: Omit<FlatListProps<any>, 'renderItem' | 'data'>;
  customDropdownItem?: (item: any, selected: boolean) => React.ReactNode;
  dropdownItemProps?: {
    activeBackgroundColor?: string;
    className?: string;
    textItemProps?: any;
  };
}

export type InputDropdownProps = Omit<InputDropdownBaseProps, 'children'> & InputDropdownListProps;

export type AutocompleteDropdownRefProps = {
  open: () => void;
  close: () => void;
  toggle: () => void;
};

export type DropdownProps = {
  className?: string;
  hasShadow?: boolean;
  emptyText?: string;
  customEmpty?: () => React.ReactNode;
  loadingIndicatorProps?: LoadingIndicatorProps;
  customLoadingIndicator?: () => React.ReactNode;
  position?: 'auto' | 'top' | 'bottom';
  withAnimation?: boolean;
};

export type InputDropdownModalProps = {
  modalProps: ModalProps;
  dropdownProps: InputDropdownProps;
  dropdownPosition?: {
    left: number;
    top: number;
    width: number;
  } | null;
  toggleDropdown: () => void;
};
