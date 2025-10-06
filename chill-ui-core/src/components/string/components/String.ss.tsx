import type { StringPropsSs } from '@types';

import { PropsWithChildren } from 'react';

import { Text as NativeText } from './Text.ss';
import { StringSv, styles } from '../styles/String.ss.styles';

/**
 * String component that provides a high-level text component with predefined styling variants.
 * Offers consistent typography with customizable size, color, font, and position options.
 *
 * @example
 * ```tsx
 * // Basic text with default styling
 * <String>Hello World</String>
 *
 * // Customized text with props
 * <String  position="right" variant="title-1">
 *   Custom Text
 * </String>
 *
 * ```
 *
 * @param children - Text content to display
 * @param color - Custom color override (hex, rgb, etc.)
 * @param font - Font family to use
 * @param position - Text alignment position ('left' | 'center' | 'right')
 * @param size - Text size variant ('xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl' | '3xl' | '4xl' | '5xl' | '6xl' | '7xl' | '8xl' | '9xl')
 * @param style - Additional inline styles
 * @param variant - Text variant for special styling
 * @param useFastText - Whether to use fast text rendering
 * @returns Styled text component with consistent typography
 */
export default function String(props: PropsWithChildren<StringPropsSs>) {
  const { children, color, font, onPress, position, size, style, variant, ...rest } = props;

  const baseStyle = StringSv({ font, position, size, variant });

  return (
    <NativeText
      style={[baseStyle, !onPress && styles.pointerEventsNone, color && { color }, style]}
      onPress={onPress}
      {...rest}
    >
      {children}
    </NativeText>
  );
}
