import { Animated } from 'react-native';
import { useEffect, useRef } from 'react';
import { AnimatedBoxTw } from '@components/animatedBox';

/**
 * Individual ripple effect component using native Animated API
 */
interface RippleEffectProps {
  x: number;
  y: number;
  duration: number;
  effectColor: string;
  containerWidth: number;
  containerHeight: number;
}

export function RippleEffect({ containerHeight, containerWidth, duration, effectColor, x, y }: RippleEffectProps) {
  const scaleAnim = useRef(new Animated.Value(0)).current;
  const opacityAnim = useRef(new Animated.Value(0.6)).current;

  const distanceToCorners = [
    Math.sqrt(x * x + y * y), // Top-left
    Math.sqrt((containerWidth - x) * (containerWidth - x) + y * y), // Top-right
    Math.sqrt(x * x + (containerHeight - y) * (containerHeight - y)), // Bottom-left
    Math.sqrt((containerWidth - x) * (containerWidth - x) + (containerHeight - y) * (containerHeight - y)), // Bottom-right
  ];

  const maxDistance = Math.max(...distanceToCorners);

  const baseSize = 20;
  const finalScale = (maxDistance * 2.2) / baseSize;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(scaleAnim, {
        duration,
        toValue: finalScale,
        useNativeDriver: true,
      }),
      Animated.timing(opacityAnim, {
        delay: Math.round(duration * 0.3),
        duration: Math.round(duration * 0.9),
        toValue: 0,
        useNativeDriver: true,
      }),
    ]).start();
  }, [scaleAnim, opacityAnim, finalScale, duration]);

  return (
    <AnimatedBoxTw
      style={{
        backgroundColor: effectColor,
        borderRadius: baseSize / 2,
        height: baseSize,
        left: x - baseSize / 2,
        opacity: opacityAnim,
        pointerEvents: 'none',
        position: 'absolute',
        top: y - baseSize / 2,
        transform: [{ scale: scaleAnim }],
        width: baseSize,
      }}
    />
  );
}
