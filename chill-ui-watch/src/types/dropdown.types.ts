import type { FlatListProps, ModalProps, View } from 'react-native';

import type { InputProps } from './input.types';
import type { LoadingIndicatorProps } from './loadingIndicator.types';

import { StringProps } from './string.types';

// InputDropdown ----------
export interface InputDropdownBaseProps {
  visible: boolean;
  maxHeight: number;
  minHeight?: number;
  className?: string;
  hasShadow?: boolean;
  hasSearch?: boolean;
  hasAnimation?: boolean;
  children: React.ReactNode;
  searchInputProps?: InputProps;
  customSearchInput?: React.ReactNode;
}

export interface InputDropdownListProps {
  data: any[];
  emptyText?: string;
  valueField?: string;
  isLoading?: boolean;
  currentValue?: string;
  onSelectItem?: (item: any) => void;
  customEmpty?: () => React.ReactNode;
  loadingIndicatorProps?: LoadingIndicatorProps;
  customLoadingIndicator?: () => React.ReactNode;
  dropdownListProps?: Omit<FlatListProps<any>, 'renderItem' | 'data'>;
  customDropdownItem?: (item: any, selected: boolean) => React.ReactNode;
  dropdownItemProps?: {
    activeBackgroundColor?: string;
    className?: string;
    textItemProps?: StringProps;
  };
}

export type InputDropdownProps = Omit<InputDropdownBaseProps, 'children'> & InputDropdownListProps;

export type InputDropdownModalProps = {
  dropdownRef?: React.RefObject<View | null>;
  wrapperRef?: React.RefObject<View | null>;
  modalProps: ModalProps;
  dropdownProps: InputDropdownProps;
  dropdownPosition?: {
    left?: number;
    top?: number;
    width?: number;
    bottom?: number;
  } | null;
  toggleDropdown: () => void;
};
