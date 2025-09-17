import type { TIcons } from '../constants/ICONS';

/**
 * Toast variant configuration type
 */
export interface ToastVariantType {
  /** Info toast configuration */
  info?: {
    /** Background color for info toast */
    backgroundColor?: string;
    /** Icon name for info toast */
    icon?: keyof TIcons;
    /** Custom icon component for info toast */
    customIcon?: React.ReactNode;
    /** Title text color for info toast */
    titleColor?: string;
    /** Content text color for info toast */
    contentColor?: string;
    /** Progress bar color for info toast */
    progressBarColor?: string;
  };
  /** Error toast configuration */
  error?: {
    /** Background color for error toast */
    backgroundColor?: string;
    /** Icon name for error toast */
    icon?: keyof TIcons;
    /** Custom icon component for error toast */
    customIcon?: React.ReactNode;
    /** Title text color for error toast */
    titleColor?: string;
    /** Content text color for error toast */
    contentColor?: string;
    /** Progress bar color for error toast */
    progressBarColor?: string;
  };
  /** Success toast configuration */
  success?: {
    /** Background color for success toast */
    backgroundColor?: string;
    /** Icon name for success toast */
    icon?: keyof TIcons;
    /** Custom icon component for success toast */
    customIcon?: React.ReactNode;
    /** Title text color for success toast */
    titleColor?: string;
    /** Content text color for success toast */
    contentColor?: string;
    /** Progress bar color for success toast */
    progressBarColor?: string;
  };
  /** Warning toast configuration */
  warning?: {
    /** Background color for warning toast */
    backgroundColor?: string;
    /** Icon name for warning toast */
    icon?: keyof TIcons;
    /** Custom icon component for warning toast */
    customIcon?: React.ReactNode;
    /** Title text color for warning toast */
    titleColor?: string;
    /** Content text color for warning toast */
    contentColor?: string;
    /** Progress bar color for warning toast */
    progressBarColor?: string;
  };
}

/**
 * Props for the Toast component
 */
export type ToastProps = {
  /** Toast variant type */
  variant?: 'info' | 'success' | 'error' | 'warning';
  /** Toast message content */
  message: string;
  /** Position of the toast */
  position?: 'top' | 'bottom';
  /** Duration in milliseconds */
  duration?: number;
};

/**
 * Toast context type for provider
 */
export type ToastContextType = {
  /** Function to show a toast */
  toast: (options: {
    /** Toast variant type */
    variant?: 'info' | 'success' | 'error' | 'warning';
    /** Toast message content */
    message: string;
    /** Position of the toast */
    position?: 'top' | 'bottom';
    /** Duration in milliseconds */
    duration?: number;
  }) => void;
};
