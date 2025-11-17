import { IconPropsSs } from '@types';
import { BoxSs } from '@components/box';
import { Pressable, TouchableOpacity } from 'react-native';
import { RipplePressableSs } from '@components/ripplePressable';
import { IconConfig } from '@components/icon/context/IconContext';

import CustomIcon from './CustomIcon.ss';
import { iconDefaultProps } from '../utils/defaultProps';
import { iconSizeSv, iconPaddingSv, iconPressEffectSv, styles } from '../styles/Icon.ss.styles';

/**
 * The `<Icon />` component displays SVG icons with customizable size, color, and press interactions.
 *
 * <!-- STORYBOOK_IMPORT_START
 * ```tsx
 * import { Icon } from 'react-native-chill-ui';
 * ```
 * STORYBOOK_IMPORT_END -->
 *
 * @example
 * ```tsx
 * <Icon name="heart-solid" />
 * ```
 *
 * @param as - Component to use when pressable: 'pressable' | 'touchable-opacity' | 'ripple-pressable' (default: 'pressable')
 * @param color - Icon color (default: '#000')
 * @param hasPressEffect - Whether to show press effect when pressed (default: true)
 * @param name - Icon name from the available icon set (required)
 * @param onPress - Callback function when icon is pressed
 * @param pressEffectSize - Size of the press effect padding
 * @param pressEffectStyle - Custom styles for the press effect
 * @param size - Icon size variant: '2xs' | 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl' | '3xl' (default: 'md')
 * @param style - Additional inline styles
 */
export default function Icon<T extends IconConfig>(props: IconPropsSs<T>) {
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

  const iconContent = <CustomIcon name={name} style={[iconStyle, style]} color={color} />;

  if (!onPress) {
    return iconContent;
  }

  switch (as) {
    case 'ripple-pressable':
      return (
        <BoxSs>
          <RipplePressableSs style={[styles.iconBase, style]} onPress={onPress} {...rest}>
            {iconContent}
          </RipplePressableSs>
        </BoxSs>
      );
    case 'touchable-opacity':
      return (
        <BoxSs>
          <TouchableOpacity style={[styles.iconBase, style]} onPress={onPress} {...rest}>
            {iconContent}
          </TouchableOpacity>
        </BoxSs>
      );

    case 'pressable':
    default:
      return (
        <BoxSs>
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
        </BoxSs>
      );
  }
}
