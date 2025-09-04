import { classNameHandler, styleHandler } from '@/utils/propsHandlers';
import colorVariantPropsHandler from '@/utils/colorVariantPropsHandler';

import type { StringProps } from '../../types';

import cn from '../cn';
import styles from './String.style';
import { Text as NativeText } from './Text';
import createStringStyles from './utils/createStyles';
import { classNamePropsHandler } from '../../utils/classNameMissingError';
import { textColorVr, textFontVr, textPositionVr, textSizeVr } from './styleVariants';

/**
 * String component that provides a high-level text component with predefined styling variants.
 * Offers consistent typography with customizable size, color, font, weight, and position options.
 * Automatically detects NativeWind availability and falls back to StyleSheet if needed.
 *
 * @example
 * ```tsx
 * // Basic text with default styling
 * <String>Hello World</String>
 *
 * // Customized text with variants
 * <String size="lg" colorVariant="primary" weight="bold">
 *   Custom Text
 * </String>
 *
 * // Text with custom color and position
 * <String color="#FF0000" position="center" size="xl">
 *   Red Centered Text
 * </String>
 * ```
 *
 * @param children - Text content to display
 * @param className - Custom CSS classes for additional styling
 * @param color - Custom color override (hex, rgb, etc.)
 * @param colorVariant - Predefined color variant ('primary' | 'secondary' | 'success' | 'warning' | 'error')
 * @param font - Font family to use
 * @param position - Text alignment position ('left' | 'center' | 'right' | 'justify')
 * @param size - Text size variant ('xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl' | '3xl')
 * @param style - Additional inline styles
 * @param variant - Text variant for special styling
 * @param weight - Font weight ('normal' | 'medium' | 'semibold' | 'bold')
 * @returns Styled text component with consistent typography
 */
export default function String(props: StringProps) {
  const {
    children,
    className,
    color,
    colorVariant = 'primary',
    font = 'primary',
    position,
    size,
    style,
    variant = 'body-1',
    weight,
    ...rest
  } = props;

  classNamePropsHandler(props, 'String');
  colorVariantPropsHandler(props, 'String');

  const dynamicClasses = cn(
    'flex-shrink',
    textColorVr({ color: colorVariant }),
    textPositionVr({ position }),
    textFontVr({ font, variant, weight }),
    textSizeVr({ size }),
    className,
  );

  const isTitle = variant?.startsWith('title-');
  const finalWeight = weight || (isTitle ? 'bold' : 'regular');

  const getFontFamilyStyle = () => {
    if (!font) return null;
    const styleKey = `font${font.charAt(0).toUpperCase() + font.slice(1)}${
      finalWeight.charAt(0).toUpperCase() + finalWeight.slice(1)
    }` as keyof typeof styles;

    return styles[styleKey];
  };

  const fontFamilyStyle = getFontFamilyStyle();

  const fallbackStyles = [
    styles.base,
    createStringStyles({ colorVariant, position, size, variant, weight: finalWeight }),
    fontFamilyStyle,
    style,
  ].filter(Boolean);

  return (
    <NativeText {...classNameHandler(dynamicClasses)} {...styleHandler({ defaultStyle: fallbackStyles })} {...rest}>
      {children}
    </NativeText>
  );
}
