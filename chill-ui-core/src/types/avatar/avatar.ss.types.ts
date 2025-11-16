import type { VariantProps } from '@utils';
import type { StyleProp, ViewStyle } from 'react-native';

import type { AvatarSv } from '@/components/avatar/styles/Avatar.ss.styles';

import type { StringPropsSs } from '../string';

export type AvatarProps = VariantProps<typeof AvatarSv> & {
  /** Component to use when avatar is pressable:
   * - `'pressable'`
   * - `'touchable-opacity'`
   * - `'ripple-pressable'`
   */
  as?: 'pressable' | 'touchable-opacity' | 'ripple-pressable';
  /** Custom background color */
  color?: string;
  /** User data for avatar display */
  data: {
    /** User's first name */
    firstname?: string;
    /** User's last name */
    lastname?: string;
    /** User's profile image URL */
    image_url?: string;
  };
  /** Callback when avatar is pressed */
  onPress?: () => void;

  /** Props for the String component displaying initials */
  stringProps?: StringPropsSs;
  /** Custom inline styles */
  style?: StyleProp<ViewStyle>;
};
