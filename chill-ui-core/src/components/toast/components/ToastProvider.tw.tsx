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
 *
 * // Allow multiple toasts (max 4)
 * <ToastProvider allowMultiple maxToasts={4}>
 *   <App />
 * </ToastProvider>
 *
 * // Enable swipe to dismiss
 * <ToastProvider swipeable>
 *   <App />
 * </ToastProvider>
 *
 * // With custom variants and duration
 * <ToastProvider
 *   defaultDuration={5000}
 *   allowMultiple={true}
 *   variants={{
 *     success: {
 *       backgroundColor: '#10B981',
 *       icon: 'check-circle-solid',
 *       titleColor: '#FFFFFF',
 *       contentColor: '#FFFFFF',
 *     }
 *   }}
 * >
 *   <App />
 * </ToastProvider>
 * ```
 *
 * @param children - Child components that will have access to toast functionality
 * @param defaultDuration - Default duration in milliseconds for toasts (default: 3000)
 * @param variants - Custom styling variants for different toast types
 * @param allowMultiple - If true, multiple toasts can be shown simultaneously. If false, only one toast at a time (default: false)
 * @param maxToasts - Maximum number of toasts to show simultaneously when allowMultiple is true (default: 4)
 * @param swipeable - If true, toasts can be dismissed by swiping up/down (default: false)
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
   * @param params - Toast parameters including message, variant, position, and duration
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
        message,
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
 * // Show different types of toasts
 * toast({ message: 'Success!', variant: 'success' });
 * toast({ message: 'Error occurred!', variant: 'error', position: 'top' });
 * toast({ message: 'Info message', variant: 'info', duration: 5000 });
 * ```
 *
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
