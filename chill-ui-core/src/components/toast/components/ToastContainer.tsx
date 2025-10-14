import { forwardRef, useImperativeHandle, useEffect } from 'react';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import ToastItem from './ToastItem';
import { variantConfig } from '../utils/toastConfig.tw';
import { useToastQueue } from '../hooks/useToastQueue.tw';
import { toastDefaultProps } from '../utils/defaultProps';
import { ToastContainerProps, ToastRefProps } from '../types/toast.tw.types';

/**
 * ToastContainer component that manages a queue of toasts
 * Supports single or multiple toasts with customizable behavior
 */
const ToastContainer = forwardRef<ToastRefProps, ToastContainerProps>(
  (
    {
      allowMultiple = toastDefaultProps.allowMultiple,
      maxToasts = toastDefaultProps.maxToasts,
      offsetY = toastDefaultProps.offsetY,
      swipeable = toastDefaultProps.swipeable,
      variants = variantConfig,
    },
    ref,
  ) => {
    const { activeToasts, addToQueue, processQueue, queue, removeToast } = useToastQueue({
      allowMultiple,
      maxToasts,
    });
    const { bottom, top } = useSafeAreaInsets();

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
          const scale = 1 - stackIndex * 0.05; // Chaque toast derrière est 5% plus petit
          const yOffset = stackIndex * -8; // Décalage vertical de 8px

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
