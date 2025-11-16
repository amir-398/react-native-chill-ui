import {
  IconPropsTw,
  StringPropsTw,
  ToastPositionPropsTw,
  ToastPropsTw as DefaultToastProps,
  ToastVariantPropsTw,
  ToastVariantTypePropsTw,
} from '@types';

/**
 * Toast context type for provider
 */
export type ToastContextPropsType = {
  /** Function to show a toast */
  toast: (options: DefaultToastProps) => void;
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
    titleStringProps?: StringPropsTw,
    messageStringProps?: StringPropsTw,
    iconProps?: IconPropsTw,
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
  swipeable?: boolean;
  onDismiss: () => void;
  toast: DefaultToastProps;
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
