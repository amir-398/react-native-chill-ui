import cn from '../cn';
import styles from './Box.style';
import { View as NativeView } from './View';
import { BoxProps } from '../../types/box.types';
import { isNativeWindInstalled } from '../../utils/nativewindDetector';
import { classNamePropsHandler } from '../../utils/classNameMissingError';

/**
 * Basic Box component - a flexible container with no default styling.
 *
 * Uses React Native's internal ViewNativeComponent for optimal performance
 * by bypassing some abstraction layers.
 * Automatically detects NativeWind availability and falls back to StyleSheet if needed.
 *
 * @example
 * ```tsx
 * <Box>
 *   <String>Content</String>
 * </Box>
 * ```
 */
function Box(props: BoxProps) {
  classNamePropsHandler(props, 'Box');

  return <NativeView {...props} />;
}

// Row Variants
/**
 * Horizontal layout container (flexbox row).
 *
 * Uses React Native's internal ViewNativeComponent for optimal performance
 * by bypassing some abstraction layers.
 * Automatically detects NativeWind availability and falls back to StyleSheet if needed.
 *
 * @example
 * ```tsx
 * <BoxRow>
 *   <String>Item 1</String>
 *   <String>Item 2</String>
 * </BoxRow>
 * ```
 */
function BoxRow(props: BoxProps) {
  const { className, style, ...rest } = props;

  classNamePropsHandler(props, 'BoxRow');

  if (isNativeWindInstalled()) {
    return <NativeView className={cn('flex flex-row', className)} style={style} {...rest} />;
  }

  return <NativeView style={[styles.row, style]} {...rest} />;
}

/**
 * Horizontal layout with vertical centering.
 *
 * Uses React Native's internal ViewNativeComponent for optimal performance
 * by bypassing some abstraction layers.
 * Automatically detects NativeWind availability and falls back to StyleSheet if needed.
 *
 * @example
 * ```tsx
 * <BoxRowCenter>
 *   <Icon name="star" />
 *   <String>Featured</String>
 * </BoxRowCenter>
 * ```
 */
function BoxRowCenter(props: BoxProps) {
  const { className, style, ...rest } = props;

  classNamePropsHandler(props, 'BoxRowCenter');

  if (isNativeWindInstalled()) {
    return <NativeView className={cn('flex flex-row items-center', className)} style={style} {...rest} />;
  }

  return <NativeView style={[styles.rowCenter, style]} {...rest} />;
}

/**
 * Horizontal layout with space between items.
 *
 * Uses React Native's internal ViewNativeComponent for optimal performance
 * by bypassing some abstraction layers.
 * Automatically detects NativeWind availability and falls back to StyleSheet if needed.
 *
 * @example
 * ```tsx
 * <BoxRowBetween>
 *   <String>Title</String>
 *   <Button>Action</Button>
 * </BoxRowBetween>
 * ```
 */
function BoxRowBetween(props: BoxProps) {
  const { className, style, ...rest } = props;

  classNamePropsHandler(props, 'BoxRowBetween');

  if (isNativeWindInstalled()) {
    return <NativeView className={cn('flex flex-row justify-between', className)} style={style} {...rest} />;
  }

  return <NativeView style={[styles.rowBetween, style]} {...rest} />;
}

/**
 * Horizontal layout with vertical centering and space between items.
 *
 * Uses React Native's internal ViewNativeComponent for optimal performance
 * by bypassing some abstraction layers.
 * Automatically detects NativeWind availability and falls back to StyleSheet if needed.
 *
 * @example
 * ```tsx
 * <BoxRowCenterBetween>
 *   <BoxRowCenter>
 *     <Icon name="user" />
 *     <String>John Doe</String>
 *   </BoxRowCenter>
 *   <Badge>Online</Badge>
 * </BoxRowCenterBetween>
 * ```
 */
function BoxRowCenterBetween(props: BoxProps) {
  const { className, style, ...rest } = props;

  classNamePropsHandler(props, 'BoxRowCenterBetween');

  if (isNativeWindInstalled()) {
    return (
      <NativeView className={cn('flex flex-row items-center justify-between', className)} style={style} {...rest} />
    );
  }

  return <NativeView style={[styles.rowCenterBetween, style]} {...rest} />;
}

