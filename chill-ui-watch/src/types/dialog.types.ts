import type { ViewProps } from 'react-native';
import type { VariantProps } from 'tailwind-variants';

import type { IconProps } from './icon.types';
import type dialogVariants from '../components/dialog/Dialog.variants';

import { StrictOmit } from './utils/StrictOmit.types';

/**
 * Props for the root Dialog component
 */
export interface DialogProps {
  /** Dialog content and triggers */
  children: React.ReactNode;
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
 * Props for the DialogBackdrop component (internal)
 */
export type DialogBackdropProps = {
  /** Whether to close dialog when backdrop is pressed */
  closeOnBackdropPress: boolean;
  /** Custom backdrop color */
  backdropColor?: string;
};

/**
 * Props for the DialogContent component
 */
export type DialogContentProps = ViewProps & {
  /** Custom CSS classes for dialog content */
  className?: string;
  /** Callback when dialog is shown */
  onShow?: () => void;
  /** Show overlay behind the dialog */
  hasOverlay?: boolean;
  /** Initial open state */
  defaultOpen?: boolean;
  /** Show close button in top corner */
  hasCloseMark?: boolean;
  /** Custom backdrop color */
  backdropColor?: string;
  /** Close when back button is pressed */
  closeOnGoBack?: boolean;
  /** Dialog content */
  children: React.ReactNode;
  /** Callback when dialog is requested to close */
  onRequestClose?: () => void;

  /** Use default white container */
  useDefaultContainer?: boolean;
  /** Close when backdrop is pressed */
  closeOnBackdropPress?: boolean;
  /** Position of the close mark */
  closeMarkPosition?: 'right' | 'left';
  /** Animation type for the dialog */
  animation?: 'fade' | 'slide' | 'none';
  /** Callback when open state changes */
  onOpenChange?: (open: boolean) => void;
  /** Size variant for the dialog */
  size?: VariantProps<typeof dialogVariants>['size'];
  /** Border radius variant for the dialog */
  rounded?: VariantProps<typeof dialogVariants>['rounded'];
  /** Custom close mark props */
  closeMarkProps?: StrictOmit<IconProps, 'name' | 'onPress'>;
};
