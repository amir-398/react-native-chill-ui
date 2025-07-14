import { Image, Pressable, TouchableOpacity, TouchableHighlight } from 'react-native';

import cn from '../cn';
import { Box } from '../box';
import String from '../string';
import { AvatarProps } from '../../types';
import { avatarVariants, sizeVariant } from './styleVariants';

/**
 * Get user initials from firstname and lastname
 *
 * @param data - User data containing firstname and lastname
 * @returns Formatted initials string
 *
 * @example
 * ```tsx
 * getUserInitials({ firstname: 'John', lastname: 'Doe' }) // Returns 'JD'
 * getUserInitials({ firstname: 'John' }) // Returns 'J'
 * getUserInitials({}) // Returns ''
 * ```
 */
export function getUserInitials(data: { firstname?: string; lastname?: string }) {
  if (!data?.firstname) return '';
  if (!data?.lastname) return data.firstname.charAt(0).toUpperCase();
  const firstInitial = data.firstname.charAt(0).toUpperCase();
  const lastInitial = data.lastname.charAt(0).toUpperCase();
  return firstInitial + lastInitial;
}

/**
 * Avatar component displays user profile images with fallback to initials.
 * Supports different sizes, shapes, and touchable interactions.
 *
 * @example
 * ```tsx
 * <Avatar
 *   data={{
 *     firstname: 'John',
 *     lastname: 'Doe',
 *     image_url: 'https://example.com/avatar.jpg'
 *   }}
 *   size="lg"
 *   variant="circle"
 * />
 *
 * ```
 *
 * @param as - Component to use when avatar is pressable (default: 'Pressable')
 * @param backgroundColor - Custom background color
 * @param className - Custom CSS classes
 * @param data - User data containing firstname, lastname, and image_url
 * @param onPress - Callback when avatar is pressed
 * @param size - Avatar size variant (default: 'sm')
 * @param stringProps - Props for the String component displaying initials
 * @param variant - Avatar shape variant (default: 'circle')
 *
 * @see {@link https://github.com/your-repo/chill-ui/tree/main/src/components/avatar/README.md Documentation}
 */
export default function Avatar({
  as = 'Pressable',
  backgroundColor,
  className,
  data,
  onPress,
  size = 'sm',
  stringProps,
  variant = 'circle',
}: AvatarProps) {
  const initials = data?.firstname ? getUserInitials(data) : '';
  const image = data?.image_url;

  const avatarContent = (
    <Box
      className={cn(
        'bg-primary items-center justify-center overflow-hidden border border-white',
        sizeVariant({ size }),
        avatarVariants({ variant }),
        className,
      )}
      style={{ ...(backgroundColor && { backgroundColor }) }}
    >
      <String {...stringProps}>{initials}</String>
      {image && <Image className="absolute h-full w-full" source={{ uri: image }} />}
    </Box>
  );

  if (onPress) {
    switch (as) {
      case 'TouchableOpacity':
        return (
          <TouchableOpacity onPress={onPress} activeOpacity={0.7}>
            {avatarContent}
          </TouchableOpacity>
        );
      case 'TouchableHighlight':
        return (
          <TouchableHighlight onPress={onPress} underlayColor="rgba(0,0,0,0.1)">
            {avatarContent}
          </TouchableHighlight>
        );
      case 'Pressable':
      default:
        return <Pressable onPress={onPress}>{avatarContent}</Pressable>;
    }
  }

  return avatarContent;
}
