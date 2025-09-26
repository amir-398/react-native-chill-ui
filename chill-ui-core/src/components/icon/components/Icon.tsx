import { IconProps } from '@types';
import { Pressable, TouchableOpacity } from 'react-native';
import { RipplePressable } from '@components/ripplePressable';
import { cn, classNamePropsHandler, classNameHandler, styleHandler } from '@utils';

import CustomIcon from './CustomIcon';
import { iconDefaultProps } from '../utils/defaultProps';
import { iconSizeSv, iconPaddingSv, iconPressEffectSv, styles } from '../styles/Icon.styles';
import { iconSizeTv, iconPaddingTv, iconPressableTv, iconClassname } from '../styles/Icon.variants';

/**
 * Icon component that displays SVG icons with customizable size, color, and press interactions.
 * Supports both static and interactive icons with press effects.
 * Automatically detects NativeWind availability and falls back to StyleSheet if needed.
 *
 * @example
 * ```tsx
 * // Basic icon
 * <Icon name="heart-solid" />
 *
 * // Customized with size and color
 * <Icon name="star-solid" size="lg" color="#FFD700" />
 * ```
 * @param name - Icon name from the available icon set (required)
 * @param size - Icon size variant: '2xs' | 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl' | '3xl' (default: 'md')
 * @param color - Icon color (default: '#000')
 * @param onPress - Callback function when icon is pressed
 * @param hasPressEffect - Whether to show press effect when pressed (default: true)
 * @param pressEffectSize - Size of the press effect padding
 * @param pressEffectStyle - Custom styles for the press effect
 * @param as - Component to use when pressable: 'pressable' | 'touchable-opacity' | 'ripple-pressable' (default: 'pressable')
 * @param className - Custom CSS classes (used with NativeWind)
 * @param style - Additional inline styles
 */
export default function Icon(props: IconProps) {
  classNamePropsHandler(props, 'Icon');

  const {
    as = iconDefaultProps.as,
    className,
    color = iconDefaultProps.color,
    hasPressEffect = iconDefaultProps.hasPressEffect,
    name,
    onPress,
    pressEffectSize,
    pressEffectStyle,
    size = iconDefaultProps.size,
    style,
    ...rest
  } = props;

  const iconStyle = iconSizeSv({ size });

  const iconContent = (
    <CustomIcon
      name={name}
      {...classNameHandler(cn(iconSizeTv({ size }), { [cn(iconClassname, className)]: !onPress }))}
      {...styleHandler({ defaultStyle: [iconStyle, !onPress && styles.iconBase], style: !onPress ? style : undefined })}
      color={color}
    />
  );

  if (!onPress) {
    return iconContent;
  }

  switch (as) {
    case 'ripple-pressable':
      return (
        <RipplePressable
          {...classNameHandler(cn(iconClassname, className))}
          {...styleHandler({ style })}
          onPress={onPress}
          {...rest}
        >
          {iconContent}
        </RipplePressable>
      );
    case 'touchable-opacity':
      return (
        <TouchableOpacity
          {...classNameHandler(cn(iconClassname, className))}
          {...styleHandler({ style })}
          onPress={onPress}
          {...rest}
        >
          {iconContent}
        </TouchableOpacity>
      );

    case 'pressable':
    default:
      return (
        <Pressable
          {...classNameHandler(
            cn(
              iconClassname,
              iconPressableTv({ hasPressEffect }),
              hasPressEffect && iconPaddingTv({ size: pressEffectSize ?? size }),
              className,
            ),
          )}
          style={({ pressed }) =>
            styleHandler({
              defaultStyle: [
                styles.iconBase,
                hasPressEffect && iconPaddingSv({ pressEffectSize: pressEffectSize ?? size }),
                iconPressEffectSv({ pressed: hasPressEffect && pressed }),
              ],
              style: [pressed && pressEffectStyle, style],
            }).style
          }
          onPress={onPress}
          {...rest}
        >
          {iconContent}
        </Pressable>
      );
  }
}
