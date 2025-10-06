import type { StringPropsTw } from '@types';
import type { VariantProps } from 'tailwind-variants';
import type { StyleProp, ViewStyle } from 'react-native';
import type { avatarTv } from '@/components/avatar/styles/Avatar.tw.styles';

/**
 * Props for Avatar component
 *
 */
export interface AvatarProps {
  /** Custom CSS classes */
  className?: string;
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
  stringProps?: StringPropsTw;
  /** Custom inline styles */
  style?: StyleProp<ViewStyle>;
  /** Component to use when avatar is pressable - default: 'Pressable' */
  as?: 'pressable' | 'touchable-opacity' | 'ripple-pressable';
  /** Avatar size variant */
  size?: VariantProps<typeof avatarTv>['size'];
  /** Avatar shape variant */
  variant?: VariantProps<typeof avatarTv>['variant'];
}
