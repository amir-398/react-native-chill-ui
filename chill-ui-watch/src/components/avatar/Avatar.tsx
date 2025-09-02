import { Image, Pressable, TouchableOpacity, TouchableHighlight, StyleSheet } from 'react-native';

import cn from '../cn';
import { Box } from '../box';
import String from '../string';
import { AvatarProps } from '../../types';
import { avatarVariants, sizeVariant } from './Avatar.variants';
import { isNativeWindInstalled } from '../../utils/nativewindDetector';

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
 * Creates StyleSheet styles equivalent to NativeWind classes
 * Used as fallback when NativeWind is not available
 */
const createAvatarStyles = (size: string, variant: string, backgroundColor?: string) => {
  // Size mappings (equivalent to Tailwind classes)
  const sizeMap: Record<string, { height: number; width: number }> = {
    '2xl': { height: 112, width: 112 },
    '2xs': { height: 24, width: 24 },
    '3xl': { height: 128, width: 128 },
    lg: { height: 64, width: 64 },
    md: { height: 56, width: 56 },
    sm: { height: 48, width: 48 },
    xl: { height: 80, width: 80 },
    xs: { height: 36, width: 36 },
  };

  // Variant mappings
  const variantMap: Record<string, { borderRadius: number }> = {
    circle: { borderRadius: 9999 }, // rounded-full equivalent
    square: { borderRadius: 8 }, // rounded-lg equivalent
  };

  const sizeStyle = sizeMap[size] || sizeMap.sm;
  const variantStyle = variantMap[variant] || variantMap.circle;

  return StyleSheet.create({
    avatar: {
      alignItems: 'center',
      backgroundColor: backgroundColor || '#7DD3FC', // primary color fallback
      borderColor: 'white',
      borderWidth: 1,
      justifyContent: 'center',
      overflow: 'hidden',
      ...sizeStyle,
      ...variantStyle,
    },
    image: {
      height: '100%',
      position: 'absolute',
      width: '100%',
    },
  });
};

/**
 * Avatar component displays user profile images with fallback to initials.
 * Supports different sizes, shapes, and touchable interactions.
 * Automatically detects NativeWind availability and falls back to StyleSheet if needed.
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
 * @param className - Custom CSS classes (only used with NativeWind)
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

  // Create styles based on whether NativeWind is available
  const styles = createAvatarStyles(size, variant, backgroundColor);

  const avatarContent = isNativeWindInstalled() ? (
    // NativeWind approach
    <Box
      className={cn(
        'bg-primary items-center justify-center overflow-hidden border border-white',
        sizeVariant({ size }),
        avatarVariants({ variant }),
        className,
      )}
      style={{ ...(backgroundColor && { backgroundColor }) }}
    >
      <String size={size as any} {...stringProps}>
        {initials}
      </String>
      {/* @ts-ignore */}
      {image && <Image className="absolute h-full w-full" source={{ uri: image }} />}
    </Box>
  ) : (
    // StyleSheet approach
    <Box style={styles.avatar}>
      <String size={size as any} {...stringProps}>
        {initials}
      </String>
      {image && <Image style={styles.image} source={{ uri: image }} />}
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
