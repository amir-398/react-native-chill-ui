import { forwardRef, useImperativeHandle, useEffect } from 'react';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import ToastItem from './ToastItem.ss';
import { variantConfig } from '../utils/toastConfig.ss';
import { useToastQueue } from '../hooks/useToastQueue.ss';
import { ToastContainerProps, ToastRefProps } from '../types/toast.ss.types';

/**
 * ToastContainer component that manages a queue of toasts
 * Supports single or multiple toasts with customizable behavior
 */
const ToastContainer = forwardRef<ToastRefProps, ToastContainerProps>(
  ({ allowMultiple = false, maxToasts = 4, offsetY = 0, swipeable = false, variants = variantConfig }, ref) => {
    const { activeToasts, addToQueue, processQueue, queue, removeToast } = useToastQueue({
      allowMultiple,
      maxToasts,
    });
    const { bottom, top } = useSafeAreaInsets();

    // Process queue when it changes or when a toast is removed
    useEffect(() => {
      if (queue.length > 0 && activeToasts.length < maxToasts) {
        processQueue();
      }
    }, [queue.length, activeToasts.length, maxToasts, processQueue]);

    useImperativeHandle(
      ref,
      () => ({
        showToast: (
          message,
          variant,
          position,
          duration,
          title,
          render,
          toastSwipeable,
          toastAllowMultiple,
          toastMaxToasts,
          toastOffsetY,
          titleStringProps,
          messageStringProps,
          iconProps,
        ) => {
          addToQueue(
            message,
            title,
            render,
            toastSwipeable,
            toastAllowMultiple,
            toastMaxToasts,
            toastOffsetY,
            titleStringProps,
            messageStringProps,
            iconProps,
            variant,
            position,
            duration,
          );
        },
      }),
      [addToQueue],
    );

    return (
      <>
        {activeToasts.map((toast, index) => {
          // Use toast-specific swipeable if provided, otherwise use global setting
          const effectiveSwipeable = toast.swipeable !== undefined ? toast.swipeable : swipeable;

          // Use toast-specific offsetY if provided, otherwise use global setting
          const effectiveOffsetY = toast.offsetY !== undefined ? toast.offsetY : offsetY;

          // Calculate stacking effect: each toast behind is slightly scaled down and offset
          const stackIndex = activeToasts.length - 1 - index;
          const scale = 1 - stackIndex * 0.05; // Each toast behind is 5% smaller
          const yOffset = stackIndex * -8; // Vertical offset of 8px

          return (
            <ToastItem
              key={toast.id}
              toast={toast}
              variants={variants}
              onDismiss={() => removeToast(toast.id || '')}
              stackIndex={stackIndex}
              scale={scale}
              yOffset={yOffset}
              additionalOffsetY={effectiveOffsetY}
              safeAreaInsets={{ bottom, top }}
              swipeable={effectiveSwipeable}
            />
          );
        })}
      </>
    );
  },
);

ToastContainer.displayName = 'ToastContainer';

export default ToastContainer;
