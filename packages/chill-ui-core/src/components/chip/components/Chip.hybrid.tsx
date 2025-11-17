import type { ChipPropsTw, IconProps } from '@types';

import { Box } from '@components/box';
import { Icon } from '@components/icon';
import { PropsWithChildren } from 'react';
import { String } from '@components/string';
import { Pressable, TouchableOpacity } from 'react-native';
import { ScalePressable } from '@components/scalePressable';
import { RipplePressable } from '@components/ripplePressable';
import { classNameHandler, styleHandler, classNamePropsHandler, cn, colorVariantPropsHandler } from '@utils';

import { chipDefaultProps } from '../utils/defaultProps';
import { chipSv, styles } from '../styles/Chip.ss.styles';
import { chipTv, chipTextTv, twStyles } from '../styles/Chip.tw.styles';

/**
 * The `<Chip />` component displays compact elements that represent an input, attribute, or action.
 * Supports both text and icon content with customizable colors, sizes, and style variants.
 *
 *
 * <!-- STORYBOOK_IMPORT_START
 * ```tsx
 * import { Chip } from 'react-native-chill-ui';
 * ```
 * STORYBOOK_IMPORT_END -->
 *
 * @example
 * ```tsx
 * <Chip
 *   variant="outlined"
 *   colorVariant="primary"
 *   size="md"
 *   onPress={handlePress}
 *   leftIconAction={{ name: 'star-solid' }}
 * >
 *   New Feature
 * </Chip>
 * ```
 *
 * @param as - Type of touchable component to use when onPress is provided: 'touchable-opacity' | 'pressable' | 'ripple-pressable' | 'scale-pressable' (default: 'touchable-opacity')
 * @param children - Content to display in the chip
 * @param className - Custom CSS classes for the chip container (NativeWind)
 * @param color - Custom background color for the chip
 * @param colorVariant - Color variant: 'primary' | 'secondary' | 'accent' | 'danger' | 'warning' | 'info' | 'success' | 'error' | 'dark' | 'light' | 'muted' | 'neutral' | 'disabled' | 'inverted' | 'white' (default: 'primary')
 * @param leftIconAction - Left icon configuration (name, size, color, customIcon)
 * @param onPress - Press callback function for the chip
 * @param position - Position variant for the chip: 'left' | 'center' | 'right' (default: 'left')
 * @param rightIconAction - Right icon configuration (name, size, color, customIcon)
 * @param size - Size variant: '2xs' | 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl' (default: 'xs')
 * @param stringProps - Props for the String component
 * @param style - Style object for the chip container
 * @param title - Title to display in the chip (priority over children)
 * @param variant - Style variant: 'contained' | 'outlined' (default: 'contained')
 */
export default function Chip(props: PropsWithChildren<ChipPropsTw>) {
  classNamePropsHandler(props, 'Chip');
  colorVariantPropsHandler(props, 'Chip');
  const {
    as = chipDefaultProps.as,
    children,
    className,
    color,
    colorVariant = chipDefaultProps.colorVariant,
    leftIconAction,
    onPress,
    position = chipDefaultProps.position,
    rightIconAction,
    size = chipDefaultProps.size,
    stringProps,
    style,
    title,
    variant = chipDefaultProps.variant,
    ...rest
  } = props;

  const hasLeftIcon = Boolean(leftIconAction && (leftIconAction.customIcon || leftIconAction.name));
  const hasRightIcon = Boolean(rightIconAction && (rightIconAction.customIcon || rightIconAction.name));
  const isChipHasIcon = hasLeftIcon || hasRightIcon;

  /**
   * Renders a single icon based on configuration
   */
  const renderIcon = (
    iconAction: ChipPropsTw['leftIconAction'] | ChipPropsTw['rightIconAction'],
    iconPosition: 'left' | 'right',
  ) => {
    if (!iconAction) return null;

    const iconClassName = iconPosition === 'left' ? twStyles.iconLeft : twStyles.iconRight;
    const iconStyle = iconPosition === 'left' ? styles.iconLeft : styles.iconRight;

    if (iconAction.customIcon) {
      return (
        <Box
          {...classNameHandler(cn(iconClassName, twStyles.pointerEventsNone))}
          {...styleHandler({ defaultStyle: [iconStyle, styles.pointerEventsNone] })}
        >
          {iconAction.customIcon}
        </Box>
      );
    }

    if (iconAction.name) {
      return (
        <Box
          {...classNameHandler(cn(iconClassName, twStyles.pointerEventsNone))}
          {...styleHandler({ defaultStyle: [iconStyle, styles.pointerEventsNone] })}
        >
          <Icon
            name={iconAction.name}
            size={iconAction.size ?? (size as IconProps['size']) ?? 'sm'}
            color={iconAction.color}
          />
        </Box>
      );
    }

    return null;
  };

  /**
   * Renders the main content of the chip
   */
  const renderContent = () => {
    if ((children && typeof children === 'string') || title) {
      return (
        <String
          size={size}
          {...stringProps}
          {...classNameHandler(cn(chipTextTv({ colorVariant, variant }), stringProps?.className))}
          {...styleHandler({
            style: [{ ...(variant === 'outlined' && color && { color }) }, stringProps?.style],
          })}
        >
          {title ?? children}
        </String>
      );
    }
    return children;
  };

  const chipContent = (
    <>
      {renderIcon(leftIconAction, 'left')}
      {renderContent()}
      {renderIcon(rightIconAction, 'right')}
    </>
  );

  const commonProps = {
    ...classNameHandler(
      cn(
        twStyles.chip,
        chipTv({ colorVariant, position, variant }),
        {
          [twStyles.chipWithIcons]: isChipHasIcon,
        },
        className,
      ),
    ),
    ...styleHandler({
      defaultStyle: [styles.chip, chipSv({ position, variant }), isChipHasIcon && styles.chipWithIcons],
      style: [
        { ...(color && { backgroundColor: variant === 'outlined' ? 'transparent' : color, borderColor: color }) },
        style,
      ],
    }),
    ...rest,
  };

  // Si pas de onPress, on retourne juste une Box
  if (!onPress) {
    return (
      <Box>
        <Box {...commonProps}>{chipContent}</Box>
      </Box>
    );
  }

  // Si onPress est fourni, on wrappe dans le composant touchable approprié
  switch (as) {
    case 'ripple-pressable':
      return (
        <Box>
          <RipplePressable {...commonProps} onPress={onPress}>
            {chipContent}
          </RipplePressable>
        </Box>
      );

    case 'pressable':
      return (
        <Box>
          <Pressable {...commonProps} onPress={onPress}>
            {chipContent}
          </Pressable>
        </Box>
      );

    case 'scale-pressable':
      return (
        <Box>
          <ScalePressable {...commonProps} onPress={onPress}>
            {chipContent}
          </ScalePressable>
        </Box>
      );

    case 'touchable-opacity':
    default: {
      return (
        <Box>
          <TouchableOpacity {...commonProps} onPress={onPress} activeOpacity={0.7}>
            {chipContent}
          </TouchableOpacity>
        </Box>
      );
    }
  }
}
