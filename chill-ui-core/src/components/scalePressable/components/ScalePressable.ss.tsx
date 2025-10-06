import { ScalePressablePropsSs } from '@types';
import { useRef, PropsWithChildren } from 'react';
import { Animated, Pressable } from 'react-native';
import { AnimatedBoxSs } from '@components/animatedBox';

import { styles } from '../styles/ScalePressable.ss.styles';

/**
 * ScalePressable component that provides a scale effect on press.
 *
 * When pressed, the component scales down to give a tactile feedback effect,
 * making it feel like you're physically pressing a button.
 *
 * Automatically detects NativeWind availability and falls back to StyleSheet if needed.
 *
 * @example
 * ```tsx
 * // Basic usage with scale effect
 * <ScalePressable onPress={() => console.log('Pressed!')}>
 *   <Box className="p-4 bg-blue-500 rounded-lg">
 *     <String color="white">Press me</String>
 *   </Box>
 * </ScalePressable>
 * ```
 *
 * @param children - Child components to render with scale effect (required)
 * @param style - Style object for the pressable container
 * @param scaleValue - Scale factor when pressed (default: 0.95)
 * @param duration - Animation duration in milliseconds (default: 100)
 * @param onPress - Callback function called when the component is pressed
 * @returns ScalePressable component with scale animation
 * @throws Error if no children are provided
 */
export default function ScalePressable(props: PropsWithChildren<ScalePressablePropsSs>) {
  const { children, className, duration = 100, onPress, scaleValue = 0.95, style, ...rest } = props;

  if (!children) {
    throw new Error('ScalePressable must have children');
  }

  const scaleAnim = useRef(new Animated.Value(1)).current;

  const handlePressIn = () => {
    Animated.timing(scaleAnim, {
      duration,
      toValue: scaleValue,
      useNativeDriver: true,
    }).start();
  };

  const handlePressOut = () => {
    Animated.timing(scaleAnim, {
      duration,
      toValue: 1,
      useNativeDriver: true,
    }).start();
  };

  const handlePress = (event: any) => {
    if (onPress) {
      onPress(event);
    }
  };

  const animatedStyle = {
    transform: [{ scale: scaleAnim }],
  };

  return (
    <AnimatedBoxSs style={animatedStyle}>
      <Pressable
        onPress={handlePress}
        onPressIn={handlePressIn}
        onPressOut={handlePressOut}
        style={[styles.container, style]}
        {...rest}
      >
        {children}
      </Pressable>
    </AnimatedBoxSs>
  );
}
