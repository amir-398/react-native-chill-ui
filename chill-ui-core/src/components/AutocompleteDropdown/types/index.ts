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
  currentValue: any;
  searchText: string;
  keyboardHeight: number;
  position: Position | null;
}

export interface AutocompleteDropdownState {
  listData: any[];
  searchText: string;
  keyboardHeight: number;
  currentValue: any | null;
}
