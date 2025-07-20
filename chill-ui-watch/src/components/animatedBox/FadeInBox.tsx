import { Animated } from 'react-native';
import { useRef, useEffect, useImperativeHandle, forwardRef, useCallback } from 'react';

import type { FadeInBoxProps, FadeInBoxRef } from '../../types/animatedBox';

import { AnimatedView as AnimatedViewNative } from '../box/View';

/**
 * Fade in animation component.
 *
 * Uses React Native's internal ViewNativeComponent for optimal performance
 * by bypassing some abstraction layers.
 *
 * @example
 * ```tsx
 * <FadeInBox duration={1000} delay={500} autoStart infiniteLoop>
 *   <String>Fade in content</String>
 * </FadeInBox>
 * ```
 */
const FadeInBox = forwardRef<FadeInBoxRef, FadeInBoxProps>(
  ({ autoStart = false, children, className, delay = 0, duration = 1000, infiniteLoop = false, ...props }, ref) => {
    const fadeAnim = useRef(new Animated.Value(0)).current;
    const animationRef = useRef<Animated.CompositeAnimation | null>(null);

    const startAnimation = useCallback(() => {
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
      animationRef.current?.stop();
    }, []);

    const loopAnimation = useCallback(() => {
      stopAnimation();
      fadeAnim.setValue(0);
      animationRef.current = Animated.loop(
        Animated.timing(fadeAnim, {
          duration,
          toValue: 1,
          useNativeDriver: true,
        }),
      );
      animationRef.current.start();
    }, [duration, fadeAnim, stopAnimation]);

    useImperativeHandle(
      ref,
      () => ({
        loop: loopAnimation,
        start: startAnimation,
        stop: stopAnimation,
      }),
      [startAnimation, stopAnimation, loopAnimation],
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
      <AnimatedViewNative
        style={{
          opacity: fadeAnim,
        }}
        className={className}
        {...props}
      >
        {children}
      </AnimatedViewNative>
    );
  },
);

FadeInBox.displayName = 'FadeInBox';

export default FadeInBox;
