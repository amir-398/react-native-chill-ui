import type { TextProps } from 'react-native';
import type { VariantProps } from 'tailwind-variants';

import type stringTv from '../../components/string/styles/String.tw.styles';

/**
 * Props for the String component
 */
export interface StringProps extends TextProps {
  /** Custom color for the text */
  color?: string;
  /** Custom CSS classes for the text */
  className?: string;
  /** Callback when text is pressed */
  onPress?: () => void;
  /** Whether to use fast text rendering */
  useFastText?: boolean;
  /** Size variant for the text */
  size?: VariantProps<typeof stringTv>['size'];
  /** Font family variant */
  font?: VariantProps<typeof stringTv>['font'];
  /** Text style variant */
  variant?: VariantProps<typeof stringTv>['variant'];
  /** Color variant for the text */
  colorVariant?: VariantProps<typeof stringTv>['color'];
  /** Text alignment position */
  position?: VariantProps<typeof stringTv>['position'];
}