// Column Variants
/**
 * Vertical layout container (flexbox column).
 *
 * Uses React Native's internal ViewNativeComponent for optimal performance
 * by bypassing some abstraction layers.
 * Automatically detects NativeWind availability and falls back to StyleSheet if needed.
 *
 * @example
 * ```tsx
 * <BoxColumn>
 *   <String>Item 1</String>
 *   <String>Item 2</String>
 * </BoxColumn>
 * ```
 */
function BoxColumn(props: BoxProps) {
  const { className, style, ...rest } = props;

  classNamePropsHandler(props, 'BoxColumn');

  if (isNativeWindInstalled()) {
    return <NativeView className={cn('flex flex-col', className)} style={style} {...rest} />;
  }

  return <NativeView style={[styles.column, style]} {...rest} />;
}

/**
 * Vertical layout with horizontal centering.
 *
 * Uses React Native's internal ViewNativeComponent for optimal performance
 * by bypassing some abstraction layers.
 * Automatically detects NativeWind availability and falls back to StyleSheet if needed.
 *
 * @example
 * ```tsx
 * <BoxColumnCenter>
 *   <Avatar data={{ firstname: 'John', lastname: 'Doe' }} />
 *   <String>John Doe</String>
 * </BoxColumnCenter>
 * ```
 */
function BoxColumnCenter(props: BoxProps) {
  const { className, style, ...rest } = props;

  classNamePropsHandler(props, 'BoxColumnCenter');

  if (isNativeWindInstalled()) {
    return <NativeView className={cn('flex flex-col items-center', className)} style={style} {...rest} />;
  }

  return <NativeView style={[styles.columnCenter, style]} {...rest} />;
}

/**
 * Vertical layout with space between items.
 *
 * Uses React Native's internal ViewNativeComponent for optimal performance
 * by bypassing some abstraction layers.
 * Automatically detects NativeWind availability and falls back to StyleSheet if needed.
 *
 * @example
 * ```tsx
 * <BoxColumnBetween>
 *   <String>Header</String>
 *   <String>Content</String>
 *   <String>Footer</String>
 * </BoxColumnBetween>
 * ```
 */
function BoxColumnBetween(props: BoxProps) {
  const { className, style, ...rest } = props;

  classNamePropsHandler(props, 'BoxColumnBetween');

  if (isNativeWindInstalled()) {
    return <NativeView className={cn('flex flex-col justify-between', className)} style={style} {...rest} />;
  }

  return <NativeView style={[styles.columnBetween, style]} {...rest} />;
}

/**
 * Vertical layout with horizontal centering and space between items.
 *
 * Uses React Native's internal ViewNativeComponent for optimal performance
 * by bypassing some abstraction layers.
 * Automatically detects NativeWind availability and falls back to StyleSheet if needed.
 *
 * @example
 * ```tsx
 * <BoxColumnCenterBetween>
 *   <Avatar data={{ firstname: 'John', lastname: 'Doe' }} />
 *   <String>John Doe</String>
 *   <Button>Follow</Button>
 * </BoxColumnCenterBetween>
 * ```
 */
function BoxColumnCenterBetween(props: BoxProps) {
  const { className, style, ...rest } = props;

  classNamePropsHandler(props, 'BoxColumnCenterBetween');

  if (isNativeWindInstalled()) {
    return (
      <NativeView className={cn('flex flex-col items-center justify-between', className)} style={style} {...rest} />
    );
  }

  return <NativeView style={[styles.columnCenterBetween, style]} {...rest} />;
}

// Center Variants
/**
 * Perfect centering container (both horizontal and vertical).
 *
 * Uses React Native's internal ViewNativeComponent for optimal performance
 * by bypassing some abstraction layers.
 * Automatically detects NativeWind availability and falls back to StyleSheet if needed.
 *
 * @example
 * ```tsx
 * <BoxCenter>
 *   <String>Perfectly centered</String>
 * </BoxCenter>
 * ```
 */
function BoxCenter(props: BoxProps) {
  const { className, style, ...rest } = props;

  classNamePropsHandler(props, 'BoxCenter');

  if (isNativeWindInstalled()) {
    return <NativeView className={cn('flex items-center justify-center', className)} style={style} {...rest} />;
  }

  return <NativeView style={[styles.center, style]} {...rest} />;
}

// Grow Variants
/**
 * Flexible container that fills available space.
 *
 * Uses React Native's internal ViewNativeComponent for optimal performance
 * by bypassing some abstraction layers.
 * Automatically detects NativeWind availability and falls back to StyleSheet if needed.
 *
 * @example
 * ```tsx
 * <BoxGrow>
 *   <String>This will fill the available space</String>
 * </BoxGrow>
 * ```
 */
