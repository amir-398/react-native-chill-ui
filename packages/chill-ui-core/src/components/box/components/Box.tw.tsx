import type { BoxPropsTw } from '@types';

import { View as NativeView } from './View.tw';

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
 * @param className - Custom CSS classes for the box container
 * @param useFastView - Boolean prop to enable fast view rendering
 * @param ViewProps - Any other props accepted by the native `View` component
 */
function Box(props: BoxPropsTw) {
  return <NativeView {...props} />;
}

Box.displayName = 'Box';

export { Box };
