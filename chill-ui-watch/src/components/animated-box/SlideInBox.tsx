import { Animated } from 'react-native';
import { useRef, useEffect, useImperativeHandle, forwardRef, useCallback } from 'react';

import type { SlideInBoxProps, SlideInBoxRef } from '../../types/animatedBox';

import { AnimatedView as AnimatedViewNative } from '../box/View';

/**
 * Slide in animation component.
 *
 * Uses React Native's internal ViewNativeComponent for optimal performance
 * by bypassing some abstraction layers.
 *
 * @example
 * ```tsx
 * <SlideInBox direction="left" duration={500} autoStart infiniteLoop>
 *   <String>Slide in content</String>
 * </SlideInBox>
 * ```
 */
const SlideInBox = forwardRef<SlideInBoxRef, SlideInBoxProps>(
  (
    {
      autoStart = false,
      children,
      className,
      delay = 0,
      direction = 'left',
      distance = 100,
      duration = 500,
      infiniteLoop = false,
      ...props
    },
    ref,
  ) => {
    const slideAnim = useRef(
      new Animated.Value(direction === 'left' || direction === 'up' ? -distance : distance),
    ).current;
    const animationRef = useRef<Animated.CompositeAnimation | null>(null);

    const getTransform = () => {
      if (direction === 'left' || direction === 'right') {
        return [{ translateX: slideAnim }];
      }
      return [{ translateY: slideAnim }];
    };

    const startAnimation = useCallback(() => {
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
      animationRef.current?.stop();
    }, []);

    const loopAnimation = useCallback(() => {
      stopAnimation();
      slideAnim.setValue(direction === 'left' || direction === 'up' ? -distance : distance);
      animationRef.current = Animated.loop(
        Animated.timing(slideAnim, {
          duration,
          toValue: 0,
          useNativeDriver: true,
        }),
      );
      animationRef.current.start();
    }, [direction, distance, duration, slideAnim, stopAnimation]);

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
    }, [delay, direction, distance, duration, autoStart, infiniteLoop, startAnimation, stopAnimation]);

    return (
      <AnimatedViewNative
        style={{
          transform: getTransform(),
        }}
        className={className}
        {...props}
      >
        {children}
      </AnimatedViewNative>
    );
  },
);

SlideInBox.displayName = 'SlideInBox';

export default SlideInBox;
