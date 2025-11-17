import type { SlideInBoxPropsTw, SlideInBoxRefTw } from '@types';

import { Animated } from 'react-native';
import { useRef, useEffect, useImperativeHandle, forwardRef, useCallback, PropsWithChildren } from 'react';

import { AnimatedBox } from '../animatedBox/AnimatedBox.tw';

/**
 * The `<SlideInBox />` component creates smooth slide-in effects from any direction.
 *
 * <!-- STORYBOOK_IMPORT_START
 * ```tsx
 * import { SlideInBox } from 'react-native-chill-ui';
 * ```
 * STORYBOOK_IMPORT_END -->
 *
 * @example
 * ```tsx
 * <SlideInBox
 *   autoStart
 *   direction="left"
 *   distance={100}
 *   duration={500}
 *   className="bg-blue-500 p-6 rounded-lg"
 * >
 *   <String className="text-white">Sliding in from left</String>
 * </SlideInBox>
 * ```
 *
 * @param autoStart - Automatically start animation when component mounts (default: `false`)
 * @param delay - Delay before starting animation in milliseconds (default: `0`)
 * @param direction - Direction to slide from: 'left', 'right', 'up', or 'down' (default: `'left'`)
 * @param distance - Distance to slide in pixels (default: `100`)
 * @param duration - Animation duration in milliseconds (default: `500`)
 * @param infiniteLoop - Loop animation continuously (default: `false`)
 * @param children - Content to be animated
 * @param className - CSS classes for NativeWind styling
 * @param style - Inline styles for additional style overrides
 * @param ref - Ref for manual animation control (start, stop)
 */
const SlideInBox = forwardRef<SlideInBoxRefTw, PropsWithChildren<SlideInBoxPropsTw>>((props, ref) => {
  const {
    autoStart = false,
    children,
    className,
    delay = 0,
    direction = 'left',
    distance = 100,
    duration = 500,
    infiniteLoop = false,
    style,
    ...rest
  } = props;
  const slideAnim = useRef(
    new Animated.Value(direction === 'left' || direction === 'up' ? -distance : distance),
  ).current;
  const animationRef = useRef<Animated.CompositeAnimation | null>(null);
  const isRunningRef = useRef(false);

  const getTransform = () => {
    if (direction === 'left' || direction === 'right') {
      return [{ translateX: slideAnim }];
    }
    return [{ translateY: slideAnim }];
  };

  const startAnimation = useCallback(() => {
    if (isRunningRef.current) return;

    isRunningRef.current = true;
    animationRef.current?.stop();
    slideAnim.setValue(direction === 'left' || direction === 'up' ? -distance : distance);

    const animation = Animated.timing(slideAnim, {
      duration,
      toValue: 0,
      useNativeDriver: true,
    });

    if (infiniteLoop) {
      animationRef.current = Animated.loop(animation);
    } else {
      animationRef.current = animation;
    }

    animationRef.current.start();
  }, [direction, distance, duration, infiniteLoop, slideAnim]);

  const stopAnimation = useCallback(() => {
    isRunningRef.current = false;
    animationRef.current?.stop();

    // Reset animation to initial state
    slideAnim.setValue(direction === 'left' || direction === 'up' ? -distance : distance);
  }, [direction, distance, slideAnim]);

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
  }, [delay, direction, distance, duration, autoStart, infiniteLoop, startAnimation, stopAnimation]);

  return (
    <AnimatedBox
      className={className}
      style={[
        {
          transform: getTransform(),
        },
        style,
      ]}
      {...rest}
    >
      {children}
    </AnimatedBox>
  );
});

SlideInBox.displayName = 'SlideInBox';

export default SlideInBox;
