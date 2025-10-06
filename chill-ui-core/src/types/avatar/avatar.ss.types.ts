import type { VariantProps } from '@utils';
import type { StyleProp, ViewStyle } from 'react-native';

import type { AvatarSv } from '@/components/avatar/styles/Avatar.ss.styles';

import type { StringPropsSs } from '../string';

export type AvatarProps = VariantProps<typeof AvatarSv> & {
  /** Callback when avatar is pressed */
  onPress?: () => void;
  /** User data for avatar display */
  data: {
    /** User's first name */
    firstname?: string;
    /** User's last name */
    lastname?: string;
    /** User's profile image URL */
    image_url?: string;
  };
  /** Custom background color */
  color?: string;
  /** Props for the String component displaying initials */
  stringProps?: StringPropsSs;
  /** Custom inline styles */
  style?: StyleProp<ViewStyle>;
  /** Component to use when avatar is pressable - default: 'Pressable' */
  as?: 'pressable' | 'touchable-opacity' | 'ripple-pressable';
};
