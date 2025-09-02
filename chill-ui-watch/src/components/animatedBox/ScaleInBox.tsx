import { Animated } from 'react-native';
import { useRef, useEffect, useImperativeHandle, forwardRef, useCallback } from 'react';

import type { ScaleInBoxProps, ScaleInBoxRef } from '../../types/animatedBox';

import cn from '../cn';
import styles from './AnimatedBox.style';
import { AnimatedView as AnimatedViewNative } from '../box/View';
import { isNativeWindInstalled } from '../../utils/nativewindDetector';
import { classNamePropsHandler } from '../../utils/classNameMissingError';

/**
 * ScaleInBox - Dynamic scale-in animation component
 *
 * Creates an engaging scale-in effect using spring physics for natural feel. Animates scale
 * from 0.8 to 1.0 with smooth spring transition. Perfect for emphasizing content appearance
 * with bouncy, organic motion.
 *
 * @example
 * ```tsx
 * // Basic auto-start scale in
 * <ScaleInBox autoStart className="bg-green-500 p-6 rounded-xl">
 *   <String className="text-white font-bold">Scaling in smoothly</String>
 * </ScaleInBox>
 *
 * // With custom timing and delay
 * <ScaleInBox
 *   autoStart
 *   duration={1200}
 *   delay={500}
 *   className="bg-purple-500 p-4 rounded-lg shadow-lg"
 * >
 *   <String className="text-white">Delayed spring entrance</String>
 * </ScaleInBox>
 *
 * // Manual control with ref
 * const scaleRef = useRef<ScaleInBoxRef>(null);
 *
 * <ScaleInBox ref={scaleRef} className="bg-blue-500 p-4">
 *   <String className="text-white">Manual control</String>
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
const ScaleInBox = forwardRef<ScaleInBoxRef, ScaleInBoxProps>((props, ref) => {
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

  if (isNativeWindInstalled()) {
    return (
      <AnimatedViewNative
        className={cn('overflow-hidden', className)}
        style={[
          {
            transform: [{ scale: scaleAnim }],
          },
          style,
        ]}
        {...rest}
      >
        {children}
      </AnimatedViewNative>
    );
  }

  return (
    <AnimatedViewNative
      style={[
        styles.scaleContainer,
        {
          transform: [{ scale: scaleAnim }],
        },
        style,
      ]}
      {...rest}
    >
      {children}
    </AnimatedViewNative>
  );
});

ScaleInBox.displayName = 'ScaleInBox';

export default ScaleInBox;
