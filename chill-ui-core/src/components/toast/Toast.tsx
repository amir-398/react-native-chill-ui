import { cn } from '@utils';
import { tv } from 'tailwind-variants';
// eslint-disable-next-line
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Dimensions } from 'react-native';
// eslint-disable-next-line
import Animated, { runOnJS, useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated';
import { forwardRef, useCallback, useImperativeHandle, useState } from 'react';

import Icon from '../icon';
import { Box } from '../box';
import { String } from '../string';
import { ToastVariantType } from '../../types/toast.types';

type ToastVariant = 'success' | 'error' | 'info' | 'warning';
type ToastPosition = 'top' | 'bottom';

/**
 * Reference type for Toast component with showToast method
 */
export type ToastRef = {
  showToast: (message: string, variant?: ToastVariant, position?: ToastPosition, duration?: number) => void;
};

/** Default position variants for toast styling */
const defaultToastVariant = tv({
  variants: {
    position: {
      bottom: 'bottom-0',
      top: 'top-3',
    },
  },
});

/** Default styling variants for different toast types */
const defaultVariants: ToastVariantType = {
  error: {
    backgroundColor: '#F44336',
    contentColor: '#FFFFFF',
    icon: 'xmark-circle-solid',
    titleColor: '#FFFFFF',
  },
  info: {
    backgroundColor: '#2196F3',
    contentColor: '#FFFFFF',
    icon: 'circle-info-solid',
    titleColor: '#FFFFFF',
  },
  success: {
    backgroundColor: '#4CAF50',
    contentColor: '#FFFFFF',
    icon: 'check-circle-solid',
    titleColor: '#FFFFFF',
  },
  warning: {
    backgroundColor: '#FF9800',
    contentColor: '#FFFFFF',
    icon: 'warning-solid',
    titleColor: '#FFFFFF',
  },
};

interface ToastProps {
  // eslint-disable-next-line
  variants?: ToastVariantType;
}

/**
 * Toast component that provides animated notification messages with progress bar.
 * Features smooth animations, customizable styling, and automatic dismissal.
 *
 * @example
 * ```tsx
 * // Basic toast usage
 * const toastRef = useRef<ToastRef>(null);
 *
 * // Show success toast
 * toastRef.current?.showToast('Operation completed successfully!', 'success');
 *
 * // Show error toast with custom duration
 * toastRef.current?.showToast('Something went wrong!', 'error', 'top', 5000);
 *
 * // Customized toast
 * <Toast
 *   ref={toastRef}
 *   variants={{
 *     success: {
 *       backgroundColor: '#10B981',
 *       icon: 'check-circle-solid',
 *       titleColor: '#FFFFFF',
 *       contentColor: '#FFFFFF',
 *     }
 *   }}
 * />
 * ```
 *
 * @param variants - Custom styling variants for different toast types
 * @param ref - Forwarded ref with showToast method
 * @returns Toast component with animated notifications
 */
const Toast = forwardRef<ToastRef, ToastProps>((props, ref) => {
  const { variants = defaultVariants } = props;
  const insets = useSafeAreaInsets();

  /** Visibility state of the toast */
  const [isVisible, setIsVisible] = useState(false);

  /** Current message to display */
  const [message, setMessage] = useState('');

  /** Current variant type (success, error, info, warning) */
  const [variant, setVariant] = useState<ToastVariant>('success');

  /** Current position of the toast (top or bottom) */
  const [toastPosition, setToastPosition] = useState<ToastPosition>('bottom');

  const screenWidth = Dimensions.get('window').width;

  /** Shared animated value for vertical translation */
  const translateY = useSharedValue(0);

  /** Shared animated value for progress bar translation */
  const progressBarX = useSharedValue(0);

  /** Shared animated value to block multiple toasts */
  const isInteractionBlocked = useSharedValue(false);

  /**
   * Hide the toast and reset the progress bar.
   * @param position - Position of the toast for proper animation direction
   */
  const hideToast = useCallback(
    (position: ToastPosition) => {
      // Animation de disparition
      translateY.value = withTiming(position === 'top' ? -100 : 100, {
        duration: 500,
      });

      // To avoid displaying the reset animation of the bar
      // while the toast is still on the screen,
      // we reset it after the disappearance of the toast.
      setTimeout(() => {
        setIsVisible(false);
        isInteractionBlocked.value = false;
        progressBarX.value = 0; // the bar returns to 100 %
      }, 500);
    },
    [translateY, progressBarX, isInteractionBlocked],
  );

  /**
   * Display the toast with specified parameters
   * @param msg - Message to display
   * @param variantType - Type of toast (success, error, info, warning)
   * @param position - Position of toast (top or bottom)
   * @param duration - Duration in milliseconds before auto-dismiss
   */
  const showToast = useCallback(
    (msg: string, variantType: ToastVariant = 'info', position: ToastPosition = 'bottom', duration: number = 3000) => {
      if (isInteractionBlocked.value) return; // Block if toast is visible

      // Position the toast outside the screen at the beginning
      translateY.value = position === 'top' ? -300 : 300;

      // Mise à jour du state
      setMessage(msg);
      setVariant(variantType);
      setToastPosition(position);
      setIsVisible(true);
      isInteractionBlocked.value = true;

      // Faire apparaître le toast
      translateY.value = withTiming(0, {
        duration: 500,
      });

      // launch progress bar animation
      // use callback to hide toast once animation is finished
      progressBarX.value = withTiming(-screenWidth, { duration }, finished => {
        // runOnJS to execute JS code outside the UI Thread
        if (finished) {
          runOnJS(hideToast)(position);
        }
      });
    },
    [screenWidth, hideToast, translateY, progressBarX, isInteractionBlocked],
  );

  /** Expose showToast method through ref */
  useImperativeHandle(ref, () => ({
    showToast,
  }));

  /** Animated style for toast translation */
  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ translateY: translateY.value }],
  }));

  /** Animated style for progress bar */
  const progressBarStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: progressBarX.value }],
  }));

  if (!isVisible) return null;

  /**
   * Get the title for the current variant
   * @returns Title string for the toast
   */
  const toastTitle = () => {
    if (variant === 'success') return 'Succès !';
    if (variant === 'error') return 'Erreur !';
    if (variant === 'info') return 'Information !';
    return 'Information !';
  };

  /**
   * Get the icon name for the current variant
   * @returns Icon name string
   */
  const toastIcon = () => {
    if (variant === 'success') return variants?.success?.icon || 'check-circle-solid';
    if (variant === 'error') return variants?.error?.icon || 'xmark-circle-solid';
    if (variant === 'info') return variants?.info?.icon || 'circle-info-solid';

    return variants?.warning?.icon || 'warning-solid';
  };

  /**
   * Get background color for the current variant
   * @returns Background color string
   */
  const getBackgroundColor = () => {
    if (variant === 'success') return variants?.success?.backgroundColor || '#4CAF50';
    if (variant === 'error') return variants?.error?.backgroundColor || '#F44336';
    if (variant === 'info') return variants?.info?.backgroundColor || '#2196F3';
    return variants?.warning?.backgroundColor || '#FF9800';
  };

  /**
   * Get title color for the current variant
   * @returns Title color string
   */
  const getTitleColor = () => {
    if (variant === 'success') return variants?.success?.titleColor || '#fff';
    if (variant === 'error') return variants?.error?.titleColor || '#fff';
    if (variant === 'info') return variants?.info?.titleColor || '#fff';
    return variants?.warning?.titleColor || '#fff';
  };

  /**
   * Get content color for the current variant
   * @returns Content color string
   */
  const getContentColor = () => {
    if (variant === 'success') return variants?.success?.contentColor || '#fff';
    if (variant === 'error') return variants?.error?.contentColor || '#fff';
    if (variant === 'info') return variants?.info?.contentColor || '#fff';
    return variants?.warning?.contentColor || '#fff';
  };

  /**
   * Get progress bar color for the current variant
   * @returns Progress bar color string
   */
  const getProgressBarColor = () => {
    if (variant === 'success') return variants?.success?.progressBarColor || '#FFFFFF';
    if (variant === 'error') return variants?.error?.progressBarColor || '#FFFFFF';
    if (variant === 'info') return variants?.info?.progressBarColor || '#FFFFFF';
    return variants?.warning?.progressBarColor || '#FFFFFF';
  };

  return (
    <Animated.View
      className={cn(
        'absolute left-5 right-5 z-50 flex-row items-center gap-2 overflow-hidden rounded-lg p-3',
        defaultToastVariant({ position: toastPosition }),
      )}
      style={[
        animatedStyle,
        { backgroundColor: getBackgroundColor() },
        toastPosition === 'bottom' && {
          bottom: insets.bottom + 10,
        },
        toastPosition === 'top' && {
          top: insets.top + 10,
        },
      ]}
    >
      {variants?.[variant]?.customIcon || <Icon name={toastIcon()} size="md" color={getTitleColor()} />}
      <Box className="flex-1">
        <String style={{ color: getTitleColor() }}>{toastTitle()}</String>
        <String size="sm" style={{ color: getContentColor() }}>
          {message}
        </String>
      </Box>

      <Animated.View
        className="absolute bottom-0 left-0 h-1 rounded-lg"
        style={[progressBarStyle, { backgroundColor: getProgressBarColor(), width: screenWidth }]}
      />
    </Animated.View>
  );
});

Toast.displayName = 'Toast';

(Toast as any).defaultProps = {
  variants: defaultVariants,
};

export default Toast;
