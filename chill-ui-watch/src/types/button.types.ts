import type { VariantProps } from 'tailwind-variants';
import type { TouchableOpacityProps } from 'react-native';

import type { TIcons } from '../constants/ICONS';
import type { StringProps } from './string.types';

import { btnVariant, heightVr, positionVr } from '../components/button/styleVariants';

export interface BtnProps extends TouchableOpacityProps {
  title?: string;
  loading?: boolean;
  disabled?: boolean;
  onPress?: () => void;
  btnClassName?: string;
  textClassName?: string;
  leftIcon?: keyof TIcons;
  textLeftIcon?: React.ReactNode;
  textSize?: StringProps['size'];
  textWeight?: StringProps['weight'];
  size?: VariantProps<typeof heightVr>['size'];
  variant?: VariantProps<typeof btnVariant>['variant'];
  position?: VariantProps<typeof positionVr>['position'];
}
