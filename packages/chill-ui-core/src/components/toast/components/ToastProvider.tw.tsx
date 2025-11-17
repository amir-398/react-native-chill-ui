import { ToastPropsTw, ToastProviderPropsTw } from '@types';
import { createContext, useContext, useRef, useCallback, useMemo, PropsWithChildren } from 'react';

import Toast from './Toast.tw';
import { toastDefaultProps } from '../utils/defaultProps';
import { ToastRefProps, ToastContextPropsType } from '../types/toast.tw.types';

/** Context for providing toast functionality throughout the app */
const ToastContext = createContext<ToastContextPropsType | null>(null);

/**
 * ToastProvider component that provides toast functionality to child components.
 * Wraps the app with toast context and renders the Toast component.
 *
 * @example
 * ```tsx
 * // Basic usage - single toast at a time
 * <ToastProvider>
 *   <App />
 * </ToastProvider>
 * ```
 *
 * @param allowMultiple - Whether to allow multiple toasts simultaneously. If false, only one toast at a time (default: false)
 * @param children - Child components that will have access to toast functionality (required)
 * @param defaultDuration - Default duration in milliseconds for toasts (default: 3000)
 * @param maxToasts - Maximum number of toasts to show simultaneously when allowMultiple is true (default: 4)
 * @param offsetY - Vertical offset in pixels for toast positioning (default: 0)
 * @param swipeable - Whether toasts can be dismissed by swiping up/down (default: false)
 * @param variants - Custom styling variants for different toast types
 * @returns ToastProvider component with context and Toast component
 */
export function ToastProvider({
  allowMultiple = false,
  children,
  defaultDuration = 3000,
  maxToasts = 4,
  offsetY = 0,
  swipeable = false,
  variants,
}: PropsWithChildren<ToastProviderPropsTw>) {
  /** Reference to the Toast component for programmatic control */
  const toastRef = useRef<ToastRefProps>(null);

  /**
   * Toast function that can be called to show notifications
   * @param params - Toast parameters
   * @param params.message - The message to display in the toast
   * @param params.title - Optional title for the toast
   * @param params.variant - Toast variant type (default: 'info')
   * @param params.position - Toast position on screen (default: 'bottom')
   * @param params.duration - Toast display duration in milliseconds
   * @param params.render - Custom render function for toast content
   * @param params.swipeable - Whether the toast can be dismissed by swiping
   * @param params.allowMultiple - Whether to allow multiple toasts simultaneously
   * @param params.maxToasts - Maximum number of toasts when allowMultiple is true
   * @param params.offsetY - Vertical offset for toast positioning
   * @param params.titleStringProps - Props to pass to the title String component
   * @param params.messageStringProps - Props to pass to the message String component
   * @param params.iconProps - Props to pass to the icon component
   */
  const toast = useCallback(
    ({
      allowMultiple: toastAllowMultiple,
      duration,
      iconProps,
      maxToasts: toastMaxToasts,
      message,
      messageStringProps,
      offsetY: toastOffsetY,
      position = toastDefaultProps.position,
      render,
      swipeable: toastSwipeable,
      title,
      titleStringProps,
      variant = toastDefaultProps.variant,
    }: ToastPropsTw) => {
      toastRef.current?.showToast(
        message ?? '',
        variant,
        position,
        duration ?? defaultDuration,
        title,
        render,
        toastSwipeable,
        toastAllowMultiple,
        toastMaxToasts,
        toastOffsetY,
        titleStringProps,
        messageStringProps,
        iconProps,
      );
    },
    [defaultDuration],
  );

  /** Memoized context value to prevent unnecessary re-renders */
  const value = useMemo(() => ({ toast }), [toast]);

  return (
    <ToastContext.Provider value={value}>
      {children}

      <Toast
        ref={toastRef}
        variants={variants}
        allowMultiple={allowMultiple}
        maxToasts={maxToasts}
        swipeable={swipeable}
        offsetY={offsetY}
      />
    </ToastContext.Provider>
  );
}

/**
 * Hook to access toast functionality within components.
 * Must be used within a ToastProvider.
 *
 * @example
 * ```tsx
 * const { toast } = useToast();
 *
 * // Basic toast
 * toast({ message: 'Success!', variant: 'success' });
 * ```
 * @param params.message - The message to display in the toast
 * @param params.title - Optional title for the toast
 * @param params.variant - Toast variant type (default: 'info')
 * @param params.position - Toast position on screen (default: 'bottom')
 * @param params.duration - Toast display duration in milliseconds
 * @param params.render - Custom render function for toast content
 * @param params.swipeable - Whether the toast can be dismissed by swiping
 * @param params.allowMultiple - Whether to allow multiple toasts simultaneously
 * @param params.maxToasts - Maximum number of toasts when allowMultiple is true
 * @param params.offsetY - Vertical offset for toast positioning
 * @param params.titleStringProps - Props to pass to the title String component
 * @param params.messageStringProps - Props to pass to the message String component
 * @param params.iconProps - Props to pass to the icon component
 * @returns Object with toast function for showing notifications
 * @throws Error if used outside of ToastProvider
 */
export const useToast = () => {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error('useToast must be used within a ToastProvider');
  }
  return context;
};
