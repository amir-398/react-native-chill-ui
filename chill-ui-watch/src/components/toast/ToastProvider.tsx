import { createContext, useContext, useRef, useCallback, useMemo } from 'react';

import Toast, { ToastRef } from './Toast';
import { ToastContextType, ToastProps, ToastVariantType } from '../../types';

const ToastContext = createContext<ToastContextType | null>(null);

export function ToastProvider({
  children,
  defaultDuration = 3000,
  variants,
}: {
  children: React.ReactNode;
  variants?: ToastVariantType;
  defaultDuration?: number;
}) {
  const toastRef = useRef<ToastRef>(null);

  const toast = useCallback(
    ({ duration, message, position = 'bottom', variant = 'info' }: ToastProps) => {
      toastRef.current?.showToast(message, variant, position, duration ?? defaultDuration);
    },
    [defaultDuration],
  );

  const value = useMemo(() => ({ toast }), [toast]);

  return (
    <ToastContext.Provider value={value}>
      {children}

      <Toast ref={toastRef} variants={variants} />
    </ToastContext.Provider>
  );
}

export const useToast = () => {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error('useToast must be used within a ToastProvider');
  }
  return context;
};
