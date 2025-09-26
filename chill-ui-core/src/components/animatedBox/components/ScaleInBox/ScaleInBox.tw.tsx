import type { ScaleInBoxPropsTw, ScaleInBoxRefTw } from '@types';

import { Animated } from 'react-native';
import { useRef, useEffect, useImperativeHandle, forwardRef, useCallback, PropsWithChildren } from 'react';

import AnimatedBox from '../animatedBox/AnimatedBox.tw';

/**
 * ScaleInBox - Dynamic scale-in animation component
 *
 * Creates an engaging scale-in effect using spring physics for natural feel.
 *
 * @example
 * ```tsx
 * // Basic auto-start scale in
 * <ScaleInBox autoStart className="bg-green-500 p-6 rounded-xl">
 *   <String className="text-white font-bold">Scaling in smoothly</String>
 * </ScaleInBox>
 * ```
 *
 * @param autoStart - Automatically start animation when component mounts (default: false)
 * @param duration - Animation duration in milliseconds (default: 800)
 * @param delay - Delay before starting animation in milliseconds (default: 0)
 * @param infiniteLoop - Loop animation continuously (default: false)
 * @param className - CSS classes for NativeWind styling
 * @param style - Inline styles for traditional styling or style overrides
 * @param children - Content to be animated
 * @param ref - Ref for manual animation control (start, stop methods)
 * @returns Animated component with scale-in effect using spring physics
 */
const ScaleInBox = forwardRef<ScaleInBoxRefTw, PropsWithChildren<ScaleInBoxPropsTw>>((props, ref) => {
  const { autoStart = false, children, className, delay = 0, infiniteLoop = false, style, ...rest } = props;
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
      className={className}
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
