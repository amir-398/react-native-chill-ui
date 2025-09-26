import { IconPropsSs } from '@types';
import { Pressable, TouchableOpacity } from 'react-native';
import { RipplePressableSs } from '@components/ripplePressable';

import CustomIcon from './CustomIcon.ss';
import { iconDefaultProps } from '../utils/defaultProps';
import { iconSizeSv, iconPaddingSv, iconPressEffectSv, styles } from '../styles/Icon.styles';

/**
 * Icon component with StyleSheet support (fallback without NativeWind).
 * Provides SVG icons with customizable size, color, and press interactions.
 * Uses React Native's StyleSheet API for styling.
 *
 * @example
 * ```tsx
 * // Basic icon
 * <Icon name="heart-solid" />
 *
 * // Customized with size and color
 * <Icon name="star-solid" size="lg" color="#FFD700" />
 * ```
 *
 * @param name - Icon name from the available icon set (required)
 * @param size - Icon size variant: '2xs' | 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl' | '3xl' (default: 'md')
 * @param color - Icon color (default: '#000')
 * @param onPress - Callback function when icon is pressed
 * @param hasPressEffect - Whether to show press effect when pressed (default: true)
 * @param pressEffectSize - Size of the press effect padding
 * @param pressEffectStyle - Custom styles for the press effect
 * @param as - Component to use when pressable: 'pressable' | 'touchable-opacity' | 'ripple-pressable' (default: 'pressable')
 * @param style - Additional inline styles
 */
export default function Icon(props: IconPropsSs) {
  const {
    as = iconDefaultProps.as,
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
    <CustomIcon name={name} style={[iconStyle, !onPress && styles.iconBase, !onPress && style]} color={color} />
  );

  if (!onPress) {
    return iconContent;
  }

  switch (as) {
    case 'ripple-pressable':
      return (
        <RipplePressableSs style={[styles.iconBase, style]} onPress={onPress} {...rest}>
          {iconContent}
        </RipplePressableSs>
      );
    case 'touchable-opacity':
      return (
        <TouchableOpacity style={[styles.iconBase, style]} onPress={onPress} {...rest}>
          {iconContent}
        </TouchableOpacity>
      );

    case 'pressable':
    default:
      return (
        <Pressable
          style={({ pressed }) => [
            styles.iconBase,
            hasPressEffect && iconPaddingSv({ pressEffectSize: pressEffectSize ?? size }),
            iconPressEffectSv({ pressed: hasPressEffect && pressed }),
            pressed && pressEffectStyle,
            style,
          ]}
          onPress={onPress}
          {...rest}
        >
          {iconContent}
        </Pressable>
      );
  }
}
