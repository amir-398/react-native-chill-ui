import { VariantProps } from '@utils';
import { StyleProp, ViewProps, ViewStyle } from 'react-native';
import { dropdownMenuItemSv } from '@components/dropdownMenu/styles/DropdownMenu.ss.styles';

import { StringPropsSs } from '../string';

export interface DropdownMenuProps {
  open?: boolean;
  onOpen?: () => void;
  onClose?: () => void;
  defaultOpen?: boolean;
  onOpenChange?: (open: boolean) => void;
}

export type DropdownMenuTriggerProps = {
  asChild?: boolean;
  style?: StyleProp<ViewStyle>;
  as?: 'touchable-opacity' | 'pressable';
};

export type DropdownMenuSeparatorProps = ViewProps;

export type DropdownMenuItemProps = VariantProps<typeof dropdownMenuItemSv> & {
  onSelect?: () => void;
  underlayColor?: string;
  closeOnSelect?: boolean;
  stringProps?: StringPropsSs;
  style?: StyleProp<ViewStyle>;
  as?: 'touchable-opacity' | 'pressable' | 'touchable-highlight';
  asChild?: boolean;
};

export type DropdownMenuLabelProps = ViewProps & {
  stringProps?: StringPropsSs;
  asChild?: boolean;
};

export type DropdownMenuContentProps = {
  width?: number;
  offsetX?: number;
  offsetY?: number;
  maxHeight: number;
  minHeight: number;
  hasScroll: boolean;
  hasAnimation: boolean;
  style: StyleProp<ViewStyle>;
  closeWhenInteractedOutside?: boolean;
  side?: 'auto' | 'top' | 'bottom';
  align?: 'auto' | 'left' | 'right' | 'center';
};
