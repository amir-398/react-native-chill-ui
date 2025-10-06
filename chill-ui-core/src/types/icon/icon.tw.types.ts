import type { TIcons } from '@constants';
import type { VariantProps } from 'tailwind-variants';
import type { StyleProp, ViewStyle } from 'react-native';
import type { iconSizeTv, iconPaddingTv } from '@/components/icon/styles/Icon.tw.styles';

/**
 * Props for the Icon component
 */
export type IconProps = {
  /** Callback function when icon is pressed */
  onPress?: () => void;
  /** Whether to show press effect when icon is pressed */
  hasPressEffect?: boolean;
  /** Size of the press effect padding */
  pressEffectSize?: VariantProps<typeof iconPaddingTv>['size'];
  /** Color of the icon (CSS color value) */
  color?: string;
  /** Icon name from the available icon set */
  name: keyof TIcons;
  /** Custom CSS classes for the icon */
  className?: string;
  /** Size variant for the icon */
  size?: VariantProps<typeof iconSizeTv>['size'];
  /** Inline styles for the icon */
  style?: StyleProp<ViewStyle>;
  /** Custom component to render instead of the default icon */
  as?: 'pressable' | 'touchable-opacity' | 'ripple-pressable';
};
