import type { TIcons } from '../constants/ICONS';

export interface ToastVariantType {
  info?: {
    backgroundColor?: string;
    icon?: keyof TIcons;
    customIcon?: React.ReactNode;
    titleColor?: string;
    contentColor?: string;
    progressBarColor?: string;
  };
  error?: {
    backgroundColor?: string;
    icon?: keyof TIcons;
    customIcon?: React.ReactNode;
    titleColor?: string;
    contentColor?: string;
    progressBarColor?: string;
  };
  success?: {
    backgroundColor?: string;
    icon?: keyof TIcons;
    customIcon?: React.ReactNode;
    titleColor?: string;
    contentColor?: string;
    progressBarColor?: string;
  };
  warning?: {
    backgroundColor?: string;
    icon?: keyof TIcons;
    customIcon?: React.ReactNode;
    titleColor?: string;
    contentColor?: string;
    progressBarColor?: string;
  };
}

export type ToastProps = {
  variant?: 'info' | 'success' | 'error' | 'warning';
  message: string;
  position?: 'top' | 'bottom';
  duration?: number;
};

export type ToastContextType = {
  toast: (options: {
    variant?: 'info' | 'success' | 'error' | 'warning';
    message: string;
    position?: 'top' | 'bottom';
    duration?: number;
  }) => void;
};
