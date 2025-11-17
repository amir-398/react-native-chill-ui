import type { BoxPropsSs } from '@types';

import styles from '../styles/Box.ss.styles';
import { View as NativeView } from './View.ss';

/**
 * The `<BoxRowBetween />` component spaces items with `space-between` in a horizontal row and uses React Native's internal ViewNativeComponent for optimal performance by bypassing some abstraction layers.
 *
 * <!-- STORYBOOK_IMPORT_START
 * ```tsx
 * import { BoxRowBetween } from 'react-native-chill-ui';
 * ```
 * STORYBOOK_IMPORT_END -->
 *
 * @example
 * ```tsx
 * <BoxRowBetween>
 *   <String>Title</String>
 *   <Button>Action</Button>
 * </BoxRowBetween>
 * ```
 *
 * @param style - Style object for the box container
 * @param ViewProps - Any other props accepted by the native `View` component
 */
function BoxRowBetween(props: BoxPropsSs) {
  const { style, ...rest } = props;
  return <NativeView style={[styles.rowBetween, style]} {...rest} />;
}

export { BoxRowBetween };
