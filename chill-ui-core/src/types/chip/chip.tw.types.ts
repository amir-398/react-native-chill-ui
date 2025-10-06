import type { VariantProps } from 'tailwind-variants';

import { TIcons } from '@constants';
import { StyleProp, ViewStyle } from 'react-native';
import { chipTv } from '@components/chip/styles/Chip.tw.styles';

import type { IconProps } from '../icon/icon.tw.types';
import type { StringProps } from '../string/string.tw.types';

export type TouchableComponentType = 'touchable-opacity' | 'pressable' | 'ripple-pressable' | 'scale-pressable';

/**
 * Props for the Chip component
 *
 */
export type ChipProps = VariantProps<typeof chipTv> & {
  /** Type of touchable component to use when onPress is provided */
  as?: TouchableComponentType;
  /** Custom CSS classes to apply to the chip */
  className?: string;
  /** Custom background color (CSS color value) */
  color?: string;

  /** Left icon configuration */
  leftIconAction?: {
    /** Custom icon component to display instead of name */
    customIcon?: React.ReactNode;
    /** Icon name from the available icon set */
    name?: keyof TIcons;
    /** Color of the icon */
    color?: string;
    /** Size of the icon */
    size?: IconProps['size'];
  };
  /** Press callback function for the chip */
  onPress?: () => void;

  /** Right icon configuration */
  rightIconAction?: {
    /** Custom icon component to display instead of name */
    customIcon?: React.ReactNode;
    /** Icon name from the available icon set */
    name?: keyof TIcons;
    /** Color of the icon */
    color?: string;
    /** Size of the icon */
    size?: IconProps['size'];
  };
  /** Props for the string/text component */
  stringProps?: StringProps;
  /** Content to display in the chip */
  children?: React.ReactNode;
  /** Title to display in the chip */
  title?: string;

  /** Size variant for the chip - default: 'md' */
  size?: StringProps['size'];

  /** Variant style - default: 'contained' */
  style?: StyleProp<ViewStyle>;
};
