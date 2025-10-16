import type { TIcons } from '@constants';
import type { VariantProps } from 'tailwind-variants';
import type { StyleProp, ViewStyle } from 'react-native';

import type { iconSizeTv, iconPaddingTv } from '@/components/icon/styles/Icon.tw.styles';

/**
 * Props for the Icon component
 */
export type IconProps = {
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
  name: keyof TIcons;
  /** Callback function when icon is pressed */
  onPress?: () => void;
  /** Size of the press effect padding */
  pressEffectSize?: VariantProps<typeof iconPaddingTv>['size'];
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
