import { StyleSheet } from 'react-native';

import { classNamePropsHandler } from '@/utils/classNameMissingError';

import type { ChipProps } from '../../types';

import cn from '../cn';
import Icon from '../icon';
import { Box } from '../box';
import String from '../string';
import styles from './Chip.style';
import { isNativeWindInstalled } from '../../utils/nativewindDetector';
import chipVariants, { chipPositionVariants, chipTextVariants } from './Chip.variants';

/**
 * Creates StyleSheet styles equivalent to NativeWind classes
 * Used as fallback when NativeWind is not available
 */
const createChipStyles = (variant: string, rounded: string, size: string, badgeColor?: string) => {
  // Variant mapping
  const variantMap: Record<string, any> = {
    contained: styles.variantContained,
    outlined: styles.variantOutlined,
  };

  // Padding mapping
  const paddingMap: Record<string, any> = {
    '2xl': styles.paddingFalse,
    '3xl': styles.paddingFalse,
    full: styles.paddingTrue,
    lg: styles.paddingFalse,
    md: styles.paddingFalse,
    sm: styles.paddingFalse,
    xl: styles.paddingFalse,
  };

  // Border radius mapping
  const roundedMap: Record<string, any> = {
    '2xl': styles.rounded2xl,
    '3xl': styles.rounded3xl,
    full: styles.roundedFull,
    lg: styles.roundedLg,
    md: styles.roundedMd,
    sm: styles.roundedSm,
    xl: styles.roundedXl,
  };

  // Size mapping for text
  const sizeMap: Record<string, any> = {
    '2xl': styles.size2xl,
    '2xs': styles.size2xs,
    lg: styles.sizeLg,
    md: styles.sizeMd,
    sm: styles.sizeSm,
    xl: styles.sizeXl,
    xs: styles.sizeXs,
  };

  const variantStyle = variantMap[variant] || styles.variantContained;
  const paddingStyle = paddingMap[rounded] || styles.paddingFalse;
  const roundedStyle = roundedMap[rounded] || styles.roundedMd;
  const sizeStyle = sizeMap[size] || styles.sizeMd;

  return StyleSheet.create({
    chip: {
      ...styles.chipBase,
      ...variantStyle,
      ...paddingStyle,
      ...roundedStyle,
      backgroundColor: badgeColor || (variant === 'outlined' ? 'transparent' : '#7C9CBF'),
      borderColor: badgeColor || '#7C9CBF',
    },
    text: {
      ...sizeStyle,
      color: variant === 'outlined' ? badgeColor || '#7C9CBF' : '#FFFFFF',
      fontWeight: '600',
    },
  });
};

/**
 * Chip component displays compact elements that represent an input, attribute, or action.
 * Supports both text and icon content with customizable colors, sizes, border radius variants,
 * and style variants (contained/outlined). Automatically detects NativeWind availability
 * and falls back to StyleSheet if needed.
 *
 * @example
 * ```tsx
 * <Chip variant="contained" size="md" rounded="md">
 *   New
 * </Chip>
 *
 * <Chip
 *   variant="outlined"
 *   badgeColor="#3B82F6"
 *   textColor="#3B82F6"
 *   size="lg"
 *   rounded="full"
 * >
 *   Custom
 * </Chip>
 *
 * <Chip
 *   variant="contained"
 *   iconProps={{ name: 'star', color: '#FFD700' }}
 *   size="lg"
 *   rounded="full"
 * />
 * ```
 *
 * @param color - Custom background color for the chip
 * @param children - Content to display in the chip
 * @param className - Custom CSS classes (only used with NativeWind)
 * @param iconProps - Props for the icon component (when displaying icon instead of text)
 * @param rounded - Border radius variant (default: 'md')
 * @param size - Size variant for the chip (default: 'md')
 * @param position - Position variant for the chip (default: 'start')
 * @param stringProps - Props for the string/text component
 * @param textColor - Custom text color
 * @param title - Title to display in the chip
 * @param variant - Style variant: 'contained' (filled) or 'outlined' (bordered) - default: 'contained'
 *
 * @see {@link https://mui.com/material-ui/react-chip/ MUI Chip Documentation}
 */
