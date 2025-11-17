import type { BoxPropsSs } from '@types';

import styles from '../styles/Box.ss.styles';
import { View as NativeView } from './View.ss';

/**
 * The `<BoxColumnCenter />` component stacks items vertically with horizontal centering and uses React Native's internal ViewNativeComponent for optimal performance by bypassing some abstraction layers.
 *
 * <!-- STORYBOOK_IMPORT_START
 * ```tsx
 * import { BoxColumnCenter } from 'react-native-chill-ui';
 * ```
 * STORYBOOK_IMPORT_END -->
 *
 * @example
 * ```tsx
 * <BoxColumnCenter>
 *   <Avatar data={{ firstname: 'John', lastname: 'Doe' }} />
 *   <String>John Doe</String>
 * </BoxColumnCenter>
 * ```
 *
 * @param style - Style object for the box container
 * @param ViewProps - Any other props accepted by the native `View` component
 */
function BoxColumnCenter(props: BoxPropsSs) {
  const { style, ...rest } = props;
  return <NativeView style={[styles.columnCenter, style]} {...rest} />;
}

export { BoxColumnCenter };
