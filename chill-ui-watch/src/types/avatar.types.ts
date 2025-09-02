import type { VariantProps } from 'tailwind-variants';

import type { StringProps } from './string.types';
import type { avatarVariants, sizeVariant } from '../components/avatar/Avatar.variants';

/**
 * Props for Avatar component
 *
 */
export type AvatarProps = {
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
  backgroundColor?: string;
  /** Custom text color */
  textColor?: string;
  /** Avatar size variant */
  size?: VariantProps<typeof sizeVariant>['size'];
  /** Props for the String component displaying initials */
  stringProps?: StringProps;
  /** Avatar shape variant */
  variant?: VariantProps<typeof avatarVariants>['variant'];
  /** Component to use when avatar is pressable - default: 'Pressable' */
  as?: 'Pressable' | 'TouchableOpacity' | 'TouchableHighlight';
};
