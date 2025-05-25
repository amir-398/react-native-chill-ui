import type { VariantProps } from 'tailwind-variants';
import type { TextProps, ViewProps } from 'react-native';
import type { AnimatedProps } from 'react-native-reanimated';

import type { TIcons } from '../constants/ICONS';
import type { IconSizeVr, paddingVr } from '../components/icon/Icon';
import type {
  textColorVr,
  textFontVr,
  textPositionVr,
  textSizeVr,
  textVariantVr,
} from '../components/string/styleVatiants';

export interface StringProps extends TextProps {
  className?: string;
  onPress?: () => void;
  useFastText?: boolean;
  numberOfLines?: number;
  children?: string | React.ReactNode;
  size?: VariantProps<typeof textSizeVr>['size'];
  font?: VariantProps<typeof textFontVr>['font'];
  color?: VariantProps<typeof textColorVr>['color'];
  weight?: VariantProps<typeof textFontVr>['weight'];
  variant?: VariantProps<typeof textVariantVr>['variant'];
  position?: VariantProps<typeof textPositionVr>['position'];
}

export type AnimatedViewProps = AnimatedProps<ViewProps>;

export type IconProps = {
  onPress?: () => void;
  wrapper?: boolean;
  color?: string;
  name: keyof TIcons;
  className?: string;
  size?: VariantProps<typeof IconSizeVr>['size'];
  padding?: VariantProps<typeof paddingVr>['size'];
};

export interface ButtonIconProps extends IconProps {
  testID: string;
  iconColor: string;
  className?: string;
  onPress: () => void;
  isLoading?: boolean;
  isDisabled?: boolean;
  iconColorPressed: string;
  accessibilityLabel: string;
}
