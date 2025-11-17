import type { StringPropsTw } from '@types';
import type { VariantProps } from 'tailwind-variants';
import type { StyleProp, ViewStyle } from 'react-native';

import type { avatarTv } from '@/components/avatar/styles/Avatar.tw.styles';

/**
 * Props for Avatar component
 */
export interface AvatarProps {
  /** Component to use when avatar is pressable:
   * - `'pressable'`
   * - `'touchable-opacity'`
   * - `'ripple-pressable'`
   */
  as?: 'pressable' | 'touchable-opacity' | 'ripple-pressable';
  /** Custom CSS classes for the avatar container (NativeWind) */
  className?: string;
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
  /** Avatar size variant:
   * - `'2xs'`
   * - `'xs'`
   * - `'sm'`
   * - `'md'`
   * - `'lg'`
   * - `'xl'`
   * - `'2xl'`
   */
  size?: VariantProps<typeof avatarTv>['size'];
  /** Props for the String component displaying initials */
  stringProps?: StringPropsTw;
  /** Custom inline styles */
  style?: StyleProp<ViewStyle>;
  /** Avatar shape variant:
   * - `'circle'`
   * - `'square'`
   */
  variant?: VariantProps<typeof avatarTv>['variant'];
}
