import type { BoxPropsSs } from '@types';

import styles from '../styles/Box.ss.styles';
import { View as NativeView } from './View.ss';

/**
 * The `<BoxColumnCenterBetween />` component centers items horizontally and distributes them with `space-between` in a vertical column using StyleSheet.
 *
 * <!-- STORYBOOK_IMPORT_START
 * ```tsx
 * import { BoxColumnCenterBetween } from 'react-native-chill-ui';
 * ```
 * STORYBOOK_IMPORT_END -->
 *
 * @example
 * ```tsx
 * const styles = StyleSheet.create({
 *   container: {
 *     height: 400,
 *     backgroundColor: '#f5f5f5'
 *   }
 * });
 *
 * <BoxColumnCenterBetween style={styles.container}>
 *   <String>Header</String>
 *   <String>Centered Content</String>
 *   <String>Footer</String>
 * </BoxColumnCenterBetween>
 * ```
 *
 * @param style - Style object for the box container
 * @param ViewProps - Any other props accepted by the native `View` component
 */
function BoxColumnCenterBetween(props: BoxPropsSs) {
  const { style, ...rest } = props;
  return <NativeView style={[styles.columnCenterBetween, style]} {...rest} />;
}

export { BoxColumnCenterBetween };
