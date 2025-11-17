import type { VariantProps } from 'tailwind-variants';
import type { StyleProp, ViewStyle } from 'react-native';
import type { IconConfig } from '@components/icon/context/IconContext';
import type { iconSizeTv, iconPaddingTv } from '@components/icon/styles/Icon.tw.styles';

import { ICONS } from '@constants';

/**
 * Props for the Icon component
 */
export type IconProps<T extends IconConfig = typeof ICONS> = {
  /** Component to use when pressable:
   * - `'pressable'`
   * - `'touchable-opacity'`
   * - `'ripple-pressable'`
   */
  as?: 'pressable' | 'touchable-opacity' | 'ripple-pressable';
  /** Custom CSS classes for the icon container (NativeWind) */
  className?: string;
  /** Icon color (default: '#000') */
  color?: string;
  /** Whether to show press effect when pressed */
  hasPressEffect?: boolean;
  /** Icon name from the available icon set (required) */
  name: keyof T | keyof typeof ICONS;
  /** Callback function when icon is pressed */
  onPress?: () => void;
  /** Size of the press effect padding */
  pressEffectSize?: VariantProps<typeof iconPaddingTv>['size'];
  /** Inline styles for the press effect */
  pressEffectStyle?: StyleProp<ViewStyle>;
  /** Icon size variant:
   * - `'2xs'`
   * - `'xs'`
   * - `'sm'`
   * - `'md'`
   * - `'lg'`
   * - `'xl'`
   * - `'2xl'`
   * - `'3xl'`
   */
  size?: VariantProps<typeof iconSizeTv>['size'];
  /** Additional inline styles */
  style?: StyleProp<ViewStyle>;
};
