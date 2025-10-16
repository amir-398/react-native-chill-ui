import type { BoxPropsSs } from '@types';

import styles from '../styles/Box.ss.styles';
import { View as NativeView } from './View.ss';

/**
 * The `<BoxStack />` component provides a relatively positioned container for layering children and uses React Native's internal ViewNativeComponent for optimal performance by bypassing some abstraction layers.
 *
 * <!-- STORYBOOK_IMPORT_START
 * ```tsx
 * import { BoxStack } from 'react-native-chill-ui';
 * ```
 * STORYBOOK_IMPORT_END -->
 *
 * @example
 * ```tsx
 * <BoxStack>
 *   <Image source={{ uri: 'image.jpg' }} />
 *   <BoxAbsolute style={{ top: 8, right: 8 }}>
 *     <Badge>New</Badge>
 *   </BoxAbsolute>
 * </BoxStack>
 * ```
 *
 * @param style - Style object for the box container
 * @param ViewProps - Any other props accepted by the native `View` component
 */
function BoxStack(props: BoxPropsSs) {
  const { style, ...rest } = props;
  return <NativeView style={[styles.stack, style]} {...rest} />;
}

export { BoxStack };
