import type { PropsWithChildren, ReactElement } from 'react';
import type { TextProps as NativeTextProps } from 'react-native';

import { createElement } from 'react';
import { Animated, Text as NativeText, Platform } from 'react-native';

export interface TextProps extends NativeTextProps {
  onPress?: () => void;
  useFastText?: boolean;
}

export type FastTextProps = Omit<
  TextProps,
  'onPress' | 'onPressIn' | 'onPressOut' | 'onLongPress' | 'pressRetentionOffset'
>;

/**
 * The `<FastText />` component uses RCTText for better performance.
 * Optimized for static text content without press interactions.
 *
 *
 * <!-- STORYBOOK_IMPORT_START
 * ```tsx
 * import { FastText } from 'react-native-chill-ui';
 * ```
 * STORYBOOK_IMPORT_END -->
 *
 * @example
 * ```tsx
 * <FastText style={{ fontSize: 18, color: '#374151' }}>
 *   Static content for better performance
 * </FastText>
 * ```
 *
 * @param children - Text content to display
 * @param style - Style object for the text
 */
export function FastText(props: FastTextProps): ReactElement {
  if (Platform.OS === 'web') {
    return <NativeText {...props} />;
  }
  return createElement('RCTText', props);
}

/**
 * The `<Text />` component provides optimized text rendering with optional press handling.
 * Automatically uses FastText for better performance when no press interactions are needed.
 *
 *
 * <!-- STORYBOOK_IMPORT_START
 * ```tsx
 * import { Text } from 'react-native-chill-ui';
 * ```
 * STORYBOOK_IMPORT_END -->
 *
 * @example
 * ```tsx
 * <Text style={{ fontSize: 16, color: '#000000' }}>
 *   Hello World
 * </Text>
 * ```
 *
 * @param children - Text content to display
 * @param onPress - Optional press handler function
 * @param style - Style object for the text
 * @param useFastText - Whether to use FastText for optimization (default: true)
 */
export function Text(props: PropsWithChildren<TextProps>) {
  const { children, onPress, useFastText = true, ...rest } = props;

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

/**
 * The `<AnimatedText />` component is an animated version of FastText for smooth text animations.
 *
 *
 * <!-- STORYBOOK_IMPORT_START
 * ```tsx
 * import { AnimatedText } from 'react-native-chill-ui';
 * ```
 * STORYBOOK_IMPORT_END -->
 *
 * @example
 * ```tsx
 * <AnimatedText style={{ fontSize: 18, color: '#3B82F6' }}>
 *   Animated text content
 * </AnimatedText>
 * ```
 *
 * @param children - Text content to display
 * @param style - Style object for the animated text
 */
export const AnimatedText = Animated.createAnimatedComponent(FastText);