function BoxGrow(props: BoxProps) {
  const { className, style, ...rest } = props;

  classNamePropsHandler(props, 'BoxGrow');

  if (isNativeWindInstalled()) {
    return <NativeView className={cn('flex-1', className)} style={style} {...rest} />;
  }

  return <NativeView style={[styles.grow, style]} {...rest} />;
}

/**
 * Flexible row container that fills available space.
 *
 * Uses React Native's internal ViewNativeComponent for optimal performance
 * by bypassing some abstraction layers.
 * Automatically detects NativeWind availability and falls back to StyleSheet if needed.
 *
 * @example
 * ```tsx
 * <BoxRowGrow>
 *   <Button>Left</Button>
 *   <Button>Right</Button>
 * </BoxRowGrow>
 * ```
 */
function BoxRowGrow(props: BoxProps) {
  const { className, style, ...rest } = props;

  classNamePropsHandler(props, 'BoxRowGrow');

  if (isNativeWindInstalled()) {
    return <NativeView className={cn('flex-1 flex-row', className)} style={style} {...rest} />;
  }

  return <NativeView style={[styles.rowGrow, style]} {...rest} />;
}

/**
 * Flexible column container that fills available space.
 *
 * Uses React Native's internal ViewNativeComponent for optimal performance
 * by bypassing some abstraction layers.
 * Automatically detects NativeWind availability and falls back to StyleSheet if needed.
 *
 * @example
 * ```tsx
 * <BoxColumnGrow>
 *   <String>Header</String>
 *   <String>Content</String>
 *   <String>Footer</String>
 * </BoxColumnGrow>
 * ```
 */
function BoxColumnGrow(props: BoxProps) {
  const { className, style, ...rest } = props;

  classNamePropsHandler(props, 'BoxColumnGrow');

  if (isNativeWindInstalled()) {
    return <NativeView className={cn('flex-1 flex-col', className)} style={style} {...rest} />;
  }

  return <NativeView style={[styles.columnGrow, style]} {...rest} />;
}

// Positioning Variants
/**
 * Absolute positioning container.
 *
 * Uses React Native's internal ViewNativeComponent for optimal performance
 * by bypassing some abstraction layers.
 * Automatically detects NativeWind availability and falls back to StyleSheet if needed.
 *
 * @example
 * ```tsx
 * <BoxAbsolute className="top-4 left-4">
 *   <Badge>New</Badge>
 * </BoxAbsolute>
 * ```
 */
function BoxAbsolute(props: BoxProps) {
  const { className, style, ...rest } = props;

  classNamePropsHandler(props, 'BoxAbsolute');

  if (isNativeWindInstalled()) {
    return <NativeView className={cn('absolute', className)} style={style} {...rest} />;
  }

  return <NativeView style={[styles.absolute, style]} {...rest} />;
}

// Stack Variants (for layered content)
/**
 * Relative positioning container for layered content.
 *
 * Uses React Native's internal ViewNativeComponent for optimal performance
 * by bypassing some abstraction layers.
 * Automatically detects NativeWind availability and falls back to StyleSheet if needed.
 *
 * @example
 * ```tsx
 * <BoxStack>
 *   <Image source={{ uri: 'image.jpg' }} />
 *   <BoxAbsolute className="top-2 right-2" {'or'} style={{ top: 8, right: 8 }}>
 *     <Badge>New</Badge>
 *   </BoxAbsolute>
 * </BoxStack>
 * ```
 */
function BoxStack(props: BoxProps) {
  const { className, style, ...rest } = props;

  classNamePropsHandler(props, 'BoxStack');

  if (isNativeWindInstalled()) {
    return <NativeView className={cn('relative', className)} style={style} {...rest} />;
  }

  return <NativeView style={[styles.stack, style]} {...rest} />;
}

export {
  // Basic
  Box,

  // Row Variants
  BoxRow,
  BoxRowCenter,
  BoxRowBetween,
  BoxRowCenterBetween,

  // Column Variants
  BoxColumn,
  BoxColumnCenter,
  BoxColumnBetween,
  BoxColumnCenterBetween,

  // Center Variants
  BoxCenter,

  // Grow Variants
  BoxGrow,
  BoxRowGrow,
  BoxColumnGrow,

  // Positioning Variants
  BoxAbsolute,

  // Stack Variants
  BoxStack,
};
