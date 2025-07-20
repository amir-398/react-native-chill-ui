import type { StringProps } from '../../types';

import cn from '../cn';
import { Text as NativeText } from './Text';
import { textColorVr, textFontVr, textPositionVr, textSizeVr, textVariantVr } from './styleVatiants';

/**
 * String component that provides a high-level text component with predefined styling variants.
 * Offers consistent typography with customizable size, color, font, weight, and position options.
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
  const { children, className, color, colorVariant = 'primary', font, position, size, style, variant, weight } = props;

  /** Dynamic classes generated from props using Tailwind variants */
  const dynamicClasses = cn(
    'flex-shrink',
    textSizeVr({ size }),
    textFontVr({ font, weight }),
    textColorVr({ color: colorVariant }),
    textPositionVr({ position }),
    textVariantVr({ variant }),
    className,
  );

  return (
    <NativeText {...props} className={dynamicClasses} style={[{ ...(color && { color }) }, style]}>
      {children}
    </NativeText>
  );
}
