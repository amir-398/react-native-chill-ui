import type { BoxPropsSs } from '@types';

import styles from '../styles/Box.ss.styles';
import { View as NativeView } from './View.ss';

/**
 * The `<BoxRowGrow />` component arranges children in a row that expands to fill available space and uses React Native's internal ViewNativeComponent for optimal performance by bypassing some abstraction layers.
 *
 * <!-- STORYBOOK_IMPORT_START
 * ```tsx
 * import { BoxRowGrow } from 'react-native-chill-ui';
 * ```
 * STORYBOOK_IMPORT_END -->
 *
 * @example
 * ```tsx
 * <BoxRowGrow>
 *   <String>This row will fill the available width</String>
 *   <Button>Action</Button>
 * </BoxRowGrow>
 * ```
 *
 * @param style - Style object for the box container
 * @param ViewProps - Any other props accepted by the native `View` component
 */
function BoxRowGrow(props: BoxPropsSs) {
  const { style, ...rest } = props;
  return <NativeView style={[styles.rowGrow, style]} {...rest} />;
}

export { BoxRowGrow };
