import { forwardRef } from 'react';

import ToastContainer from './ToastContainer.hybrid';
import { variantConfig } from '../utils/toastConfig';
import { ToastProps, ToastRefProps } from '../types/toast.tw.types';

/**
 * Toast component with native React Native animations
 * Features smooth GPU-accelerated animations and automatic dismissal.
 *
 * @param allowMultiple - If true, multiple toasts can be shown simultaneously (max 4). If false, only one toast at a time.
 * @param maxToasts - Maximum number of toasts to show simultaneously (default: 4)
 * @param swipeable - If true, toasts can be dismissed by swiping (default: false)
 */
const Toast = forwardRef<ToastRefProps, ToastProps>(
  ({ allowMultiple = false, maxToasts = 4, offsetY = 0, swipeable = false, variants = variantConfig }, ref) => (
    <ToastContainer
      ref={ref}
      variants={variants}
      allowMultiple={allowMultiple}
      maxToasts={maxToasts}
      swipeable={swipeable}
      offsetY={offsetY}
    />
  ),
);

Toast.displayName = 'Toast';

export default Toast;
