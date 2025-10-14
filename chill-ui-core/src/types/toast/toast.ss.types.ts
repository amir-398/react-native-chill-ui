import type { TIcons } from '../../constants/ICONS';

/**
 * Toast variant configuration type (StyleSheet)
 */
export interface ToastVariantConfig {
  /** Background color for toast */
  backgroundColor?: string;
  /** Icon name for toast */
  icon?: keyof TIcons;
  /** Custom icon component for toast */
  customIcon?: React.ReactNode;
  /** Title text color for toast */
  titleColor?: string;
  /** Content text color for toast */
  contentColor?: string;
  /** Progress bar color for toast */
  progressBarColor?: string;
}

/**
 * Toast variant type definition
 */
export type ToastVariant = 'success' | 'error' | 'info' | 'warning';

/**
 * Toast position type definition
 */
export type ToastPosition = 'top' | 'bottom';

/**
 * Toast variant configuration mapping
 */
export interface ToastVariantType {
  /** Info toast configuration */
  info?: ToastVariantConfig;
  /** Error toast configuration */
  error?: ToastVariantConfig;
  /** Success toast configuration */
  success?: ToastVariantConfig;
  /** Warning toast configuration */
  warning?: ToastVariantConfig;
}

/**
 * Toast ref type for imperative handle
 */
export type ToastRef = {
  showToast: (
    message: string,
    variant?: ToastVariant,
    position?: ToastPosition,
    duration?: number,
    title?: string,
    render?: React.ReactNode,
    swipeable?: boolean,
    allowMultiple?: boolean,
    maxToasts?: number,
    offsetY?: number,
  ) => void;
};

/**
 * Toast provider props
 */
export type ToastProviderProps = {
  /** Child components */
  children: React.ReactNode;
  /** Custom styling variants for different toast types */
  variants?: ToastVariantType;
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
