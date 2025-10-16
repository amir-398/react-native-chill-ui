import type { BoxPropsSs } from '@types';

import styles from '../styles/Box.ss.styles';
import { View as NativeView } from './View.ss';

/**
 * The `<BoxGrow />` component expands to fill available space and uses React Native's internal ViewNativeComponent for optimal performance by bypassing some abstraction layers.
 *
 * <!-- STORYBOOK_IMPORT_START
 * ```tsx
 * import { BoxGrow } from 'react-native-chill-ui';
 * ```
 * STORYBOOK_IMPORT_END -->
 *
 * @example
 * ```tsx
 * <BoxGrow>
 *   <String>This will fill the available space</String>
 * </BoxGrow>
 * ```
 *
 * @param style - Style object for the box container
 * @param ViewProps - Any other props accepted by the native `View` component
 */
function BoxGrow(props: BoxPropsSs) {
  const { style, ...rest } = props;
  return <NativeView style={[styles.grow, style]} {...rest} />;
}

export { BoxGrow };
