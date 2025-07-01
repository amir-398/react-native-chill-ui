import type { TextProps } from 'react-native';
import type { VariantProps } from 'tailwind-variants';

import type {
  textColorVr,
  textFontVr,
  textPositionVr,
  textSizeVr,
  textVariantVr,
} from '../components/string/styleVatiants';

export interface StringProps extends TextProps {
  color?: string;
  className?: string;
  onPress?: () => void;
  useFastText?: boolean;
  numberOfLines?: number;
  children?: string | React.ReactNode;
  size?: VariantProps<typeof textSizeVr>['size'];
  font?: VariantProps<typeof textFontVr>['font'];
  weight?: VariantProps<typeof textFontVr>['weight'];
  variant?: VariantProps<typeof textVariantVr>['variant'];
  colorVariant?: VariantProps<typeof textColorVr>['color'];
  position?: VariantProps<typeof textPositionVr>['position'];
}
