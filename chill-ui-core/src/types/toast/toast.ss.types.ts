import { StyleProp, ViewStyle } from 'react-native';

import { IconProps } from '../icon/icon.ss.types';
import { StringProps } from '../string/string.ss.types';

/**
 * Toast variant type definition
 */
export type ToastVariantProps = 'success' | 'error' | 'info' | 'warning';

/**
 * Toast position type definition
 */
export type ToastPositionProps = 'top' | 'bottom';

export interface ToastVariantConfig {
  /** Style object for the entire toast container */
  style?: StyleProp<ViewStyle>;
  /** Props for the title String component */
  titleStringProps?: StringProps;
  /** Props for the message String component */
  messageStringProps?: StringProps;
  /** Props for the Icon component */
  iconProps?: IconProps;
  /** Custom icon component for toast */
  customIcon?: React.ReactNode;
  /** Custom render function for toast content */
  render?: React.ReactNode;
  /** Progress bar color for toast */
  progressBarColor?: string;
}

export type ToastVariantTypeProps = {
  [key in ToastVariantProps]?: ToastVariantConfig;
};

/**
 * Toast provider props
 */
export type ToastProviderProps = {
  /** Custom styling variants for different toast types */
  variants?: ToastVariantTypeProps;
  /** Default duration in milliseconds for toasts (default: 3000) */
  defaultDuration?: number;
  /** If true, multiple toasts can be shown simultaneously (default: false) */
  allowMultiple?: boolean;
  /** Maximum number of toasts to show simultaneously (default: 4) */
  maxToasts?: number;
  /** If true, toasts can be dismissed by swiping (default: false) */
  swipeable?: boolean;
  /** Global vertical offset in pixels to adjust toast position (default: 0) */
  offsetY?: number;
};

/**
 * Props for the Toast component (StyleSheet)
 */
export type ToastProps = {
  /** Toast id */
  id?: string;
  /** Toast variant type */
  variant?: ToastVariantProps;
  /** Toast message content */
  message?: string;
  /** Position of the toast */
  position?: ToastPositionProps;
  /** Duration in milliseconds */
  duration?: number;
  /** Toast title */
  title?: string;
  /** Toast render */
  render?: React.ReactNode;
  /** Allow swipe to dismiss for this specific toast */
  swipeable?: boolean;
  /** Allow multiple toasts for this specific toast (overrides provider setting) */
  allowMultiple?: boolean;
  /** Maximum number of toasts for this specific toast (overrides provider setting) */
  maxToasts?: number;
  /** Vertical offset in pixels to adjust toast position */
  offsetY?: number;
  /** Style object for additional styling */
  style?: StyleProp<ViewStyle>;
  /** Props for the title String component */
  titleStringProps?: StringProps;
  /** Props for the message String component */
  messageStringProps?: StringProps;
  /** Props for the Icon component */
  iconProps?: IconProps;
};
