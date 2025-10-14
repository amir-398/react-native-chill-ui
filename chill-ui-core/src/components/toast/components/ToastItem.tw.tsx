import { cn } from '@utils';
import { BoxTw } from '@components/box';
import { Animated } from 'react-native';
import { IconTw } from '@components/icon';
import { useEffect, useMemo } from 'react';
import { StringTw } from '@components/string';
import { AnimatedBoxTw } from '@components/animatedBox';

import type { ToastItemProps } from '../types';

import { useToast, useToastSwipe } from '../hooks';
import { twStyles } from '../styles/Toast.tw.styles';
import { variantConfig, variantTitles, PROGRESS_BAR_HEIGHT } from '../utils';

/**
 * ToastItem component representing a single toast
 */
function ToastItem({
  additionalOffsetY = 0,
  onDismiss,
  safeAreaInsets,
  scale,
  stackIndex,
  swipeable = false,
  toast,
  variants = variantConfig,
  yOffset,
}: ToastItemProps) {
  const {
    config,
    customRender,
    isVisible,
    message,
    opacityAnim,
    progressWidthAnim,
    scaleAnim,
    showToast,
    title,
    toastPosition,
    translateYAnim,
  } = useToast(variants);

  const { bottom, top } = safeAreaInsets;

  const { panResponder, swipeY } = useToastSwipe({
    enabled: swipeable,
    onDismiss,
    position: toast.position || 'bottom',
    threshold: 50,
  });

  // Trigger toast animation
  useEffect(() => {
    showToast(
      toast.message,
      toast.title || variantTitles[toast.variant || 'success'],
      toast.render,
      toast.variant,
      toast.position,
      toast.duration,
    );
  }, [toast, showToast]);

  useEffect(() => {
    if (!isVisible) {
      const timer = setTimeout(() => {
        onDismiss();
      }, 100);
      return () => clearTimeout(timer);
    }
    return undefined;
  }, [isVisible, onDismiss]);

  const positionStyle = useMemo(() => {
    const baseStyle = {
      ...(toastPosition === 'top' && { top: top + yOffset + additionalOffsetY }),
      ...(toastPosition === 'bottom' && { bottom: bottom + yOffset + additionalOffsetY }),
      zIndex: 1000 - stackIndex,
    };
    return baseStyle;
  }, [toastPosition, top, bottom, yOffset, stackIndex, additionalOffsetY]);

  const stackOpacity = 1 - stackIndex * 0.15;

  if (!isVisible) return null;

  return (
    <AnimatedBoxTw
      {...(swipeable ? panResponder.panHandlers : {})}
      style={[
        {
          opacity: Animated.multiply(opacityAnim, stackOpacity),
          transform: [
            { translateY: Animated.add(translateYAnim, swipeY) },
            { scale: Animated.multiply(scaleAnim, scale) },
          ],
          ...positionStyle,
        },
      ]}
      className={cn(twStyles.container, !customRender && twStyles.containerWithPadding)}
      pointerEvents={swipeable && stackIndex === 0 ? 'auto' : 'none'}
    >
      {!customRender && <BoxTw style={{ backgroundColor: config.backgroundColor }} className={twStyles.background} />}

      {customRender ? (
        <BoxTw className={twStyles.customContent}>{customRender}</BoxTw>
      ) : (
        <BoxTw className={twStyles.contentRow}>
          {config.customIcon || (
            <IconTw name={config.icon} size="lg" color={config.titleColor} className={twStyles.icon} />
          )}

          <BoxTw className={twStyles.textContainer}>
            <StringTw style={{ color: config.titleColor }} className={twStyles.title}>
              {title}
            </StringTw>
            <StringTw size="sm" style={{ color: config.contentColor }} className={twStyles.message}>
              {message}
            </StringTw>
          </BoxTw>
        </BoxTw>
      )}

      {!customRender && (
        <AnimatedBoxTw
          style={[
            {
              backgroundColor: config.progressBarColor,
              height: PROGRESS_BAR_HEIGHT,
              width: progressWidthAnim,
            },
          ]}
          className={cn(twStyles.progressBar, twStyles.progressBarHeight)}
        />
      )}
    </AnimatedBoxTw>
  );
}

ToastItem.displayName = 'ToastItem';

export default ToastItem;
