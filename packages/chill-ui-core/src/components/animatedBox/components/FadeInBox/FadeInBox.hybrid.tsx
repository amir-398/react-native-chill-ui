import type { FadeInBoxPropsTw, FadeInBoxRefTw } from '@types';

import { Animated } from 'react-native';
import { classNameHandler, classNamePropsHandler } from '@utils';
import { useRef, useEffect, useImperativeHandle, forwardRef, useCallback, PropsWithChildren } from 'react';

import { AnimatedBox } from '../animatedBox/AnimatedBox.hybrid';

/**
 * The `<FadeInBox />` component creates a smooth fade-in animation for its children.
 *
 * <!-- STORYBOOK_IMPORT_START
 * ```tsx
 * import { FadeInBox } from 'react-native-chill-ui';
 * ```
 * STORYBOOK_IMPORT_END -->
 *
 * @example
 * ```tsx
 * <FadeInBox autoStart className="bg-blue-500 p-6 rounded-lg">
 *   <String className="text-white">Fading in automatically</String>
 * </FadeInBox>
 *
 * ```
 *
 * @param autoStart - Automatically start animation when component mounts (default: `false`)
 * @param children - Content to be animated
 * @param className - CSS classes for NativeWind styling (NativeWind only)
 * @param delay - Delay before starting animation in milliseconds (default: `0`)
 * @param duration - Animation duration in milliseconds (default: `1000`)
 * @param infiniteLoop - Loop animation continuously (default: `false`)
 * @param style - Inline styles for traditional styling or style overrides
 * @param ref - Ref for manual animation control (exposes `start` and `stop` methods)
 * @param AnimatedBoxProps - Any other props accepted by the `AnimatedBox` component
 */
const FadeInBox = forwardRef<FadeInBoxRefTw, PropsWithChildren<FadeInBoxPropsTw>>((props, ref) => {
  const {
    autoStart = false,
    children,
    className,
    delay = 0,
    duration = 1000,
    infiniteLoop = false,
    style,
    ...rest
  } = props;
  classNamePropsHandler(props, 'FadeInBox');
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const animationRef = useRef<Animated.CompositeAnimation | null>(null);
  const isRunningRef = useRef(false);

  const startAnimation = useCallback(() => {
    if (isRunningRef.current) return;

    isRunningRef.current = true;
    animationRef.current?.stop();
    fadeAnim.setValue(0);

    const animation = Animated.timing(fadeAnim, {
      duration,
      toValue: 1,
      useNativeDriver: true,
    });

    if (infiniteLoop) {
      animationRef.current = Animated.loop(animation);
    } else {
      animationRef.current = animation;
    }

    animationRef.current.start();
  }, [duration, infiniteLoop, fadeAnim]);

  const stopAnimation = useCallback(() => {
    isRunningRef.current = false;
    animationRef.current?.stop();

    // Reset animation to initial state
    fadeAnim.setValue(0);
  }, [fadeAnim]);

  useImperativeHandle(
    ref,
    () => ({
      start: startAnimation,
      stop: stopAnimation,
    }),
    [startAnimation, stopAnimation],
  );

  useEffect(() => {
    if (autoStart || infiniteLoop) {
      const timer = setTimeout(() => {
        startAnimation();
      }, delay);

      return () => {
        clearTimeout(timer);
        stopAnimation();
      };
    }
    return undefined;
  }, [delay, autoStart, infiniteLoop, startAnimation, stopAnimation]);

  return (
    <AnimatedBox
      {...classNameHandler(className)}
      style={[
        {
          opacity: fadeAnim,
        },
        style,
      ]}
      {...rest}
    >
      {children}
    </AnimatedBox>
  );
});

FadeInBox.displayName = 'FadeInBox';

export default FadeInBox;
