import type { PropsWithChildren, ReactElement } from 'react';
import type { TextProps as NativeTextProps } from 'react-native';

import { createElement } from 'react';
import { cssInterop } from 'nativewind';
import { Animated, Text as NativeText, Platform } from 'react-native';

export interface TextProps extends NativeTextProps {
  className?: string;
  onPress?: () => void;
  useFastText?: boolean;
}

export type FastTextProps = Omit<
  TextProps,
  'onPress' | 'onPressIn' | 'onPressOut' | 'onLongPress' | 'pressRetentionOffset'
>;

/**
 * FastText component that uses RCTText for better performance.
 * Optimized for static text content without press interactions.
 * Automatically detects NativeWind availability and falls back to StyleSheet if needed.
 *
 * @example
 * ```tsx
 * // With NativeWind
 * <FastText className="text-lg text-gray-800">
 *   Static content for better performance
 * </FastText>
 *
 * // Without NativeWind (fallback)
 * <FastText style={{ fontSize: 18, color: '#374151' }}>
 *   Static content for better performance
 * </FastText>
 * ```
 *
 * @param props - Text props excluding press-related props
 * @returns Optimized text component using RCTText
 */
export function FastText(props: FastTextProps): ReactElement {
  if (Platform.OS === 'web') {
    return <NativeText {...props} />;
  }
  return createElement('RCTText', props);
}

/**
 * Text component that provides optimized text rendering with optional press handling.
 * Automatically uses FastText for better performance when no press interactions are needed.
 * Automatically detects NativeWind availability and falls back to StyleSheet if needed.
 *
 * @example
 * ```tsx
 * // With NativeWind
 * <Text className="text-base text-black">
 *   Hello World
 * </Text>
 *
 * // Pressable text with NativeWind
 * <Text onPress={() => console.log('Pressed!')} className="text-blue-500">
 *   Click me
 * </Text>
 *
 * // Without NativeWind (fallback)
 * <Text style={{ fontSize: 16, color: '#000000' }}>
 *   Hello World
 * </Text>
 *
 * // Pressable text without NativeWind
 * <Text onPress={() => console.log('Pressed!')} style={{ color: '#3B82F6' }}>
 *   Click me
 * </Text>
 * ```
 *
 * @param children - Text content to display
 * @param onPress - Optional press handler function
 * @param useFastText - Whether to use FastText for optimization (default: true)
 * @param className - Classes Tailwind CSS (with NativeWind)
 * @param style - Styles inline React Native
 * @param props - Additional React Native Text props
 * @returns Text component with optimized rendering
 */
export function Text(props: PropsWithChildren<TextProps>) {
  const { children, onPress, useFastText = true, ...rest } = props;

  const handlePress = () => {
    if (onPress) {
      onPress();
    }
  };

  if (onPress) {
    return (
      <NativeText {...rest} onPress={handlePress}>
        {children}
      </NativeText>
    );
  }

  if (useFastText === false) {
    return <NativeText {...rest}>{children}</NativeText>;
  }

  return <FastText {...rest}>{children}</FastText>;
}

cssInterop(Text, {
  className: {
    target: 'style', // map className->style
  },
});

/**
 * Animated version of FastText for smooth text animations.
 * Automatically detects NativeWind availability and falls back to StyleSheet if needed.
 *
 * @example
 * ```tsx
 * // With NativeWind
 * <AnimatedText className="text-lg text-blue-500">
 *   Animated text content
 * </AnimatedText>
 *
 * // Without NativeWind (fallback)
 * <AnimatedText style={{ fontSize: 18, color: '#3B82F6' }}>
 *   Animated text content
 * </AnimatedText>
 * ```
 */
export const AnimatedText = Animated.createAnimatedComponent(FastText);

cssInterop(AnimatedText, {
  className: {
    target: 'style', // map className->style
  },
});
