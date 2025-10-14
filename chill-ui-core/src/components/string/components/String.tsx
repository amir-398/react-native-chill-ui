import type { StringPropsTw } from '@types';

import { cn, classNameHandler, styleHandler, classNamePropsHandler, colorVariantPropsHandler } from '@utils';

import { Text as NativeText } from './Text';
import { StringSv, styles } from '../styles/String.ss.styles';
import { stringTv, twStyles } from '../styles/String.tw.styles';

/**
 * String component that provides a high-level text component with predefined styling variants.
 * Offers consistent typography with customizable size, color, font, and position options.
 * Automatically detects NativeWind availability and falls back to StyleSheet if needed.
 *
 * @example
 * ```tsx
 * // Basic text with default styling
 * <String>Hello World</String>
 *
 * // Customized text with props
 * <String position="right" variant="title-1">
 *   Custom Text
 * </String>
 * ```
 *
 * @param children - Text content to display
 * @param className - Custom CSS classes for additional styling
 * @param color - Custom color override (hex, rgb, etc.)
 * @param colorVariant - Predefined color variant ('primary' | 'secondary' | 'success' | 'warning' | 'error')
 * @param font - Font family to use
 * @param position - Text alignment position ('left' | 'center' | 'right')
 * @param size - Text size variant ('xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl' | '3xl' | '4xl' | '5xl' | '6xl' | '7xl' | '8xl' | '9xl')
 * @param style - Additional inline styles
 * @param variant - Text variant for special styling
 * @param useFastText - Whether to use fast text rendering
 * @returns Styled text component with consistent typography
 */
export default function String(props: StringPropsTw) {
  const {
    children,
    className,
    color,
    colorVariant = 'primary',
    font,
    onPress,
    position,
    size,
    style,
    variant,
    ...rest
  } = props;
  classNamePropsHandler(props, 'String');
  colorVariantPropsHandler(props, 'String');

  console.log('color', color);

  const dynamicClasses = cn(
    stringTv({ colorVariant, font, position, size, variant }),
    !onPress && twStyles.pointerEventsNone,
    className,
  );

  const stringStyle = StringSv({ font, position, size, variant });

  return (
    <NativeText
      {...classNameHandler(dynamicClasses)}
      {...styleHandler({
        defaultStyle: [stringStyle, !onPress && styles.pointerEventsNone],
        style: [color && { color }, style],
      })}
      onPress={onPress}
      {...rest}
    >
      {children}
    </NativeText>
  );
}
