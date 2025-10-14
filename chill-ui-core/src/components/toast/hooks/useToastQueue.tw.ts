import { useState, useCallback, useRef } from 'react';
import { ToastPropsTw, ToastVariantPropsTw, ToastPositionPropsTw, IconPropsTw, StringPropsTw } from '@types';

interface UseToastQueueOptions {
  maxToasts?: number;
  allowMultiple?: boolean;
}

export const useToastQueue = (options: UseToastQueueOptions = {}) => {
  const { allowMultiple = false, maxToasts = 4 } = options;

  const [queue, setQueue] = useState<ToastPropsTw[]>([]);
  const [activeToasts, setActiveToasts] = useState<ToastPropsTw[]>([]);
  const isProcessing = useRef(false);

  const addToQueue = useCallback(
    (
      message: string,
      title?: string,
      render?: React.ReactNode,
      swipeable?: boolean,
      toastAllowMultiple?: boolean,
      toastMaxToasts?: number,
      offsetY?: number,
      titleStringProps?: StringPropsTw,
      messageStringProps?: StringPropsTw,
      iconProps?: IconPropsTw,
      variant: ToastVariantPropsTw = 'info',
      position: ToastPositionPropsTw = 'bottom',
      duration: number = 3000,
    ) => {
      const newToast: ToastPropsTw = {
        allowMultiple: toastAllowMultiple,
        duration,
        iconProps,
        id: `${Date.now()}-${Math.random()}`,
        maxToasts: toastMaxToasts,
        message,
        messageStringProps,
        offsetY,
        position,
        render,
        swipeable,
        title,
        titleStringProps,
        variant,
      };

      const effectiveAllowMultiple = toastAllowMultiple !== undefined ? toastAllowMultiple : allowMultiple;

      if (!effectiveAllowMultiple) {
        if (activeToasts.length > 0 || isProcessing.current) {
          return;
        }
      }

      setQueue(prev => [...prev, newToast]);
    },
    [allowMultiple, activeToasts.length],
  );

  const processQueue = useCallback(() => {
    if (isProcessing.current) return;

    setQueue(prev => {
      if (prev.length === 0) return prev;
      if (activeToasts.length >= maxToasts) return prev;

      const [nextToast, ...rest] = prev;
      isProcessing.current = true;

      setTimeout(() => {
        setActiveToasts(active => [...active, nextToast]);
        isProcessing.current = false;
      }, 0);

      return rest;
    });
  }, [activeToasts.length, maxToasts]);

  const removeToast = useCallback((id: string) => {
    setActiveToasts(prev => prev.filter(toast => toast.id !== id));
  }, []);

  return {
    activeToasts,
    addToQueue,
    processQueue,
    queue,
    removeToast,
  };
};
