import { VariantProps } from 'tailwind-variants';
import { StyleProp, ViewProps, ViewStyle } from 'react-native';
import { dropdownMenuItemTv } from '@components/dropdownMenu/styles/DropdownMenu.tw.styles';

import { StringPropsTw } from '../string';

export interface DropdownMenuProps {
  open?: boolean;
  onOpen?: () => void;
  onClose?: () => void;
  defaultOpen?: boolean;
  onOpenChange?: (open: boolean) => void;
}

export type DropdownMenuTriggerProps = {
  asChild?: boolean;
  className?: string;
  style?: StyleProp<ViewStyle>;
  as?: 'touchable-opacity' | 'pressable';
};

export type DropdownMenuSeparatorProps = ViewProps & {
  className?: string;
};

export type DropdownMenuItemProps = VariantProps<typeof dropdownMenuItemTv> & {
  className?: string;
  onSelect?: () => void;
  underlayColor?: string;
  closeOnSelect?: boolean;
  stringProps?: StringPropsTw;
  style?: StyleProp<ViewStyle>;
  as?: 'touchable-opacity' | 'pressable' | 'touchable-highlight';
  asChild?: boolean;
};

export type DropdownMenuLabelProps = ViewProps & {
  className?: string;
  stringProps?: StringPropsTw;
  asChild?: boolean;
};

export type DropdownMenuContentProps = {
  width?: number;
  offsetX?: number;
  offsetY?: number;
  className?: string;
  maxHeight?: number;
  minHeight?: number;
  hasScroll?: boolean;
  hasAnimation?: boolean;
  style?: StyleProp<ViewStyle>;
  closeWhenInteractedOutside?: boolean;
  side?: 'auto' | 'top' | 'bottom';
  align?: 'auto' | 'left' | 'right' | 'center';
};
