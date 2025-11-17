import type { BoxPropsSs } from '@types';

import styles from '../styles/Box.ss.styles';
import { View as NativeView } from './View.ss';

/**
 * The `<BoxColumn />` component provides a vertical flex column and uses React Native's internal ViewNativeComponent for optimal performance by bypassing some abstraction layers.
 *
 * <!-- STORYBOOK_IMPORT_START
 * ```tsx
 * import { BoxColumn } from 'react-native-chill-ui';
 * ```
 * STORYBOOK_IMPORT_END -->
 *
 * @example
 * ```tsx
 * <BoxColumn>
 *   <String>Item 1</String>
 *   <String>Item 2</String>
 * </BoxColumn>
 * ```
 *
 * @param style - Style object for the box container
 * @param ViewProps - Any other props accepted by the native `View` component
 */
function BoxColumn(props: BoxPropsSs) {
  const { style, ...rest } = props;
  return <NativeView style={[styles.column, style]} {...rest} />;
}

export { BoxColumn };
