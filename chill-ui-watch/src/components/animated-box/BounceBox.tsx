import { Animated } from 'react-native';
import { useRef, useEffect, useCallback, useImperativeHandle, forwardRef } from 'react';

import type { BounceBoxProps, BounceBoxRefProps } from '../../types/animatedBox';

import { AnimatedView as AnimatedViewNative } from '../box/View';

/**
 * Bounce animation component.
 *
 * Uses React Native's internal ViewNativeComponent for optimal performance
 * by bypassing some abstraction layers.
 *
 * @example
 * ```tsx
 * // Auto bounce
 * <BounceBox bounceHeight={20} bounceInterval={2000} autoStart infiniteLoop>
 *   <String>Bouncing content</String>
 * </BounceBox>
 *
 * // Manual bounce with ref
 * const bounceRef = useRef<BounceBoxRefProps>(null);
 * <BounceBox ref={bounceRef} bounceHeight={20}>
 *   <String>Manual bounce</String>
 * </BounceBox>
 * <Button onPress={() => bounceRef.current?.bounce()}>
 *   Trigger Bounce
 * </Button>
 * ```
 */
const BounceBox = forwardRef<BounceBoxRefProps, BounceBoxProps>(
  (
    {
      autoStart = false,
      bounceHeight = 20,
      bounceInterval = 2000,
      children,
      className,
      duration = 400,
      infiniteLoop = false,
      onBounce,
      ...props
    },
    ref,
  ) => {
    const bounceAnim = useRef(new Animated.Value(0)).current;
    const animationRef = useRef<Animated.CompositeAnimation | null>(null);
    const intervalRef = useRef<NodeJS.Timeout | null>(null);

    const startBounce = useCallback(() => {
      animationRef.current?.stop();
      bounceAnim.setValue(0);

      const animation = Animated.sequence([
        Animated.timing(bounceAnim, {
          duration: duration / 2,
          toValue: 1,
          useNativeDriver: true,
        }),
        Animated.timing(bounceAnim, {
          duration: duration / 2,
          toValue: 0,
          useNativeDriver: true,
        }),
      ]);

      animationRef.current = animation;
      animation.start();
      onBounce?.();
    }, [bounceAnim, duration, onBounce]);

    const startAnimation = useCallback(() => {
      if (infiniteLoop) {
        // Boucle infinie avec intervalle
        intervalRef.current = setInterval(startBounce, bounceInterval);
      } else if (autoStart) {
        // AutoStart sans boucle - lance une seule fois après le délai
        setTimeout(startBounce, 0);
      } else {
        // Animation manuelle
        startBounce();
      }
    }, [autoStart, infiniteLoop, bounceInterval, startBounce]);

    const stopAnimation = useCallback(() => {
      animationRef.current?.stop();
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    }, []);

    const loopAnimation = useCallback(() => {
      stopAnimation();
      intervalRef.current = setInterval(startBounce, bounceInterval);
    }, [bounceInterval, startBounce, stopAnimation]);

    useImperativeHandle(
      ref,
      () => ({
        bounce: startBounce,
        loop: loopAnimation,
        start: startAnimation,
        stop: stopAnimation,
      }),
      [startBounce, startAnimation, stopAnimation, loopAnimation],
    );

    useEffect(() => {
      if (autoStart || infiniteLoop) {
        startAnimation();
      }

      return () => {
        stopAnimation();
      };
    }, [autoStart, infiniteLoop, startAnimation, stopAnimation]);

    return (
      <AnimatedViewNative
        style={{
          transform: [
            {
              translateY: bounceAnim.interpolate({
                inputRange: [0, 1],
                outputRange: [0, -bounceHeight],
              }),
            },
          ],
        }}
        className={className}
        {...props}
      >
        {children}
      </AnimatedViewNative>
    );
  },
);

BounceBox.displayName = 'BounceBox';

export default BounceBox;
