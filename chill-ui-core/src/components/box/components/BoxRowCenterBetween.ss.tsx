import type { BoxPropsSs } from '@types';

import styles from '../styles/Box.ss.styles';
import { View as NativeView } from './View.ss';

/**
 * The `<BoxRowCenterBetween />` component centers items vertically and distributes them with `space-between` in a horizontal row, and uses React Native's internal ViewNativeComponent for optimal performance by bypassing some abstraction layers.
 *
 * <!-- STORYBOOK_IMPORT_START
 * ```tsx
 * import { BoxRowCenterBetween } from 'react-native-chill-ui';
 * ```
 * STORYBOOK_IMPORT_END -->
 *
 * @example
 * ```tsx
 * <BoxRowCenterBetween>
 *   <BoxRowCenter>
 *     <Icon name="user" />
 *     <String>John Doe</String>
 *   </BoxRowCenter>
 *   <Badge>Online</Badge>
 * </BoxRowCenterBetween>
 * ```
 *
 * @param style - Style object for the box container
 * @param ViewProps - Any other props accepted by the native `View` component
 */
function BoxRowCenterBetween(props: BoxPropsSs) {
  const { style, ...rest } = props;
  return <NativeView style={[styles.rowCenterBetween, style]} {...rest} />;
}

export { BoxRowCenterBetween };
