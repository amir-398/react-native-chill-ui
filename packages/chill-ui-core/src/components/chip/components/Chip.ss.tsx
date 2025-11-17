import type { ChipPropsSs, IconPropsSs } from '@types';

import { BoxSs } from '@components/box';
import { IconSs } from '@components/icon';
import { PropsWithChildren } from 'react';
import { StringSs } from '@components/string';
import { ScalePressableSs } from '@components/scalePressable';
import { RipplePressableSs } from '@components/ripplePressable';
import { Pressable, StyleSheet, TouchableOpacity, ViewStyle } from 'react-native';

import { chipDefaultProps } from '../utils/defaultProps';
import { chipSv, styles } from '../styles/Chip.ss.styles';

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
 *   size="md"
 *   onPress={handlePress}
 *   leftIconAction={{ name: 'star-solid' }}
 *   rightIconAction={{ name: 'close-solid' }}
 * >
 *   New Feature
 * </Chip>
 * ```
 *
 * @param as - Type of touchable component to use when onPress is provided (default: 'touchable-opacity')
 * @param children - Content to display in the chip
 * @param color - Custom background color for the chip
 * @param leftIconAction - Left icon configuration (name, size, color, customIcon)
 * @param onPress - Press callback function for the chip
 * @param position - Position variant for the chip: 'left' | 'center' | 'right' (default: 'left')
 * @param rightIconAction - Right icon configuration (name, size, color, customIcon)
 * @param size - Size variant: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl' | '2xs' (default: 'xs')
 * @param stringProps - Props for the StringSs component
 * @param style - Style object for the chip container
 * @param title - Title to display in the chip (priority over children)
 * @param variant - Style variant: 'contained' | 'outlined' (default: 'contained')
 */
export default function Chip(props: PropsWithChildren<ChipPropsSs>) {
  const {
    as = chipDefaultProps.as,
    children,
    color,
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
    iconAction: ChipPropsSs['leftIconAction'] | ChipPropsSs['rightIconAction'],
    iconPosition: 'left' | 'right',
  ) => {
    if (!iconAction) return null;

    const iconStyle = iconPosition === 'left' ? styles.iconLeft : styles.iconRight;

    if (iconAction.customIcon) {
      return <BoxSs style={[iconStyle, styles.pointerEventsNone]}>{iconAction.customIcon}</BoxSs>;
    }

    if (iconAction.name) {
      return (
        <BoxSs style={[iconStyle, styles.pointerEventsNone]}>
          <IconSs
            name={iconAction.name}
            size={iconAction.size ?? (size as IconPropsSs['size']) ?? 'sm'}
            color={iconAction.color}
          />
        </BoxSs>
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
        <StringSs
          size={size}
          {...stringProps}
          style={
            StyleSheet.flatten([variant === 'outlined' && color && { color }, stringProps?.style]) as
              | ViewStyle
              | undefined
          }
        >
          {title ?? children}
        </StringSs>
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
    style: [
      styles.chip,
      chipSv({ position, variant }),
      isChipHasIcon && styles.chipWithIcons,
      color && { backgroundColor: variant === 'outlined' ? 'transparent' : color, borderColor: color },
      style,
    ],
    ...rest,
  };

  // Si pas de onPress, on retourne juste une Box
  if (!onPress) {
    return (
      <BoxSs>
        <BoxSs {...commonProps}>{chipContent}</BoxSs>
      </BoxSs>
    );
  }

  // Si onPress est fourni, on wrappe dans le composant touchable approprié
  switch (as) {
    case 'ripple-pressable':
      return (
        <BoxSs>
          <RipplePressableSs {...commonProps} onPress={onPress}>
            {chipContent}
          </RipplePressableSs>
        </BoxSs>
      );

    case 'pressable':
      return (
        <BoxSs>
          <Pressable {...commonProps} onPress={onPress}>
            {chipContent}
          </Pressable>
        </BoxSs>
      );

    case 'scale-pressable':
      return (
        <BoxSs>
          <ScalePressableSs {...commonProps} onPress={onPress}>
            {chipContent}
          </ScalePressableSs>
        </BoxSs>
      );

    case 'touchable-opacity':
    default: {
      return (
        <BoxSs>
          <TouchableOpacity {...commonProps} onPress={onPress} activeOpacity={0.7}>
            {chipContent}
          </TouchableOpacity>
        </BoxSs>
      );
    }
  }
}
