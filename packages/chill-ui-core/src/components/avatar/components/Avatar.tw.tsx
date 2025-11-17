import type { AvatarPropsTw } from '@types';

import { cn } from '@utils';
import { BoxTw } from '@components/box';
import { StringTw } from '@components/string';
import { RipplePressableTw } from '@components/ripplePressable';
import { Image, Pressable, TouchableOpacity } from 'react-native';

import { useAvatar } from '../hooks/useAvatar';
import { avatarDefaultProps } from '../utils/defaultProps';
import { avatarTv, twStyles } from '../styles/Avatar.tw.styles';

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
    as = avatarDefaultProps.as,
    className,
    color,
    data,
    onPress,
    size = avatarDefaultProps.size,
    stringProps,
    style,
    variant = avatarDefaultProps.variant,
  } = props;

  const { image, initials } = useAvatar(data);

  const avatarContent = (
    <>
      <StringTw size={size as any} font="primarySemiBold" {...stringProps}>
        {initials}
      </StringTw>
      {image && <Image className={twStyles.avatarImage} source={{ uri: image }} />}
    </>
  );

  const commonProps = {
    className: cn(avatarTv({ size: size as any, variant: variant as any }), className),
    onPress: onPress || undefined,
    style: [{ ...(color && { backgroundColor: color }) }, style],
  };

  if (onPress) {
    switch (as) {
      case 'touchable-opacity':
        return <TouchableOpacity {...commonProps}>{avatarContent}</TouchableOpacity>;
      case 'ripple-pressable':
        return <RipplePressableTw {...commonProps}>{avatarContent}</RipplePressableTw>;
      case 'pressable':
      default:
        return <Pressable {...commonProps}>{avatarContent}</Pressable>;
    }
  }

  return <BoxTw {...commonProps}>{avatarContent}</BoxTw>;
}
