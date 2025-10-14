import { ToastPositionPropsTw, ToastPropsTw, ToastVariantPropsTw, ToastVariantTypePropsTw } from '@types';

/**
 * Toast context type for provider
 */
export type ToastContextPropsType = {
  /** Function to show a toast */
  toast: (options: ToastPropsTw) => void;
};

/**
 * Toast ref type for imperative handle
 */
export type ToastRefProps = {
  showToast: (
    message: string,
    variant?: ToastVariantPropsTw,
    position?: ToastPositionPropsTw,
    duration?: number,
    title?: string,
    render?: React.ReactNode,
    swipeable?: boolean,
    allowMultiple?: boolean,
    maxToasts?: number,
    offsetY?: number,
  ) => void;
};

export type ToastContainerProps = {
  offsetY?: number;
  maxToasts?: number;
  swipeable?: boolean;
  allowMultiple?: boolean;
  variants?: ToastVariantTypePropsTw;
};

export type ToastProps = {
  offsetY?: number;
  maxToasts?: number;
  swipeable?: boolean;
  allowMultiple?: boolean;
  variants?: ToastVariantTypePropsTw;
};

export interface ToastItemProps {
  scale: number;
  yOffset: number;
  stackIndex: number;
  toast: ToastPropsTw;
  swipeable?: boolean;
  onDismiss: () => void;
  additionalOffsetY?: number;
  variants?: ToastVariantTypePropsTw;
  safeAreaInsets: { top: number; bottom: number };
}

export interface UseToastSwipeOptionsProps {
  enabled?: boolean;
  threshold?: number;
  onDismiss: () => void;
  position: ToastPositionPropsTw;
}
