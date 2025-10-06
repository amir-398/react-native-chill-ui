import type { BoxPropsTw } from '@types';

import { cn } from '@utils';

import { View as NativeView } from './View.tw';
import { twStyles } from '../styles/Box.tw.styles';

/**
 * Basic Box component - a flexible container with no default styling.
 *
 * Uses React Native's internal ViewNativeComponent for optimal performance
 * by bypassing some abstraction layers.
 *
 * @example
 * ```tsx
 * <Box>
 *   <String>Content</String>
 * </Box>
 * ```
 */
function Box(props: BoxPropsTw) {
  return <NativeView {...props} />;
}

// Row Variants
/**
 * Horizontal layout container (flexbox row).
 *
 * Uses React Native's internal ViewNativeComponent for optimal performance
 * by bypassing some abstraction layers.
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
  const { className, ...rest } = props;

  return <NativeView className={cn(twStyles.boxRow, className)} {...rest} />;
}

/**
 * Horizontal layout with vertical centering.
 *
 * Uses React Native's internal ViewNativeComponent for optimal performance
 * by bypassing some abstraction layers.
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
  const { className, ...rest } = props;

  return <NativeView className={cn(twStyles.boxRowCenter, className)} {...rest} />;
}

/**
 * Horizontal layout with space between items.
 *
 * Uses React Native's internal ViewNativeComponent for optimal performance
 * by bypassing some abstraction layers.
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
  const { className, ...rest } = props;

  return <NativeView className={cn(twStyles.boxRowBetween, className)} {...rest} />;
}

/**
 * Horizontal layout with vertical centering and space between items.
 *
 * Uses React Native's internal ViewNativeComponent for optimal performance
 * by bypassing some abstraction layers.
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
  const { className, ...rest } = props;

  return <NativeView className={cn(twStyles.boxRowCenterBetween, className)} {...rest} />;
}

// Column Variants
/**
 * Vertical layout container (flexbox column).
 *
 * Uses React Native's internal ViewNativeComponent for optimal performance
 * by bypassing some abstraction layers.
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
  const { className, ...rest } = props;

  return <NativeView className={cn(twStyles.boxColumn, className)} {...rest} />;
}

/**
 * Vertical layout with horizontal centering.
 *
 * Uses React Native's internal ViewNativeComponent for optimal performance
 * by bypassing some abstraction layers.
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
  const { className, ...rest } = props;

  return <NativeView className={cn(twStyles.boxColumnCenter, className)} {...rest} />;
}

/**
 * Vertical layout with space between items.
 *
 * Uses React Native's internal ViewNativeComponent for optimal performance
 * by bypassing some abstraction layers.
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
  const { className, ...rest } = props;

  return <NativeView className={cn(twStyles.boxColumnBetween, className)} {...rest} />;
}

/**
 * Vertical layout with horizontal centering and space between items.
 *
 * Uses React Native's internal ViewNativeComponent for optimal performance
 * by bypassing some abstraction layers.
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
  const { className, ...rest } = props;

  return <NativeView className={cn(twStyles.boxColumnCenterBetween, className)} {...rest} />;
}

// Center Variants
/**
 * Perfect centering container (both horizontal and vertical).
 *
 * Uses React Native's internal ViewNativeComponent for optimal performance
 * by bypassing some abstraction layers.
 *
 * @example
 * ```tsx
 * <BoxCenter>
 *   <String>Perfectly centered</String>
 * </BoxCenter>
 * ```
 */
function BoxCenter(props: BoxPropsTw) {
  const { className, ...rest } = props;

  return <NativeView className={cn(twStyles.boxCenter, className)} {...rest} />;
}

// Grow Variants
/**
 * Flexible container that fills available space.
 *
 * Uses React Native's internal ViewNativeComponent for optimal performance
 * by bypassing some abstraction layers.
 *
 * @example
 * ```tsx
 * <BoxGrow>
 *   <String>This will fill the available space</String>
 * </BoxGrow>
 * ```
 */
function BoxGrow(props: BoxPropsTw) {
  const { className, ...rest } = props;

  return <NativeView className={cn(twStyles.boxGrow, className)} {...rest} />;
}

/**
 * Flexible row container that fills available space.
 *
 * Uses React Native's internal ViewNativeComponent for optimal performance
 * by bypassing some abstraction layers.
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
  const { className, ...rest } = props;

  return <NativeView className={cn(twStyles.boxRowGrow, className)} {...rest} />;
}

/**
 * Flexible column container that fills available space.
 *
 * Uses React Native's internal ViewNativeComponent for optimal performance
 * by bypassing some abstraction layers.
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
  const { className, ...rest } = props;

  return <NativeView className={cn(twStyles.boxColumnGrow, className)} {...rest} />;
}

// Positioning Variants
/**
 * Absolute positioning container.
 *
 * Uses React Native's internal ViewNativeComponent for optimal performance
 * by bypassing some abstraction layers.
 *
 * @example
 * ```tsx
 * <BoxAbsolute className="top-4 left-4">
 *   <Badge>New</Badge>
 * </BoxAbsolute>
 * ```
 */
function BoxAbsolute(props: BoxPropsTw) {
  const { className, ...rest } = props;

  return <NativeView className={cn(twStyles.boxAbsolute, className)} {...rest} />;
}

// Stack Variants (for layered content)
/**
 * Relative positioning container for layered content.
 *
 * Uses React Native's internal ViewNativeComponent for optimal performance
 * by bypassing some abstraction layers.
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
  const { className, ...rest } = props;

  return <NativeView className={cn(twStyles.boxStack, className)} {...rest} />;
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
