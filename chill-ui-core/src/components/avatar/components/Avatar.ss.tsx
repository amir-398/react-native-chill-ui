import type { AvatarPropsSs } from '@types';

import { BoxSs } from '@components/box';
import { StringSs } from '@components/string';
import { RipplePressableSs } from '@components/ripplePressable';
import { Image, Pressable, TouchableOpacity } from 'react-native';

import { useAvatar } from '../hooks/useAvatar';
import { avatarDefaultProps } from '../utils/defaultProps';
import { AvatarSv, styles } from '../styles/Avatar.ss.styles';

/**
 * The <Avatar /> component displays user profile images with fallback to initials.
 * Supports different sizes, shapes, and touchable interactions.
 *
 * <!-- STORYBOOK_IMPORT_START
 * ```tsx
 * import { Avatar } from 'react-native-chill-ui';
 * ```
 * STORYBOOK_IMPORT_END -->
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
  const {
    as = avatarDefaultProps.as,
    color,
    data,
    onPress,
    size = avatarDefaultProps.size,
    stringProps,
    style,
    variant = avatarDefaultProps.variant,
  } = props;

  const { image, initials } = useAvatar(data);

  const avatarStyle = AvatarSv({ size, variant });

  const avatarContent = (
    <>
      <StringSs size={size as any} font="primarySemiBold" {...stringProps}>
        {initials}
      </StringSs>
      {image && <Image style={styles.image} source={{ uri: image }} />}
    </>
  );

  const commonProps = {
    onPress: onPress || undefined,
    style: [{ ...(color && { backgroundColor: color }) }, avatarStyle, style],
  };

  if (onPress) {
    switch (as) {
      case 'touchable-opacity':
        return <TouchableOpacity {...commonProps}>{avatarContent}</TouchableOpacity>;
      case 'ripple-pressable':
        return <RipplePressableSs {...commonProps}>{avatarContent}</RipplePressableSs>;
      case 'pressable':
      default:
        return <Pressable {...commonProps}>{avatarContent}</Pressable>;
    }
  }

  return (
    <BoxSs {...commonProps}>
      <StringSs size={size as any} font="primarySemiBold" {...stringProps}>
        {initials}
      </StringSs>
      {image && <Image style={styles.image} source={{ uri: image }} />}
    </BoxSs>
  );
}
