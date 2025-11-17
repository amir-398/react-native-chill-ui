import { View } from 'react-native';
import { DropdownMenuItemPropsTw } from '@types';
import { createContext, useContext, ReactNode, RefObject } from 'react';

interface DropdownMenuContextValue {
  // State
  visible: boolean;
  keyboardHeight: number;

  // Refs
  inputRef: RefObject<any>;
  wrapperRef: RefObject<View | null>;
  dropdownRef: RefObject<View | null>;

  // Actions
  eventOpen: () => void;
  eventClose: () => void;
  toggleDropdown: () => void;
  handleSelectItem: (item: DropdownMenuItemPropsTw) => void;
  dropdownStyles: {
    top?: number;
    bottom?: number;
    left: number;
    width: number;
  } | null;

  // Utils
  calculatePosition: () => void;
  setDropdownWidth?: (width: number) => void;
  setOffsets?: (offsetX: number, offsetY: number) => void;
  setDropdownPosition?: (vertical: 'auto' | 'top' | 'bottom', horizontal: 'auto' | 'left' | 'right' | 'center') => void;
}

const DropdownMenuContext = createContext<DropdownMenuContextValue | null>(null);

interface DropdownMenuProviderProps {
  children: ReactNode;
  value: DropdownMenuContextValue;
}

export function DropdownMenuProvider({ children, value }: DropdownMenuProviderProps) {
  return <DropdownMenuContext.Provider value={value}>{children}</DropdownMenuContext.Provider>;
}

export const useDropdownMenuContext = (): DropdownMenuContextValue => {
  const context = useContext(DropdownMenuContext);
  if (!context) {
    throw new Error('useDropdownContext must be used within a DropdownProvider');
  }
  return context;
};
