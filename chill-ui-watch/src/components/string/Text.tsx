import type { ReactElement } from 'react';
import type { TextProps as NativeTextProps } from 'react-native';

import { createElement } from 'react';
import { cssInterop } from 'nativewind';
import { Animated, Text as NativeText } from 'react-native';

export interface TextProps extends NativeTextProps {
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
 *
 * @example
 * ```tsx
 * // Basic fast text
 * <FastText className="text-lg text-gray-800">
 *   Static content for better performance
 * </FastText>
 * ```
 *
 * @param props - Text props excluding press-related props
 * @returns Optimized text component using RCTText
 */
export function FastText(props: FastTextProps): ReactElement {
  return createElement('RCTText', props);
}

/**
 * Text component that provides optimized text rendering with optional press handling.
 * Automatically uses FastText for better performance when no press interactions are needed.
 *
 * @example
 * ```tsx
 * // Basic text with fast rendering
 * <Text className="text-base text-black">
 *   Hello World
 * </Text>
 *
 * // Pressable text
 * <Text onPress={() => console.log('Pressed!')} className="text-blue-500">
 *   Click me
 * </Text>
 *
 * // Force native text rendering
 * <Text useFastText={false} className="text-lg">
 *   Native Text Component
 * </Text>
 * ```
 *
 * @param children - Text content to display
 * @param onPress - Optional press handler function
 * @param useFastText - Whether to use FastText for optimization (default: true)
 * @param props - Additional React Native Text props
 * @returns Text component with optimized rendering
 */
export function Text(props: TextProps) {
  const { children, onPress, useFastText = true } = props;

  /**
   * Handles press events for the text component
   */
  const handlePress = () => {
    if (onPress) {
      onPress();
    }
  };

  if (onPress) {
    return (
      <NativeText {...props} onPress={handlePress}>
        {children}
      </NativeText>
    );
  }

  if (useFastText === false) {
    return <NativeText {...props}>{children}</NativeText>;
  }

  return <FastText {...props}>{children}</FastText>;
}

cssInterop(Text, {
  className: {
    target: 'style', // map className->style
  },
});

/** Animated version of FastText for smooth text animations */
export const AnimatedText = Animated.createAnimatedComponent(FastText);

cssInterop(AnimatedText, {
  className: {
    target: 'style', // map className->style
  },
});
