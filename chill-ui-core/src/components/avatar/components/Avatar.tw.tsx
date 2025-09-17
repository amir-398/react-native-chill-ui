import type { AvatarPropsTw } from '@types';

import { cn } from '@utils';
import { BoxTw } from '@components/box';
import { StringTw } from '@components/string';
import { RipplePressableTw } from '@components/ripplePressable';
import { Image, Pressable, TouchableOpacity } from 'react-native';

import avatarTv from '../styles/Avatar.variants';
import getUserInitials from '../utils/getUsersInititials';

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
 *   variant="square"
 * />
 * ```
 *
 * @param as - Component to use when avatar is pressable (default: 'Pressable') - 'pressable' | 'touchable-opacity' | 'ripple-pressable'
 * @param color - Custom background color
 * @param className - Custom CSS classes (only used with NativeWind)
 * @param data - User data containing firstname, lastname, and image_url
 * @param onPress - Callback when avatar is pressed
 * @param size - Avatar size variant (default: 'md')
 * @param stringProps - Props for the String component displaying initials
 * @param style - Custom inline styles
 * @param variant - Avatar shape variant (default: 'circle') - 'circle' | 'square'
 *
 * @see {@link https://github.com/your-repo/chill-ui/tree/main/src/components/avatar/README.md Documentation}
 */
export default function Avatar(props: AvatarPropsTw) {
  const {
    as = 'pressable',
    className,
    color,
    data,
    onPress,
    size = 'md',
    stringProps,
    style,
    variant = 'circle',
  } = props;

  const initials = data?.firstname ? getUserInitials(data) : '';
  const image = data?.image_url;

  const avatarContent = (
    <BoxTw
      style={[{ ...(color && { backgroundColor: color }) }, style]}
      className={cn(avatarTv({ size, variant }), className)}
    >
      <StringTw size={size as any} font="primarySemiBold" {...stringProps}>
        {initials}
      </StringTw>
      {image && <Image className="absolute h-full w-full" source={{ uri: image }} />}
    </BoxTw>
  );

  if (onPress) {
    switch (as) {
      case 'touchable-opacity':
        return (
          <TouchableOpacity onPress={onPress} activeOpacity={0.7}>
            {avatarContent}
          </TouchableOpacity>
        );
      case 'ripple-pressable':
        return <RipplePressableTw onPress={onPress}>{avatarContent}</RipplePressableTw>;
      case 'pressable':
      default:
        return <Pressable onPress={onPress}>{avatarContent}</Pressable>;
    }
  }

  return avatarContent;
}
