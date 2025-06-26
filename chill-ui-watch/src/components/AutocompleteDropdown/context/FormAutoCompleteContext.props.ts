import { View } from 'react-native';
import { ReactElement } from 'react';

export interface IAutocompleteInstance {
  id: string;
  showDropdown: boolean;
  dropdownContent?: ReactElement;
  dropdownPosition?: 'top' | 'bottom' | 'auto';
  inputContainerRef: React.RefObject<View | null>;
  contentStyles?: { top?: number; left: number; width?: number; bottom?: number };
}

export interface IAutocompleteDropdownContext {
  forceCalculatePositions: () => void;
  unregisterInstance: (id: string) => void;
  setShowDropdown: (id: string, show: boolean) => void;
  getInstance: (id: string) => IAutocompleteInstance | undefined;
  setDropdownContent: (id: string, content: ReactElement | undefined) => void;
  registerInstance: (id: string, inputContainerRef: React.RefObject<View | null>) => void;
  setDropdownPosition: (id: string, position: 'top' | 'bottom' | 'auto' | undefined) => void;
}

export interface IAutocompleteDropdownContextProviderProps {
  headerOffset?: number;
  children: React.ReactNode;
}
