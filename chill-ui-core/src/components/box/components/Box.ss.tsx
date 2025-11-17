import type { BoxPropsSs } from '@types';

import { View as NativeView } from './View.ss';

/**
 * The `<Box />` component is a generic container View and uses React Native's internal ViewNativeComponent for optimal performance by bypassing some abstraction layers.
 *
 * <!-- STORYBOOK_IMPORT_START
 * ```tsx
 * import { Box } from 'react-native-chill-ui';
 * ```
 * STORYBOOK_IMPORT_END -->
 *
 * @example
 * ```tsx
 * <Box>
 *   <String>Content</String>
 * </Box>
 * ```
 *
 * @param useFastView - Use optimized RCTView component for better performance (default: `true`)
 * @param ViewProps - Any other props accepted by the native `View` component
 */
function Box(props: BoxPropsSs) {
  return <NativeView {...props} />;
}

export { Box };
