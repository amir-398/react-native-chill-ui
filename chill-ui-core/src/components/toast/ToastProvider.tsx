import { createContext, useContext, useRef, useCallback, useMemo } from 'react';

import Toast, { ToastRef } from './Toast';
import { ToastContextType, ToastProps, ToastVariantType } from '../../types/toast.types';

/** Context for providing toast functionality throughout the app */
const ToastContext = createContext<ToastContextType | null>(null);

/**
 * ToastProvider component that provides toast functionality to child components.
 * Wraps the app with toast context and renders the Toast component.
 *
 * @example
 * ```tsx
 * // Basic usage
 * <ToastProvider>
 *   <App />
 * </ToastProvider>
 *
 * // With custom variants and duration
 * <ToastProvider
 *   defaultDuration={5000}
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
 * @returns ToastProvider component with context and Toast component
 */
export function ToastProvider({
  children,
  defaultDuration = 3000,
  variants,
}: {
  children: React.ReactNode;
  variants?: ToastVariantType;
  defaultDuration?: number;
}) {
  /** Reference to the Toast component for programmatic control */
  const toastRef = useRef<ToastRef>(null);

  /**
   * Toast function that can be called to show notifications
   * @param params - Toast parameters including message, variant, position, and duration
   */
  const toast = useCallback(
    ({ duration, message, position = 'bottom', variant = 'info' }: ToastProps) => {
      toastRef.current?.showToast(message, variant, position, duration ?? defaultDuration);
    },
    [defaultDuration],
  );

  /** Memoized context value to prevent unnecessary re-renders */
  const value = useMemo(() => ({ toast }), [toast]);

  return (
    <ToastContext.Provider value={value}>
      {children}

      <Toast ref={toastRef} variants={variants} />
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
