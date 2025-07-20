import { Animated } from 'react-native';
import { useRef, useEffect, useImperativeHandle, forwardRef, useCallback } from 'react';

import type { ScaleInBoxProps, ScaleInBoxRef } from '../../types/animatedBox';

import { AnimatedView as AnimatedViewNative } from '../box/View';

/**
 * Scale in animation component.
 *
 * Uses React Native's internal ViewNativeComponent for optimal performance
 * by bypassing some abstraction layers.
 *
 * @example
 * ```tsx
 * <ScaleInBox duration={800} delay={200} autoStart infiniteLoop>
 *   <String>Scale in content</String>
 * </ScaleInBox>
 * ```
 */
const ScaleInBox = forwardRef<ScaleInBoxRef, ScaleInBoxProps>(
  ({ autoStart = false, children, className, delay = 0, duration = 800, infiniteLoop = false, ...props }, ref) => {
    const scaleAnim = useRef(new Animated.Value(0.8)).current;
    const animationRef = useRef<Animated.CompositeAnimation | null>(null);

    const startAnimation = useCallback(() => {
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
      animationRef.current?.stop();
    }, []);

    const loopAnimation = useCallback(() => {
      stopAnimation();
      scaleAnim.setValue(0.8);
      animationRef.current = Animated.loop(
        Animated.spring(scaleAnim, {
          friction: 3,
          toValue: 1,
          useNativeDriver: true,
        }),
      );
      animationRef.current.start();
    }, [scaleAnim, stopAnimation]);

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
          transform: [{ scale: scaleAnim }],
        }}
        className={className}
        {...props}
      >
        {children}
      </AnimatedViewNative>
    );
  },
);

ScaleInBox.displayName = 'ScaleInBox';

export default ScaleInBox;
