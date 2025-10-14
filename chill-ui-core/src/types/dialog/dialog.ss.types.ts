import type { StyleProp, ViewProps, ViewStyle } from 'react-native';

import type { IconProps } from '../icon/icon.ss.types';

import { ToastProps } from '../toast.types';
import { StrictOmit } from '../utils/StrictOmit.types';
import { StringProps } from '../string/string.ss.types';

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
  /** Whether to show close mark in header */
  hasCloseMark?: boolean;

  /** Custom close mark props */
  closeMarkProps?: StrictOmit<IconProps, 'onPress'>;
};

/**
 * Props for the DialogTitle component
 */
export type DialogTitleProps = StringProps;

/**
 * Props for the DialogFooter component
 */
export type DialogFooterProps = ViewProps & {
  /** Footer content */
  children: React.ReactNode;
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
 * Props for the DialogContent component (StyleSheet version)
 */
export type DialogContentProps = ViewProps & {
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
  size?: 'sm' | 'md' | 'lg' | 'xl' | 'full';
  /** Whether to show backdrop */
  hasBackdrop?: boolean;
  /** Custom backdrop color */
  backdropColor?: string;
  /** Whether to close dialog when backdrop is pressed */
  closeOnBackdropPress?: boolean;
};

type DialogToasterProps = {
  position: ToastProps['position'];
  message: ToastProps['message'];
  variant: ToastProps['variant'];
};

export interface DialogToasterRef {
  showToast: (props: DialogToasterProps) => void;
}
