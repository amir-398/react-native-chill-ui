import { useRef } from 'react';
import { Animated, Pressable } from 'react-native';

import type { InteractiveBoxProps } from '../../types/animatedBox';

import { AnimatedView as AnimatedViewNative } from '../box/View';

/**
 * Interactive pressable animation component.
 *
 * Uses React Native's internal ViewNativeComponent for optimal performance
 * by bypassing some abstraction layers.
 *
 * @example
 * ```tsx
 * <InteractiveBox scaleValue={1.1} opacityValue={0.8}>
 *   <String>Press me!</String>
 * </InteractiveBox>
 * ```
 */
export default function InteractiveBox({
  children,
  className,
  duration = 200,
  onPressIn,
  onPressOut,
  opacityValue = 0.8,
  scaleValue = 1.1,
  ...props
}: InteractiveBoxProps) {
  const scaleAnim = useRef(new Animated.Value(1)).current;
  const fadeAnim = useRef(new Animated.Value(1)).current;

  const animateIn = () => {
    Animated.parallel([
      Animated.spring(scaleAnim, {
        friction: 3,
        toValue: scaleValue,
        useNativeDriver: true,
      }),
      Animated.timing(fadeAnim, {
        duration,
        toValue: opacityValue,
        useNativeDriver: true,
      }),
    ]).start();
    onPressIn?.();
  };

  const animateOut = () => {
    Animated.parallel([
      Animated.spring(scaleAnim, {
        friction: 3,
        toValue: 1,
        useNativeDriver: true,
      }),
      Animated.timing(fadeAnim, {
        duration,
        toValue: 1,
        useNativeDriver: true,
      }),
    ]).start();
    onPressOut?.();
  };

  return (
    <Pressable onPressIn={animateIn} onPressOut={animateOut}>
      <AnimatedViewNative
        style={{
          opacity: fadeAnim,
          transform: [{ scale: scaleAnim }],
        }}
        className={className}
        {...props}
      >
        {children}
      </AnimatedViewNative>
    </Pressable>
  );
}
