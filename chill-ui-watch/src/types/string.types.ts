import type { TextProps } from 'react-native';
import type { VariantProps } from 'tailwind-variants';

import type { textColorVr, textFontVr, textPositionVr, textSizeVr } from '../components/string/styleVariants';

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
  /** Text content to display */
  children?: string | React.ReactNode;
  /** Size variant for the text */
  size?: VariantProps<typeof textSizeVr>['size'];
  /** Font family variant */
  font?: VariantProps<typeof textFontVr>['font'];
  /** Font weight variant */
  weight?: VariantProps<typeof textFontVr>['weight'];
  /** Text style variant */
  variant?: VariantProps<typeof textFontVr>['variant'];
  /** Color variant for the text */
  colorVariant?: VariantProps<typeof textColorVr>['color'];
  /** Text alignment position */
  position?: VariantProps<typeof textPositionVr>['position'];
}
