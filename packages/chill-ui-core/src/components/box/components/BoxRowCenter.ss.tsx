import type { BoxPropsSs } from '@types';

import styles from '../styles/Box.ss.styles';
import { View as NativeView } from './View.ss';

/**
 * The `<BoxRowCenter />` component provides a horizontally arranged row with vertical centering and uses React Native's internal ViewNativeComponent for optimal performance by bypassing some abstraction layers.
 *
 * <!-- STORYBOOK_IMPORT_START
 * ```tsx
 * import { BoxRowCenter } from 'react-native-chill-ui';
 * ```
 * STORYBOOK_IMPORT_END -->
 *
 * @example
 * ```tsx
 * <BoxRowCenter>
 *   <Icon name="star" />
 *   <String>Featured</String>
 * </BoxRowCenter>
 * ```
 *
 * @param style - Style object for the box container
 * @param ViewProps - Any other props accepted by the native `View` component
 */
function BoxRowCenter(props: BoxPropsSs) {
  const { style, ...rest } = props;
  return <NativeView style={[styles.rowCenter, style]} {...rest} />;
}

export { BoxRowCenter };
