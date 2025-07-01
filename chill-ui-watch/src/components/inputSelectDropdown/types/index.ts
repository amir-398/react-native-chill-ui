export interface Position {
  top: number;
  left: number;
  width: number;
  bottom: number;
  height: number;
  isFull: boolean;
}

export interface DropdownState {
  listData: any[];
  visible: boolean;
  currentValue: any;
  searchText: string;
  keyboardHeight: number;
  position: Position | null;
}

export const DEFAULT_CONFIG = {
  DEBOUNCE_DELAY: 200,
  FALLBACK_THRESHOLD: 100,
  MAX_HEIGHT: 340,
  MIN_HEIGHT: 0,
  PLACEHOLDER: 'Select item',
  SCROLL_THRESHOLD: 150,
} as const;

export interface DropdownActions {
  eventOpen: () => void;
  eventClose: () => void;
  toggleDropdown: () => void;
}

export interface SearchConfig {
  valueField: string;
  searchField?: string;
  excludeItems?: any[];
  excludeSearchItems?: any[];
  searchQuery?: (searchText: string, itemText: string) => boolean;
}

export interface IDropdownRef {
  open: () => void;
  close: () => void;
}

export interface CompleteInputSelectDropdownProps<T> {
  dataSet: T[];
  valueField: string;
  onSelectItem: (item: T) => void;

  // Optional props
  inputProps?: any;
  disable?: boolean;
  excludeItems?: T[];
  maxHeight?: number;
  minHeight?: number;
  dropdownProps?: any;
  hasSearch?: boolean;
  onBlur?: () => void;
  autoScroll?: boolean;
  onFocus?: () => void;
  searchField?: string;
  searchInputProps?: any;
  excludeSearchItems?: T[];
  keyboardAvoiding?: boolean;
  confirmSelectItem?: boolean;
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
