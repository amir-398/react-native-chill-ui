import type { BoxPropsSs } from '@types';

import styles from '../styles/Box.ss.styles';
import { View as NativeView } from './View.ss';

/**
 * The `<BoxColumnGrow />` component stacks children vertically, expanding to fill available space, and uses React Native's internal ViewNativeComponent for optimal performance by bypassing some abstraction layers.
 *
 * <!-- STORYBOOK_IMPORT_START
 * ```tsx
 * import { BoxColumnGrow } from 'react-native-chill-ui';
 * ```
 * STORYBOOK_IMPORT_END -->
 *
 * @example
 * ```tsx
 * <BoxColumnGrow>
 *   <String>This column will fill available height</String>
 *   <Button>Action</Button>
 * </BoxColumnGrow>
 * ```
 *
 * @param style - Style object for the box container
 * @param ViewProps - Any other props accepted by the native `View` component
 */
function BoxColumnGrow(props: BoxPropsSs) {
  const { style, ...rest } = props;
  return <NativeView style={[styles.columnGrow, style]} {...rest} />;
}

export { BoxColumnGrow };