export default function Chip(props: ChipProps) {
  classNamePropsHandler(props, 'Chip');
  const {
    children,
    className,
    color,
    colorVariant = 'primary',
    iconActions = [],
    iconProps,
    position = 'left',
    rounded = 'full',
    size = 'md',
    stringProps,
    title,
    variant = 'contained',
  } = props;

  const isNativeWind = isNativeWindInstalled();

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

    return icons.map((action, index) => {
      if (action.customIcon) {
        return (
          <Box key={`${iconPosition}-${index}`} className={getIconClassName(iconPosition)}>
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
            className={getIconClassName(iconPosition)}
          />
        );
      }

      return null;
    });
  };

  if (isNativeWind) {
    const renderContent = () => {
      if (iconProps && iconProps?.name) {
        return <Icon {...iconProps} name={iconProps?.name} size={size} />;
      }
      if (title) {
        return (
          <String
            size={size as any}
            weight="semiBold"
            className={cn(chipTextVariants({ colorVariant }))}
            {...stringProps}
          >
            {title}
          </String>
        );
      }
      if (children && typeof children === 'string' && !title) {
        return (
          <String
            size={size as any}
            weight="semiBold"
            className={cn(chipTextVariants({ colorVariant }))}
            {...stringProps}
          >
            {children}
          </String>
        );
      }
      return children;
    };

    return (
      <Box
        className={cn(
          'self-center px-3 py-2',
          chipVariants({ colorVariant, rounded, size: size as any, variant }),
          chipPositionVariants({ position }),
          {
            'flex-row items-center':
              renderIcons('left').length > 0 || renderIcons('right').length > 0 || renderIcons('center').length > 0,
          },
          className,
        )}
        style={{ ...(color && { backgroundColor: color, borderColor: color }) }}
      >
        {renderIcons('left')}
        {renderContent()}
        {renderIcons('center')}
        {renderIcons('right')}
      </Box>
    );
  }

  const chipStyles = createChipStyles(variant, rounded, size, color);

  const renderContent = () => {
    if (iconProps && iconProps?.name) {
      return <Icon {...iconProps} name={iconProps?.name} size={size} />;
    }
    if (title) {
      return (
        <String size={size as any} weight="semiBold" style={chipStyles.text} {...stringProps}>
          {title}
        </String>
      );
    }
    if (children && typeof children === 'string' && !title) {
      return (
        <String size={size as any} weight="semiBold" style={chipStyles.text} {...stringProps}>
          {children}
        </String>
      );
    }
    return children;
  };

  /**
   * Renders icons for StyleSheet fallback
   */
  const renderIconsFallback = (iconPosition: 'left' | 'right' | 'center') => {
    const icons = iconActions.filter(action => action.position === iconPosition);

    const getIconStyle = (pos: 'left' | 'right' | 'center') => {
      if (pos === 'left') return { marginRight: 6 };
      if (pos === 'right') return { marginLeft: 6 };
      return { marginLeft: 3, marginRight: 3 };
    };

    return icons.map((action, index) => {
      if (action.customIcon) {
        return (
          <Box key={`${iconPosition}-${index}`} style={getIconStyle(iconPosition)}>
            {action.customIcon}
          </Box>
        );
      }

      if (action.iconName) {
        return (
          <Icon
            key={`${iconPosition}-${index}`}
            name={action.iconName as any}
            size={(action.iconSize as any) || 'sm'}
            color={action.iconColor}
            style={getIconStyle(iconPosition)}
          />
        );
      }

      return null;
    });
  };

  return (
    <Box style={chipStyles.chip}>
      {renderIconsFallback('left')}
      {renderContent()}
      {renderIconsFallback('center')}
      {renderIconsFallback('right')}
    </Box>
  );
}
