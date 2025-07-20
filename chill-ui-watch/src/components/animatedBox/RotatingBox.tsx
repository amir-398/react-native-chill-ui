import { Animated } from 'react-native';
import { useRef, useEffect, useImperativeHandle, forwardRef, useCallback } from 'react';

import type { RotatingBoxProps, RotatingBoxRef } from '../../types/animatedBox';

import { AnimatedView as AnimatedViewNative } from '../box/View';

/**
 * Rotating animation component.
 *
 * Uses React Native's internal ViewNativeComponent for optimal performance
 * by bypassing some abstraction layers.
 *
 * @example
 * ```tsx
 * <RotatingBox duration={2000} loop autoStart infiniteLoop>
 *   <String>Rotating content</String>
 * </RotatingBox>
 * ```
 */
const RotatingBox = forwardRef<RotatingBoxRef, RotatingBoxProps>(
  ({ autoStart = false, children, className, delay = 0, duration = 2000, infiniteLoop = false, ...props }, ref) => {
    const rotateAnim = useRef(new Animated.Value(0)).current;
    const animationRef = useRef<Animated.CompositeAnimation | null>(null);

    const spin = rotateAnim.interpolate({
      inputRange: [0, 1],
      outputRange: ['0deg', '360deg'],
    });

    const startAnimation = useCallback(() => {
      animationRef.current?.stop();
      rotateAnim.setValue(0);

      const animation = Animated.timing(rotateAnim, {
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
    }, [duration, infiniteLoop, rotateAnim]);

    const stopAnimation = useCallback(() => {
      animationRef.current?.stop();
    }, []);

    const loopAnimation = useCallback(() => {
      stopAnimation();
      rotateAnim.setValue(0);
      animationRef.current = Animated.loop(
        Animated.timing(rotateAnim, {
          duration,
          toValue: 1,
          useNativeDriver: true,
        }),
      );
      animationRef.current.start();
    }, [duration, rotateAnim, stopAnimation]);

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
    }, [delay, duration, autoStart, infiniteLoop, startAnimation, stopAnimation]);

    return (
      <AnimatedViewNative
        style={{
          transform: [{ rotate: spin }],
        }}
        className={className}
        {...props}
      >
        {children}
      </AnimatedViewNative>
    );
  },
);

RotatingBox.displayName = 'RotatingBox';

export default RotatingBox;
