import type { AvatarPropsSs } from '@types';

import { BoxSs } from '@components/box';
import { StringSs } from '@components/string';
import { RipplePressableSs } from '@components/ripplePressable';
import { Image, Pressable, TouchableOpacity } from 'react-native';

import getUserInitials from '../utils/getUsersInititials';
import { AvatarSv, styles } from '../styles/Avatar.styles';

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
 * @param data - User data containing firstname, lastname, and image_url
 * @param onPress - Callback when avatar is pressed
 * @param size - Avatar size variant (default: 'md')
 * @param stringProps - Props for the String component displaying initials
 * @param style - Custom inline styles
 * @param variant - Avatar shape variant (default: 'circle') - 'circle' | 'square'
 *
 * @see {@link https://github.com/your-repo/chill-ui/tree/main/src/components/avatar/README.md Documentation}
 */
export default function Avatar(props: AvatarPropsSs) {
  const { as = 'pressable', color, data, onPress, size = 'md', stringProps, style, variant = 'circle' } = props;

  const initials = data?.firstname ? getUserInitials(data) : '';
  const image = data?.image_url;

  const avaratStyle = AvatarSv({ size, variant });

  const avatarContent = (
    <BoxSs style={[{ ...(color && { backgroundColor: color }) }, avaratStyle, style]}>
      <StringSs size={size as any} font="primarySemiBold" {...stringProps}>
        {initials}
      </StringSs>
      {image && <Image style={styles.image} source={{ uri: image }} />}
    </BoxSs>
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
        return <RipplePressableSs onPress={onPress}>{avatarContent}</RipplePressableSs>;
      case 'pressable':
      default:
        return <Pressable onPress={onPress}>{avatarContent}</Pressable>;
    }
  }

  return avatarContent;
}
