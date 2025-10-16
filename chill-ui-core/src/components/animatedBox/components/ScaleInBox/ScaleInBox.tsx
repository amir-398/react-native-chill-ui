import type { ScaleInBoxPropsTw, ScaleInBoxRefTw } from '@types';

import { Animated } from 'react-native';
import { classNameHandler, classNamePropsHandler } from '@utils';
import { useRef, useEffect, useImperativeHandle, forwardRef, useCallback, PropsWithChildren } from 'react';

import { AnimatedBox } from '../animatedBox/AnimatedBox';

/**
 * The `<ScaleInBox />` component creates a smooth scale animation for its children.
 *
 * <!-- STORYBOOK_IMPORT_START
 * ```tsx
 * import { ScaleInBox } from 'react-native-chill-ui';
 * ```
 * STORYBOOK_IMPORT_END -->
 *
 * @example
 * ```tsx
 * <ScaleInBox autoStart infiniteLoop duration={1000} className="w-8 h-8">
 *   <Icon name="plus" className="text-blue-500" />
 * </ScaleInBox>
 * ```
 *
 * @param autoStart - Automatically start animation when component mounts (default: `false`)
 * @param delay - Delay before starting animation in milliseconds (default: `0`)
 * @param duration - Duration of the scale animation in milliseconds (default: `800`)
 * @param infiniteLoop - Loop animation continuously (default: `false`)
 * @param children - Content to be animated
 * @param className - CSS classes for NativeWind styling (NativeWind only)
 * @param style - Inline styles for traditional styling or style overrides
 * @param ref - Ref for manual animation control (start, stop)
 * @param AnimatedBoxProps - Any other props accepted by the `AnimatedBox` component
 */
const ScaleInBox = forwardRef<ScaleInBoxRefTw, PropsWithChildren<ScaleInBoxPropsTw>>((props, ref) => {
  const { autoStart = false, children, className, delay = 0, infiniteLoop = false, style, ...rest } = props;
  classNamePropsHandler(props, 'ScaleInBox');
  const scaleAnim = useRef(new Animated.Value(0.8)).current;
  const animationRef = useRef<Animated.CompositeAnimation | null>(null);
  const isRunningRef = useRef(false);

  const startAnimation = useCallback(() => {
    if (isRunningRef.current) return;

    isRunningRef.current = true;
    animationRef.current?.stop();
    scaleAnim.setValue(0.8);

    const animation = Animated.spring(scaleAnim, {
      friction: 3,
      toValue: 1,
      useNativeDriver: true,
    });

    if (infiniteLoop) {
      animationRef.current = Animated.loop(animation);
    } else {
      animationRef.current = animation;
    }

    animationRef.current.start();
  }, [infiniteLoop, scaleAnim]);

  const stopAnimation = useCallback(() => {
    isRunningRef.current = false;
    animationRef.current?.stop();

    // Reset animation to initial state
    scaleAnim.setValue(0.8);
  }, [scaleAnim]);

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
          transform: [{ scale: scaleAnim }],
        },
        style,
      ]}
      {...rest}
    >
      {children}
    </AnimatedBox>
  );
});

ScaleInBox.displayName = 'ScaleInBox';

export default ScaleInBox;
