import { cn } from '@utils';

import { classNamePropsHandler } from '@/utils/hybrid/classNamePropsHandler';
import { classNameHandler, styleHandler } from '@/utils/hybrid/propsHandlers';
import colorVariantPropsHandler from '@/utils/hybrid/colorVariantPropsHandler';

import type { ChipProps } from '../../types/chip.types';

import Icon from '../icon';
import { Box } from '../box';
import { String } from '../string';
import createChipStyles from './utils/createStyles';
import { isNativeWindInstalled } from '../../utils/hybrid/nativewindDetector';
import chipVariants, { chipPositionVariants, chipTextVariants } from './Chip.variants';

/**
 * Chip component displays compact elements that represent an input, attribute, or action.
 * Supports both text and icon content with customizable colors, sizes, border radius variants,
 * and style variants (contained/outlined). Automatically detects NativeWind availability
 * and falls back to StyleSheet if needed.
 *
 * @example
 * ```tsx
 * <Chip variant="contained" size="md" rounded="full">
 *   New
 * </Chip>
 *
 * <Chip
 *   variant="outlined"
 *   color="#3B82F6"
 *   size="lg"
 *   rounded="full"
 * >
 *   Custom
 * </Chip>
 *
 * <Chip
 *   variant="contained"
 *   iconActions={[{ iconName: 'star-solid', position: 'left' }]}
 *   size="lg"
 *   rounded="full"
 * />
 * ```
 *
 * @param color - Custom background color for the chip
 * @param children - Content to display in the chip
 * @param className - Custom CSS classes (only used with NativeWind)
 * @param iconActions - Icon actions configuration
 * @param rounded - Border radius variant (default: 'full')
 * @param size - Size variant for the chip (default: 'md')
 * @param position - Position variant for the chip (default: 'left')
 * @param stringProps - Props for the string/text component
 * @param title - Title to display in the chip (priority over children)
 * @param variant - Style variant: 'contained' (filled) or 'outlined' (bordered) - default: 'contained'
 *
 * @see {@link https://mui.com/material-ui/react-chip/ MUI Chip Documentation}
 */
export default function Chip(props: ChipProps) {
  classNamePropsHandler(props, 'Chip');
  colorVariantPropsHandler(props, 'Chip');
  const {
    children,
    className,
    color,
    colorVariant = 'primary',
    iconActions = [],
    position = 'left',
    rounded = 'full',
    size = 'md',
    stringProps,
    style,
    title,
    variant = 'contained',
    ...rest
  } = props;

  const isNativeWind = isNativeWindInstalled();

  const isChipHasIcon: boolean =
    iconActions.length > 0 &&
    iconActions.some(action => action.customIcon || action.iconName) &&
    iconActions.some(
      action => action.position === 'left' || action.position === 'right' || action.position === 'center',
    );

  const chipStyles = !isNativeWind ? createChipStyles(variant, rounded, size, color, isChipHasIcon) : null;

  /**
   * Renders icons based on their position
   */
  const renderIcons = (iconPosition: 'left' | 'right' | 'center') => {
    const icons = iconActions.filter(action => action.position === iconPosition);

    const getIconClassName = (pos: 'left' | 'right' | 'center') => {
      if (pos === 'left') return 'mr-1.5';
      if (pos === 'right') return 'ml-1.5';
      return 'mx-1.5';
    };

    const getIconStyle = (pos: 'left' | 'right' | 'center') => {
      if (pos === 'left') return { marginRight: 6 };
      if (pos === 'right') return { marginLeft: 6 };
      return { marginLeft: 3, marginRight: 3 };
    };

    return icons.map((action, index) => {
      if (action.customIcon) {
        return (
          <Box
            key={`${iconPosition}-${index}`}
            {...classNameHandler(getIconClassName(iconPosition))}
            {...styleHandler({ defaultStyle: getIconStyle(iconPosition) })}
          >
            {action.customIcon}
          </Box>
        );
      }

      if (action.iconName) {
        return (
          <Icon
            key={`${iconPosition}-${index}`}
            name={action.iconName as any}
            size={(action.iconSize as any) ?? (size as any) ?? 'sm'}
            color={action.iconColor}
            {...classNameHandler(getIconClassName(iconPosition))}
            {...styleHandler({ defaultStyle: getIconStyle(iconPosition) })}
          />
        );
      }

      return null;
    });
  };

  /**
   * Renders the main content of the chip
   */
  const renderContent = () => {
    const getTextClassName = () => {
      if (variant === 'outlined' && color) {
        return '';
      }
      return cn(chipTextVariants({ colorVariant, variant }));
    };

    const getTextStyle = () => {
      if (variant === 'outlined' && color) {
        return { ...chipStyles?.text, color };
      }
      return chipStyles?.text;
    };

    if ((children && typeof children === 'string') || title) {
      return (
        <String
          size={size as any}
          {...classNameHandler(getTextClassName())}
          {...styleHandler({ defaultStyle: getTextStyle() })}
          {...stringProps}
        >
          {title ?? children}
        </String>
      );
    }
    return children;
  };

  return (
    <Box
      {...classNameHandler(
        cn(
          'self-center px-3 py-2',
          chipVariants({ colorVariant, rounded, size: size as any, variant }),
          chipPositionVariants({ position }),
          {
            'flex-row items-center': isChipHasIcon,
          },
          className,
        ),
      )}
      {...styleHandler({
        defaultStyle: [chipStyles?.chip, { ...(color && { backgroundColor: color, borderColor: color }) }, style],
      })}
      {...rest}
    >
      {renderIcons('left')}
      {renderContent()}
      {renderIcons('center')}
      {renderIcons('right')}
    </Box>
  );
}
