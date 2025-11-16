import { Box } from '@components/box';
import { Animated } from 'react-native';
import { Icon } from '@components/icon';
import { useEffect, useMemo } from 'react';
import { String } from '@components/string';
import { AnimatedBox } from '@components/animatedBox';
import { classNameHandler, classNamePropsHandler, cn, styleHandler } from '@utils';

import type { ToastItemProps } from '../types/toast.tw.types';

import { useToast, useToastSwipe } from '../hooks';
import { styles } from '../styles/Toast.ss.styles';
import { twStyles } from '../styles/Toast.tw.styles';
import { toastDefaultProps } from '../utils/defaultProps';
import { PROGRESS_BAR_HEIGHT } from '../utils/toastConfig';

/**
 * ToastItem component representing a single toast
 */
function ToastItem(props: ToastItemProps) {
  classNamePropsHandler(props, 'ToastItem');
  const {
    additionalOffsetY = 0,
    onDismiss,
    safeAreaInsets,
    scale,
    stackIndex,
    swipeable = toastDefaultProps.swipeable,
    toast,
    variants,
    yOffset,
  } = props;

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
    showToast(toast.message ?? '', toast.title, toast.render, toast.variant, toast.position, toast.duration);
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
    <AnimatedBox
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
        ],
      })}
      {...classNameHandler(cn(twStyles.container, !(customRender || config.render) && twStyles.containerWithPadding))}
      pointerEvents={swipeable && stackIndex === 0 ? 'auto' : 'none'}
    >
      {!(customRender || config.render) && (
        <Box
          {...styleHandler({ defaultStyle: styles.background, style: config.style })}
          {...classNameHandler(cn(twStyles.background, config.className))}
        />
      )}

      {customRender || config.render ? (
        <Box {...classNameHandler(twStyles.customContent)} {...styleHandler({ defaultStyle: styles.customContent })}>
          {customRender || config.render}
        </Box>
      ) : (
        <Box {...classNameHandler(twStyles.contentRow)} {...styleHandler({ defaultStyle: styles.contentRow })}>
          {config.customIcon || (
            <Icon
              {...config.iconProps}
              {...toast.iconProps}
              size="lg"
              {...classNameHandler(twStyles.icon)}
              {...styleHandler({ defaultStyle: styles.icon })}
            />
          )}

          <Box {...classNameHandler(twStyles.textContainer)} {...styleHandler({ defaultStyle: styles.textContainer })}>
            {title && (
              <String {...config.titleStringProps} {...toast.titleStringProps}>
                {title}
              </String>
            )}
            {message && (
              <String size="sm" {...config.messageStringProps} {...toast.messageStringProps}>
                {message}
              </String>
            )}
          </Box>
        </Box>
      )}

      {!(customRender || config.render) && (
        <AnimatedBox
          {...classNameHandler(cn(twStyles.progressBar, twStyles.progressBarHeight))}
          {...styleHandler({
            defaultStyle: [styles.progressBar, styles.progressBarHeight],
            style: {
              backgroundColor: config.progressBarColor,
              height: PROGRESS_BAR_HEIGHT,
              width: progressWidthAnim,
            },
          })}
        />
      )}
    </AnimatedBox>
  );
}

ToastItem.displayName = 'ToastItem';

export default ToastItem;
