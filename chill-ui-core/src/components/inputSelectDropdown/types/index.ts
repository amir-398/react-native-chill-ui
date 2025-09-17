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
  HEADER_OFFSET_Y: 5,
  MAX_HEIGHT: 340,
  MIN_HEIGHT: 0,
  PHONE_NUMBER_INPUT_PLACEHOLDER: '06 12 34 56 78',
  PLACEHOLDER: 'Select item',
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
