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

export const DEFAULT_CONFIG = {
  EMPTY_TEXT: 'No results found',
  MAX_HEIGHT: 300,
  MIN_HEIGHT: 0,
  PLACEHOLDER: 'Select item',
} as const;
