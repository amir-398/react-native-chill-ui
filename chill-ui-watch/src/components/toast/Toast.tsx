import { tv } from 'tailwind-variants';
import { Dimensions } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { forwardRef, useCallback, useImperativeHandle, useState } from 'react';
import Animated, { runOnJS, useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated';

import cn from '../cn';
import Icon from '../icon';
import { Box } from '../box';
import String from '../string';
import { ToastVariantType } from '../../types';

type ToastVariant = 'success' | 'error' | 'info' | 'warning';
type ToastPosition = 'top' | 'bottom';
export type ToastRef = {
  showToast: (message: string, variant?: ToastVariant, position?: ToastPosition, duration?: number) => void;
};

const defaultToastVariant = tv({
  variants: {
    position: {
      bottom: 'bottom-0',
      top: 'top-3',
    },
  },
});

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

const Toast = forwardRef<ToastRef, ToastProps>((props, ref) => {
  const { variants = defaultVariants } = props;
  const insets = useSafeAreaInsets();
  const [isVisible, setIsVisible] = useState(false);
  const [message, setMessage] = useState('');
  const [variant, setVariant] = useState<ToastVariant>('success');
  const [toastPosition, setToastPosition] = useState<ToastPosition>('bottom');

  const screenWidth = Dimensions.get('window').width;
  const translateY = useSharedValue(0);
  const progressBarX = useSharedValue(0);
  const isInteractionBlocked = useSharedValue(false);

  /**
   * Hide the toast and reset the progress bar.
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
   * Affiche le toast
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

  useImperativeHandle(ref, () => ({
    showToast,
  }));

  // Style animé pour la translation du toast
  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ translateY: translateY.value }],
  }));

  // progress bar animation
  const progressBarStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: progressBarX.value }],
  }));

  if (!isVisible) return null;

  const toastTitle = () => {
    if (variant === 'success') return 'Succès !';
    if (variant === 'error') return 'Erreur !';
    if (variant === 'info') return 'Information !';
    return 'Information !';
  };

  const toastIcon = () => {
    if (variant === 'success') return variants?.success?.icon || 'check-circle-solid';
    if (variant === 'error') return variants?.error?.icon || 'xmark-circle-solid';
    if (variant === 'info') return variants?.info?.icon || 'circle-info-solid';

    return variants?.warning?.icon || 'warning-solid';
  };

  const getBackgroundColor = () => {
    if (variant === 'success') return variants?.success?.backgroundColor || '#4CAF50';
    if (variant === 'error') return variants?.error?.backgroundColor || '#F44336';
    if (variant === 'info') return variants?.info?.backgroundColor || '#2196F3';
    return variants?.warning?.backgroundColor || '#FF9800';
  };

  const getTitleColor = () => {
    if (variant === 'success') return variants?.success?.titleColor || '#fff';
    if (variant === 'error') return variants?.error?.titleColor || '#fff';
    if (variant === 'info') return variants?.info?.titleColor || '#fff';
    return variants?.warning?.titleColor || '#fff';
  };

  const getContentColor = () => {
    if (variant === 'success') return variants?.success?.contentColor || '#fff';
    if (variant === 'error') return variants?.error?.contentColor || '#fff';
    if (variant === 'info') return variants?.info?.contentColor || '#fff';
    return variants?.warning?.contentColor || '#fff';
  };

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
        <String weight="bold" style={{ color: getTitleColor() }}>
          {toastTitle()}
        </String>
        <String size="sm" weight="semiBold" style={{ color: getContentColor() }}>
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
