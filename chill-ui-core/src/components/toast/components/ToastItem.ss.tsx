import { styleHandler } from '@utils';
import { BoxSs } from '@components/box';
import { Animated } from 'react-native';
import { IconSs } from '@components/icon';
import { useEffect, useMemo } from 'react';
import { StringSs } from '@components/string';
import { AnimatedBoxSs } from '@components/animatedBox';

import type { ToastItemProps } from '../types/toast.ss.types';

import { useToast, useToastSwipe } from '../hooks';
import { styles } from '../styles/Toast.ss.styles';
import { toastDefaultProps } from '../utils/defaultProps';
import { variantConfig, variantTitles, PROGRESS_BAR_HEIGHT } from '../utils/toastConfig.ss';

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

  const customRender = toast.render;

  const { bottom, top } = safeAreaInsets;

  const { panResponder, swipeY } = useToastSwipe({
    enabled: swipeable,
    onDismiss,
    position: toast.position || toastDefaultProps.position,
    threshold: 50,
  });

  // Trigger toast animation
  useEffect(() => {
    showToast(
      toast.message,
      toast.title || variantTitles[toast.variant || toastDefaultProps.variant],
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
    <AnimatedBoxSs
      {...(swipeable ? panResponder.panHandlers : {})}
      {...styleHandler({
        defaultStyle: [styles.container, !(customRender || config.render) && styles.containerWithPadding],
        style: [
          {
            opacity: Animated.multiply(opacityAnim, stackOpacity),
            transform: [
              { translateY: Animated.add(translateYAnim, swipeY) },
              { scale: Animated.multiply(scaleAnim, scale) },
            ],
            ...positionStyle,
          },
          styles.container,
          !(customRender || config.render) && styles.containerWithPadding,
        ],
      })}
      pointerEvents={swipeable && stackIndex === 0 ? 'auto' : 'none'}
    >
      {!(customRender || config.render) && <BoxSs style={[config.style, styles.background]} />}

      {customRender || config.render ? (
        <BoxSs style={styles.customContent}>{customRender || config.render}</BoxSs>
      ) : (
        <BoxSs style={styles.contentRow}>
          {config.customIcon || <IconSs {...config.iconProps} {...toast.iconProps} size="lg" style={styles.icon} />}

          <BoxSs style={styles.textContainer}>
            <StringSs {...config.titleStringProps} {...toast.titleStringProps}>
              {title}
            </StringSs>
            <StringSs size="sm" {...config.messageStringProps} {...toast.messageStringProps}>
              {message}
            </StringSs>
          </BoxSs>
        </BoxSs>
      )}

      {!(customRender || config.render) && (
        <AnimatedBoxSs
          style={[
            {
              backgroundColor: config.progressBarColor,
              height: PROGRESS_BAR_HEIGHT,
              width: progressWidthAnim,
            },
            styles.progressBar,
            styles.progressBarHeight,
          ]}
        />
      )}
    </AnimatedBoxSs>
  );
}

ToastItem.displayName = 'ToastItem';

export default ToastItem;
