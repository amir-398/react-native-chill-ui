import { IconProps } from '@types';
import { Box } from '@components/box';
import { Pressable, TouchableOpacity } from 'react-native';
import { RipplePressable } from '@components/ripplePressable';
import { IconConfig } from '@components/icon/context/IconContext';
import { cn, classNamePropsHandler, classNameHandler, styleHandler } from '@utils';

import CustomIcon from './CustomIcon.hybrid';
import { iconDefaultProps } from '../utils/defaultProps';
import { iconSizeSv, iconPaddingSv, iconPressEffectSv, styles } from '../styles/Icon.ss.styles';
import { iconSizeTv, iconPaddingTv, iconPressableTv, twStyles } from '../styles/Icon.tw.styles';

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
 * @param className - Custom CSS classes for the icon container (NativeWind)
 * @param color - Icon color (default: '#000')
 * @param hasPressEffect - Whether to show press effect when pressed (default: true)
 * @param name - Icon name from the available icon set (required)
 * @param onPress - Callback function when icon is pressed
 * @param pressEffectSize - Size of the press effect padding
 * @param pressEffectStyle - Custom styles for the press effect
 * @param size - Icon size variant: '2xs' | 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl' | '3xl' (default: 'md')
 * @param style - Additional inline styles
 */
export default function Icon<T extends IconConfig>(props: IconProps<T>) {
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
      {...classNameHandler(cn(iconSizeTv({ size }), className))}
      {...styleHandler({ defaultStyle: iconStyle, style })}
      color={color}
    />
  );

  if (!onPress) {
    return iconContent;
  }

  switch (as) {
    case 'ripple-pressable':
      return (
        <Box>
          <RipplePressable
            {...classNameHandler(cn(twStyles.iconBase, className))}
            {...styleHandler({ style })}
            onPress={onPress}
            {...rest}
          >
            {iconContent}
          </RipplePressable>
        </Box>
      );
    case 'touchable-opacity':
      return (
        <Box>
          <TouchableOpacity
            {...classNameHandler(cn(twStyles.iconBase, className))}
            {...styleHandler({ style })}
            onPress={onPress}
            {...rest}
          >
            {iconContent}
          </TouchableOpacity>
        </Box>
      );

    case 'pressable':
    default:
      return (
        <Box>
          <Pressable
            {...classNameHandler(
              cn(
                twStyles.iconBase,
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
        </Box>
      );
  }
}
