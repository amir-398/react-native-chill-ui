import { TIcons } from '@constants';
import { VariantProps } from '@utils';
import { StyleProp, ViewStyle } from 'react-native';
import { chipSv } from '@components/chip/styles/Chip.ss.styles';

import type { IconProps } from '../icon/icon.ss.types';
import type { StringProps } from '../string/string.ss.types';

type ChipTouchableComponentType = 'touchable-opacity' | 'pressable' | 'ripple-pressable' | 'scale-pressable';

/**
 * Props for the Chip component
 *
 */
export type ChipProps = VariantProps<typeof chipSv> & {
  /** Type of touchable component to use when onPress is provided */
  as?: ChipTouchableComponentType;

  /** Custom background color (CSS color value) */
  color?: string;

  /** Left icon configuration */
  leftIconAction?: {
    customIcon?: React.ReactNode;
    name?: keyof TIcons;
    color?: string;
    size?: IconProps['size'];
  };
  /** Press callback function for the chip */
  onPress?: () => void;

  /** Right icon configuration */
  rightIconAction?: {
    customIcon?: React.ReactNode;
    name?: keyof TIcons;
    color?: string;
    size?: IconProps['size'];
  };

  /** Props for the string/text component */
  stringProps?: StringProps;
  /** Title to display in the chip */
  title?: string;

  /** Size variant for the chip - default: 'md' */
  size?: StringProps['size'];

  /** Variant style - default: 'contained' */
  style?: StyleProp<ViewStyle>;
};
