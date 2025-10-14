import type { VariantProps } from 'tailwind-variants';
import type { StyleProp, ViewProps, ViewStyle } from 'react-native';

import { dialogTv } from '@components/dialog/styles/Dialog.tw.styles';

import type { IconProps } from '../icon/icon.tw.types';

import { StrictOmit } from '../utils/StrictOmit.types';
import { StringProps } from '../string/string.tw.types';

/**
 * Props for the root Dialog component
 */
export interface DialogProps {
  /** Open state */
  open?: boolean;
  /** Callback when dialog opens */
  onOpen?: () => void;
  /** Callback when dialog closes */
  onClose?: () => void;
  /** Callback when open state changes */
  onOpenChange?: (open: boolean) => void;
  /** Initial open state */
  defaultOpen?: boolean;
}

/**
 * Props for the DialogTrigger component
 */
export interface DialogTriggerProps {
  /** Whether to clone the child element */
  asChild?: boolean;
  /** Custom CSS classes */
  className?: string;
  /** Trigger element that will open the dialog */
  children: React.ReactElement<{ onPress?: () => void }>;
  /** Type of touchable component to use */
  as?: 'pressable' | 'touchable-opacity' | 'ripple-pressable';
  /** Style object for the trigger */
  style?: StyleProp<ViewStyle>;
}

/**
 * Props for the DialogClose component
 */
export type DialogCloseProps = {
  /** Whether to clone the child element */
  asChild?: boolean;
  /** Type of touchable component to use */
  as?: 'pressable' | 'touchable-opacity' | 'ripple-pressable';
  /** Close trigger element */
  children: React.ReactElement<{ onPress?: () => void }>;
};

/**
 * Props for the DialogHeader component
 */
export type DialogHeaderProps = ViewProps & {
  /** Custom CSS classes for the header */
  className?: string;
  /** Whether to show close mark in header */
  hasCloseMark?: boolean;
  /** Custom close mark props */
  closeMarkProps?: StrictOmit<Partial<IconProps>, 'onPress'>;
};

/**
 * Props for the DialogTitle component
 */
export type DialogTitleProps = StringProps;

/**
 * Props for the DialogFooter component
 */
export type DialogFooterProps = ViewProps & {
  /** Custom CSS classes for the footer */
  className?: string;
};

/**
 * Props for the DialogBackdrop component (internal)
 */
export type DialogBackdropProps = {
  /** Whether to close dialog when backdrop is pressed */
  closeOnBackdropPress: boolean;
  /** Custom backdrop color */
  backdropColor?: string;
};

/**
 * Props for the DialogContent component (Tailwind version)
 */
export type DialogContentProps = ViewProps & {
  /** Custom CSS classes for dialog content */
  className?: string;
  /** Close when back button is pressed */
  closeOnGoBack?: boolean;
  /** Dialog content */
  children: React.ReactNode;
  /** Callback when dialog is requested to close */
  onRequestClose?: () => void;
  /** Use default white container */
  useDefaultContainer?: boolean;
  /** Animation type for the dialog */
  animation?: 'fade' | 'slide' | 'none';
  /** Size variant for the dialog */
  size?: VariantProps<typeof dialogTv>['size'];
  /** Whether to show backdrop */
  hasBackdrop?: boolean;
  /** Custom backdrop color */
  backdropColor?: string;
  /** Whether to close dialog when backdrop is pressed */
  closeOnBackdropPress?: boolean;
};
