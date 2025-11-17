import type { BoxPropsSs } from '@types';

import styles from '../styles/Box.ss.styles';
import { View as NativeView } from './View.ss';

/**
 * The `<BoxCenter />` component perfectly centers children on both axes and uses React Native's internal ViewNativeComponent for optimal performance by bypassing some abstraction layers.
 *
 * <!-- STORYBOOK_IMPORT_START
 * ```tsx
 * import { BoxCenter } from 'react-native-chill-ui';
 * ```
 * STORYBOOK_IMPORT_END -->
 *
 * @example
 * ```tsx
 * <BoxCenter>
 *   <String>Perfectly centered</String>
 * </BoxCenter>
 * ```
 *
 * @param style - Style object for the box container
 * @param ViewProps - Any other props accepted by the native `View` component
 */
function BoxCenter(props: BoxPropsSs) {
  const { style, ...rest } = props;
  return <NativeView style={[styles.center, style]} {...rest} />;
}

export { BoxCenter };
