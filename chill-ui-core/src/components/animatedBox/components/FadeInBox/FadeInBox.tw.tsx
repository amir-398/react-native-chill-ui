import type { FadeInBoxPropsTw, FadeInBoxRefTw } from '@types';

import { Animated } from 'react-native';
import { useRef, useEffect, useImperativeHandle, forwardRef, useCallback, PropsWithChildren } from 'react';

import AnimatedBox from '../animatedBox/AnimatedBox.tw';

/**
 * FadeInBox - Smooth fade-in animation component
 * Creates a beautiful fade-in effect by animating opacity from 0 to 1. Perfect for revealing
 * content with elegant transitions. Supports both automatic and manual control with ref methods.
 *
 * @example
 * ```tsx
 * // Basic auto-start fade in
 * <FadeInBox autoStart className="bg-blue-500 p-6 rounded-lg">
 *   <String className="text-white">Fading in automatically</String>
 * </FadeInBox>
 *
 * // With custom timing and delay
 * <FadeInBox
 *   autoStart
 *   duration={1500}
 *   delay={800}
 *   className="bg-green-500 p-4 rounded-xl"
 * >
 *   <String className="text-white">Delayed smooth fade</String>
 * </FadeInBox>
 * ```
 *
 * @param autoStart - Automatically start animation when component mounts (default: false)
 * @param duration - Animation duration in milliseconds (default: 1000)
 * @param delay - Delay before starting animation in milliseconds (default: 0)
 * @param infiniteLoop - Loop animation continuously (default: false)
 * @param className - CSS classes for NativeWind styling
 * @param style - Inline styles for traditional styling or style overrides
 * @param children - Content to be animated
 * @param ref - Ref for manual animation control (start, stop methods)
 * @returns Animated component with fade-in effect
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
      className={className}
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
