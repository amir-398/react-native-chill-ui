import type { VariantProps } from 'tailwind-variants';

import type { IconSizeVr } from '../components/icon/Icon';

export interface DialogProps {
  children: React.ReactNode;
}

export interface DialogTriggerProps {
  asChild?: boolean;
  className?: string;
  children: React.ReactElement<{ onPress?: () => void }>;
  as?: 'pressable' | 'touchable-opacity' | 'ripple-pressable';
}

export type DialogCloseProps = {
  asChild?: boolean;
  as?: 'pressable' | 'touchable-opacity' | 'ripple-pressable';
  children: React.ReactElement<{ onPress?: () => void }>;
};

export type DialogBackdropProps = {
  closeOnBackdropPress: boolean;
  backdropClassName?: string;
  backdropColor?: string;
};

export interface DialogContentProps {
  className?: string;
  onShow?: () => void;
  hasOverlay?: boolean;
  defaultOpen?: boolean;
  hasCloseMark?: boolean;
  backdropColor?: string;
  closeOnGoBack?: boolean;
  closeMarkColor?: string;
  children: React.ReactNode;
  backdropClassName?: string;
  onRequestClose?: () => void;
  closeMarkClassName?: string;
  useDefaultContainer?: boolean;
  closeOnBackdropPress?: boolean;
  closeMarkPosition?: 'right' | 'left';
  animation?: 'fade' | 'slide' | 'none';
  onOpenChange?: (open: boolean) => void;
  closeMarkSize?: VariantProps<typeof IconSizeVr>['size'];
}
