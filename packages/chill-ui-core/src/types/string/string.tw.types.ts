import type { TextProps } from 'react-native';
import type { VariantProps } from 'tailwind-variants';
import type { stringTv } from '@components/string/styles/String.tw.styles';

/**
 * Props for the String component
 */
export type StringProps = TextProps & {
  /** Custom CSS classes for additional styling (NativeWind only) */
  className?: string;
  /** Custom color override (hex, rgb, etc.) */
  color?: string;
  /** Callback when text is pressed */
  onPress?: () => void;
  /** Whether to use fast text rendering */
  useFastText?: boolean;

  /**
   * Variant of the text
   */
  variant?: VariantProps<typeof stringTv>['variant'];

  /**
   * Size of the text
   */
  size?: VariantProps<typeof stringTv>['size'];

  /**
   * Position of the text
   */
  position?: VariantProps<typeof stringTv>['position'];

  /**
   * Color variant of the text (NativeWind only)
   */
  colorVariant?: VariantProps<typeof stringTv>['colorVariant'];

  /**
   * Font of the text (NativeWind only)
   */
  font?: VariantProps<typeof stringTv>['font'];
};
