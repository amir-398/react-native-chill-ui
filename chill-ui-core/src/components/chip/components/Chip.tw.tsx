import type { ChipPropsTw } from '@types';

import { cn, isString } from '@utils';
import { BoxTw } from '@components/box';
import { IconTw } from '@components/icon';
import { StringTw } from '@components/string';
import { Pressable, TouchableOpacity } from 'react-native';
import { ScalePressableTw } from '@components/scalePressable';
import { RipplePressableTw } from '@components/ripplePressable';

import { chipDefaultProps } from '../utils/defaultProps';
import { chipTv, chipTextTv, twStyles } from '../styles/Chip.tw.styles';

/**
 * Chip component displays compact elements that represent an input, attribute, or action.
 * Supports both text and icon content with customizable colors, sizes, and style variants (contained/outlined).
 * Tailwind version using NativeWind for styling.
 *
 * @example
 * ```tsx
 * <Chip
 *   variant="outlined"
 *   colorVariant="primary"
 *   size="md"
 *   onPress={handlePress}
 *   leftIconAction={{ name: 'star-solid' }}
 *   rightIconAction={{ name: 'close-solid', onPress: handleRemove }}
 * >
 *   New Feature
 * </Chip>
 * ```
 *
 * @param as - Type of touchable component to use when onPress is provided (default: 'touchable-opacity')
 * @param children - Content to display in the chip
 * @param className - (only NativeWind) Additional CSS classes for the chip container
 * @param color - Custom background color for the chip
 * @param colorVariant - (only NativeWind) Color variant: 'primary' | 'secondary' | 'accent' | 'danger' | 'warning' | 'info' | 'success' | 'error' | 'dark' | 'light' | 'muted' | 'neutral' | 'disabled' | 'inverted' | 'white' (default: 'primary')
 * @param leftIconAction - Left icon configuration (name, size, color, customIcon)
 * @param onPress - Press callback function for the chip
 * @param position - Position variant for the chip: 'left' | 'center' | 'right' (default: 'left')
 * @param rightIconAction - Right icon configuration (name, size, color, customIcon)
 * @param size - Size variant: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl' | '2xs' (default: 'xs')
 * @param stringProps - Props for the StringTw component
 * @param style - Style object for the chip container
 * @param title - Title to display in the chip (priority over children)
 * @param variant - Style variant: 'contained' | 'outlined' (default: 'contained')
 */
export default function Chip(props: ChipPropsTw) {
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

    if (iconAction.customIcon) {
      return <BoxTw className={cn(iconClassName, twStyles.pointerEventsNone)}>{iconAction.customIcon}</BoxTw>;
    }

    if (iconAction.name) {
      return (
        <BoxTw className={cn(iconClassName, twStyles.pointerEventsNone)}>
          <IconTw name={iconAction.name} size={iconAction.size ?? size ?? 'sm'} color={iconAction.color} />
        </BoxTw>
      );
    }

    return null;
  };

  /**
   * Renders the main content of the chip
   */
  const renderContent = () => {
    if ((children && isString(children)) || title) {
      return (
        <StringTw
          size={size}
          className={cn(chipTextTv({ colorVariant, variant }))}
          style={{ ...(variant === 'outlined' && color && { color }) }}
          {...stringProps}
        >
          {title ?? children}
        </StringTw>
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
    className: cn(
      twStyles.chip,
      chipTv({ colorVariant, position, variant }),
      {
        [twStyles.chipWithIcons]: isChipHasIcon,
      },
      className,
    ),
    style: [
      { ...(color && { backgroundColor: variant === 'outlined' ? 'transparent' : color, borderColor: color }) },
      style,
    ],
    ...rest,
  };

  // Si pas de onPress, on retourne juste une Box
  if (!onPress) {
    return (
      <BoxTw>
        <BoxTw {...commonProps}>{chipContent}</BoxTw>
      </BoxTw>
    );
  }

  // Si onPress est fourni, on wrappe dans le composant touchable approprié
  switch (as) {
    case 'ripple-pressable':
      return (
        <BoxTw>
          <RipplePressableTw {...commonProps} onPress={onPress}>
            {chipContent}
          </RipplePressableTw>
        </BoxTw>
      );

    case 'pressable':
      return (
        <BoxTw>
          <Pressable {...commonProps} onPress={onPress}>
            {chipContent}
          </Pressable>
        </BoxTw>
      );

    case 'scale-pressable':
      return (
        <BoxTw>
          <ScalePressableTw {...commonProps} onPress={onPress}>
            {chipContent}
          </ScalePressableTw>
        </BoxTw>
      );

    case 'touchable-opacity':
    default: {
      return (
        <BoxTw>
          <TouchableOpacity {...commonProps} onPress={onPress} activeOpacity={0.7}>
            {chipContent}
          </TouchableOpacity>
        </BoxTw>
      );
    }
  }
}
