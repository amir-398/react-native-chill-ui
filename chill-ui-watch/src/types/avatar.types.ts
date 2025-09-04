import type { VariantProps } from 'tailwind-variants';

import { StyleProp, ViewStyle } from 'react-native';

import type { SvVariantProps } from '@/utils/styleSheetVariants';
import type { AvatarSv } from '@/components/avatar/styles/Avatar.styles';

import type { StringProps } from './string.types';
import type { avatarVariants, sizeVariant } from '../components/avatar/styles/Avatar.variants';

/**
 * Props for Avatar component
 *
 */
export interface AvatarBaseProps {
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
  stringProps?: StringProps;
  /** Component to use when avatar is pressable - default: 'Pressable' */
  as?: 'pressable' | 'touchable-opacity' | 'ripple-pressable';
  // Style
  style?: StyleProp<ViewStyle>;
}

export interface AvatarTwProps extends AvatarBaseProps {
  className?: string;
  /** Avatar size variant */
  size?: VariantProps<typeof sizeVariant>['size'];
  /** Avatar shape variant */
  variant?: VariantProps<typeof avatarVariants>['variant'];
}

export type AvatarSsProps = AvatarBaseProps & SvVariantProps<typeof AvatarSv>;

export type AvatarProps = AvatarTwProps | AvatarSsProps;
