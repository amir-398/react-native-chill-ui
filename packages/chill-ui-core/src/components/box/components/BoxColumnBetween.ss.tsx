import type { BoxPropsSs } from '@types';

import styles from '../styles/Box.ss.styles';
import { View as NativeView } from './View.ss';

/**
 * The `<BoxColumnBetween />` component stacks items vertically with `space-between` distribution and uses React Native's internal ViewNativeComponent for optimal performance by bypassing some abstraction layers.
 *
 * <!-- STORYBOOK_IMPORT_START
 * ```tsx
 * import { BoxColumnBetween } from 'react-native-chill-ui';
 * ```
 * STORYBOOK_IMPORT_END -->
 *
 * @example
 * ```tsx
 * <BoxColumnBetween>
 *   <String>Header</String>
 *   <String>Content</String>
 *   <String>Footer</String>
 * </BoxColumnBetween>
 * ```
 *
 * @param style - Style object for the box container
 * @param ViewProps - Any other props accepted by the native `View` component
 */
function BoxColumnBetween(props: BoxPropsSs) {
  const { style, ...rest } = props;
  return <NativeView style={[styles.columnBetween, style]} {...rest} />;
}

export { BoxColumnBetween };
