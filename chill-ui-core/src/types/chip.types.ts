import type { VariantProps } from 'tailwind-variants';

import { ViewProps } from 'react-native-svg/lib/typescript/fabric/utils';

import type { IconProps } from './icon/icon.tw.types';
import type { StringProps } from './string/string.ss.types';
import type chipVariants from '../components/chip/Chip.variants';
import type { chipPositionVariants } from '../components/chip/Chip.variants';

import { TIcons } from '../constants/ICONS';

/**
 * Configuration for icon in Chip component
 */
interface ChipIconAction {
  /** Name of the icon to display */
  iconName?: keyof TIcons;
  /** Color of the icon */
  iconColor?: string;
  /** Size of the icon */
  iconSize?: IconProps['size'];
  /** Custom icon component to display instead of iconName */
  customIcon?: React.ReactNode;
  /** Position of the icon: 'left', 'right', or 'center' */
  position: 'left' | 'right' | 'center';
}

/**
 * Props for the Chip component
 *
 */
export type ChipProps = ViewProps & {
  /** Custom CSS classes to apply to the chip */
  className?: string;
  /** Custom background color (CSS color value) */
  color?: string;
  /** Color variant for the chip - default: 'primary' */
  colorVariant?: VariantProps<typeof chipVariants>['colorVariant'];
  /** Icon actions configuration */
  iconActions?: ChipIconAction[];
  /** Props for the string/text component */
  stringProps?: StringProps;
  /** Content to display in the chip */
  children?: React.ReactNode;
  /** Title to display in the chip */
  title?: string;
  /** Border radius variant - default: 'md' */
  rounded?: VariantProps<typeof chipVariants>['rounded'];
  /** Size variant for the chip - default: 'md' */
  size?: VariantProps<typeof chipVariants>['size'];
  /** Variant style - default: 'contained' */
  variant?: VariantProps<typeof chipVariants>['variant'];

  position?: VariantProps<typeof chipPositionVariants>['position'];
};
