import type { BoxPropsTw } from '@types';

import { cn, classNamePropsHandler, classNameHandler, styleHandler } from '@utils';

import { View as NativeView } from './View';
import styles from '../styles/Box.ss.styles';
import { twStyles } from '../styles/Box.tw.styles';

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
function Box(props: BoxPropsTw) {
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
function BoxRow(props: BoxPropsTw) {
  classNamePropsHandler(props, 'BoxRow');
  const { className, style, ...rest } = props;

  return (
    <NativeView
      {...classNameHandler(cn(twStyles.boxRow, className))}
      {...styleHandler({ defaultStyle: styles.row, style })}
      {...rest}
    />
  );
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
function BoxRowCenter(props: BoxPropsTw) {
  classNamePropsHandler(props, 'BoxRowCenter');
  const { className, style, ...rest } = props;

  return (
    <NativeView
      {...classNameHandler(cn(twStyles.boxRowCenter, className))}
      {...styleHandler({ defaultStyle: styles.rowCenter, style })}
      {...rest}
    />
  );
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
function BoxRowBetween(props: BoxPropsTw) {
  classNamePropsHandler(props, 'BoxRowBetween');
  const { className, style, ...rest } = props;

  return (
    <NativeView
      {...classNameHandler(cn(twStyles.boxRowBetween, className))}
      {...styleHandler({ defaultStyle: styles.rowBetween, style })}
      {...rest}
    />
  );
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
function BoxRowCenterBetween(props: BoxPropsTw) {
  classNamePropsHandler(props, 'BoxRowCenterBetween');
  const { className, style, ...rest } = props;

  return (
    <NativeView
      {...classNameHandler(cn(twStyles.boxRowCenterBetween, className))}
      {...styleHandler({ defaultStyle: styles.rowCenterBetween, style })}
      {...rest}
    />
  );
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
function BoxColumn(props: BoxPropsTw) {
  classNamePropsHandler(props, 'BoxColumn');
  const { className, style, ...rest } = props;

  return (
    <NativeView
      {...classNameHandler(cn(twStyles.boxColumn, className))}
      {...styleHandler({ defaultStyle: styles.column, style })}
      {...rest}
    />
  );
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
function BoxColumnCenter(props: BoxPropsTw) {
  classNamePropsHandler(props, 'BoxColumnCenter');
  const { className, style, ...rest } = props;

  return (
    <NativeView
      {...classNameHandler(cn(twStyles.boxColumnCenter, className))}
      {...styleHandler({ defaultStyle: styles.columnCenter, style })}
      {...rest}
    />
  );
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
function BoxColumnBetween(props: BoxPropsTw) {
  classNamePropsHandler(props, 'BoxColumnBetween');
  const { className, style, ...rest } = props;

  return (
    <NativeView
      {...classNameHandler(cn(twStyles.boxColumnBetween, className))}
      {...styleHandler({ defaultStyle: styles.columnBetween, style })}
      {...rest}
    />
  );
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
function BoxColumnCenterBetween(props: BoxPropsTw) {
  const { className, style, ...rest } = props;

  classNamePropsHandler(props, 'BoxColumnCenterBetween');

  return (
    <NativeView
      {...classNameHandler(cn(twStyles.boxColumnCenterBetween, className))}
      {...styleHandler({ defaultStyle: styles.columnCenterBetween, style })}
      {...rest}
    />
  );
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
function BoxCenter(props: BoxPropsTw) {
  classNamePropsHandler(props, 'BoxCenter');
  const { className, style, ...rest } = props;

  return (
    <NativeView
      {...classNameHandler(cn(twStyles.boxCenter, className))}
      {...styleHandler({ defaultStyle: styles.center, style })}
      {...rest}
    />
  );
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
function BoxGrow(props: BoxPropsTw) {
  classNamePropsHandler(props, 'BoxGrow');
  const { className, style, ...rest } = props;

  return (
    <NativeView
      {...classNameHandler(cn(twStyles.boxGrow, className))}
      {...styleHandler({ defaultStyle: styles.grow, style })}
      {...rest}
    />
  );
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
function BoxRowGrow(props: BoxPropsTw) {
  classNamePropsHandler(props, 'BoxRowGrow');
  const { className, style, ...rest } = props;

  return (
    <NativeView
      {...classNameHandler(cn(twStyles.boxRowGrow, className))}
      {...styleHandler({ defaultStyle: styles.rowGrow, style })}
      {...rest}
    />
  );
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
function BoxColumnGrow(props: BoxPropsTw) {
  classNamePropsHandler(props, 'BoxColumnGrow');
  const { className, style, ...rest } = props;

  return (
    <NativeView
      {...classNameHandler(cn(twStyles.boxColumnGrow, className))}
      {...styleHandler({ defaultStyle: styles.columnGrow, style })}
      {...rest}
    />
  );
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
function BoxAbsolute(props: BoxPropsTw) {
  classNamePropsHandler(props, 'BoxAbsolute');
  const { className, style, ...rest } = props;

  return (
    <NativeView
      {...classNameHandler(cn(twStyles.boxAbsolute, className))}
      {...styleHandler({ defaultStyle: styles.absolute, style })}
      {...rest}
    />
  );
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
function BoxStack(props: BoxPropsTw) {
  classNamePropsHandler(props, 'BoxStack');
  const { className, style, ...rest } = props;

  return (
    <NativeView
      {...classNameHandler(cn(twStyles.boxStack, className))}
      {...styleHandler({ defaultStyle: styles.stack, style })}
      {...rest}
    />
  );
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
