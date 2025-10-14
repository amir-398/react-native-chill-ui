import {
  IconPropsSs,
  StringPropsSs,
  ToastPositionPropsSs,
  ToastPropsSs,
  ToastVariantPropsSs,
  ToastVariantTypePropsSs,
} from '@types';

/**
 * Toast context type for provider
 */
export type ToastContextPropsType = {
  /** Function to show a toast */
  toast: (options: ToastPropsSs) => void;
};

/**
 * Toast ref type for imperative handle
 */
export type ToastRefProps = {
  showToast: (
    message: string,
    variant?: ToastVariantPropsSs,
    position?: ToastPositionPropsSs,
    duration?: number,
    title?: string,
    render?: React.ReactNode,
    swipeable?: boolean,
    allowMultiple?: boolean,
    maxToasts?: number,
    offsetY?: number,
    titleStringProps?: StringPropsSs,
    messageStringProps?: StringPropsSs,
    iconProps?: IconPropsSs,
  ) => void;
};

export type ToastContainerProps = {
  offsetY?: number;
  maxToasts?: number;
  swipeable?: boolean;
  allowMultiple?: boolean;
  variants?: ToastVariantTypePropsSs;
};

export type ToastProps = {
  offsetY?: number;
  maxToasts?: number;
  swipeable?: boolean;
  allowMultiple?: boolean;
  variants?: ToastVariantTypePropsSs;
};

export interface ToastItemProps {
  scale: number;
  yOffset: number;
  stackIndex: number;
  toast: ToastPropsSs;
  swipeable?: boolean;
  onDismiss: () => void;
  additionalOffsetY?: number;
  variants?: ToastVariantTypePropsSs;
  safeAreaInsets: { top: number; bottom: number };
}

export interface UseToastSwipeOptionsProps {
  enabled?: boolean;
  threshold?: number;
  onDismiss: () => void;
  position: ToastPositionPropsSs;
}
