import type { BoxPropsSs } from '@types';

import styles from '../styles/Box.ss.styles';
import { View as NativeView } from './View.ss';

/**
 * The `<BoxAbsolute />` component provides an absolutely positioned container and uses React Native's internal ViewNativeComponent for optimal performance by bypassing some abstraction layers.
 *
 * <!-- STORYBOOK_IMPORT_START
 * ```tsx
 * import { BoxAbsolute } from 'react-native-chill-ui';
 * ```
 * STORYBOOK_IMPORT_END -->
 *
 * @example
 * ```tsx
 * <BoxAbsolute style={{ top: 10, left: 10 }}>
 *   <Badge>New</Badge>
 * </BoxAbsolute>
 * ```
 *
 * @param style - Style object for the box container
 * @param ViewProps - Any other props accepted by the native `View` component
 */
function BoxAbsolute(props: BoxPropsSs) {
  const { style, ...rest } = props;
  return <NativeView style={[styles.absolute, style]} {...rest} />;
}

export { BoxAbsolute };
