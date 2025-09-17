import type { VariantProps } from 'tailwind-variants';

import { StyleProp, ViewStyle } from 'react-native';

import type { TIcons } from '../constants/ICONS';
import type { IconSizeVr, paddingVr } from '../components/icon/Icon';

/**
 * Props for the Icon component
 */
export type IconProps = {
  /** Callback function when icon is pressed */
  onPress?: () => void;
  /** Whether to show press effect when icon is pressed */
  hasPressEffect?: boolean;
  /** Custom CSS classes for the press effect */
  pressEffectClassName?: string;
  /** Size of the press effect padding */
  pressEffectSize?: VariantProps<typeof paddingVr>['size'];
  /** Color of the icon (CSS color value) */
  color?: string;
  /** Icon name from the available icon set */
  name: keyof TIcons;
  /** Custom CSS classes for the icon */
  className?: string;
  /** Size variant for the icon */
  size?: VariantProps<typeof IconSizeVr>['size'];
  /** Padding size for the icon (deprecated, use pressEffectSize instead) */
  padding?: VariantProps<typeof paddingVr>['size'];
  /** Inline styles for the icon */
  style?: StyleProp<ViewStyle>;

  /** Custom component to render instead of the default icon */
  as?: 'Pressable' | 'TouchableOpacity' | 'RipplePressable';
};
