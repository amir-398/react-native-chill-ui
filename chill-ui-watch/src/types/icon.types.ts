import type { VariantProps } from 'tailwind-variants';

import type { TIcons } from '../constants/ICONS';
import type { IconSizeVr, paddingVr } from '../components/icon/Icon';

export type IconProps = {
  onPress?: () => void;
  hasPressEffect?: boolean;
  pressEffectClassName?: string;
  pressEffectSize?: VariantProps<typeof paddingVr>['size'];
  color?: string;
  name: keyof TIcons;
  className?: string;
  size?: VariantProps<typeof IconSizeVr>['size'];
  padding?: VariantProps<typeof paddingVr>['size'];
};

export interface ButtonIconProps extends IconProps {
  iconColor: string;
  className?: string;
  onPress: () => void;
  isLoading?: boolean;
  isDisabled?: boolean;
  iconName: keyof TIcons;
  iconColorPressed: string;
  accessibilityLabel: string;
  size?: VariantProps<typeof IconSizeVr>['size'];
}
