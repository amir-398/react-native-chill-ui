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
