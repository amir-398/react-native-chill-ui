import type { StringPropsTw } from '@types';

import { cn } from '@utils';
import { PropsWithChildren } from 'react';

import { Text as NativeText } from './Text.tw';
import { stringTv, twStyles } from '../styles/String.tw.styles';

/**
 * The `<String />` component provides a high-level text component with predefined styling variants.
 * Offers consistent typography with customizable size, color, font, and position options using NativeWind.
 *
 *
 * <!-- STORYBOOK_IMPORT_START
 * ```tsx
 * import { String } from 'react-native-chill-ui';
 * ```
 * STORYBOOK_IMPORT_END -->
 *
 * @example
 * ```tsx
 * <String>Hello World</String>
 * ```
 *
 * @param children - Text content to display
 * @param className - Custom CSS classes for additional styling (NativeWind)
 * @param color - Custom color override (hex, rgb, etc.)
 * @param colorVariant - Predefined color variant: 'primary' | 'secondary' | 'success' | 'warning' | 'error' | 'info' | 'accent' | 'dark' | 'light' | 'danger' | 'neutral' | 'muted' | 'tertiary' | 'inverted' | 'white' (default: 'primary')
 * @param font - Font family to use
 * @param onPress - Callback when text is pressed
 * @param position - Text alignment position: 'left' | 'center' | 'right'
 * @param size - Text size variant: '2xs' | 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl' | '3xl' | '4xl' | '5xl' | '6xl' | '7xl' | '8xl' | '9xl'
 * @param style - Additional inline styles
 * @param variant - Text variant for special styling
 */
export default function String(props: PropsWithChildren<StringPropsTw>) {
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

  const dynamicClasses = cn(
    stringTv({ colorVariant, font, position, size, variant }),
    !onPress && twStyles.pointerEventsNone,
    className,
  );

  return (
    <NativeText className={dynamicClasses} style={[color && { color }, style]} onPress={onPress} {...rest}>
      {children}
    </NativeText>
  );
}
