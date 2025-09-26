import type { IconPropsTw } from '@types';

import { cn } from '@utils';
import { Pressable, TouchableOpacity } from 'react-native';
import { RipplePressable } from '@components/ripplePressable';

import { BoxTw } from '@/components/box';

import CustomIcon from './CustomIcon.tw';
import { iconDefaultProps } from '../utils/defaultProps';
import { iconSizeTv, iconClassname, iconPressableTv, iconPaddingTv } from '../styles/Icon.variants';

/**
 * Icon component with NativeWind support.
 * Provides SVG icons with customizable size, color, and press interactions.
 *
 * @example
 * ```tsx
 * // Basic icon
 * <Icon name="heart-solid" />
 *
 * // Customized with size and color
 * <Icon name="star-solid" size="lg" color="#FFD700" />
 *
 * @param name - Icon name from the available icon set (required)
 * @param size - Icon size variant: '2xs' | 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl' | '3xl' (default: 'md')
 * @param color - Icon color (default: '#000')
 * @param onPress - Callback function when icon is pressed
 * @param hasPressEffect - Whether to show press effect when pressed (default: true)
 * @param pressEffectSize - Size of the press effect padding
 * @param as - Component to use when pressable: 'pressable' | 'touchable-opacity' | 'ripple-pressable' (default: 'pressable')
 * @param className - Custom CSS classes (used with NativeWind)
 * @param style - Additional inline styles
 */
export default function Icon(props: IconPropsTw) {
  const {
    as,
    className,
    color = iconDefaultProps.color,
    hasPressEffect = iconDefaultProps.hasPressEffect,
    name,
    onPress,
    pressEffectSize,
    size = iconDefaultProps.size,
    style,
  } = props;

  const iconContent = (
    <CustomIcon
      name={name}
      className={cn(iconSizeTv({ size }), { [cn(iconClassname)]: !onPress }, className)}
      style={!onPress ? style : undefined}
      color={color}
    />
  );

  if (!onPress) {
    return iconContent;
  }

  switch (as) {
    case 'ripple-pressable':
      return (
        <RipplePressable className={cn(iconClassname, className)} style={style} onPress={onPress}>
          {iconContent}
        </RipplePressable>
      );
    case 'touchable-opacity':
      return (
        <TouchableOpacity className={cn(iconClassname, className)} style={style} onPress={onPress}>
          {iconContent}
        </TouchableOpacity>
      );

    case 'pressable':
    default:
      return (
        <BoxTw className="shrink">
          <Pressable
            className={cn(
              iconClassname,
              iconPressableTv({ hasPressEffect }),
              hasPressEffect && iconPaddingTv({ size: pressEffectSize ?? size }),
              className,
            )}
            style={{}}
            onPress={onPress}
          >
            {iconContent}
          </Pressable>
        </BoxTw>
      );
  }
}
