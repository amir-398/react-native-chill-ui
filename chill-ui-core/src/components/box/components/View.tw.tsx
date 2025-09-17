import type { ViewProps as NativeViewProps } from 'react-native';

import { cssInterop } from 'nativewind';
import { Animated } from 'react-native';

// eslint-disable-next-line
export const NativeView = require('react-native/Libraries/Components/View/ViewNativeComponent').default;

const AnimatedNativeView = Animated.createAnimatedComponent(NativeView);

/**
 * Props for View components that include className support
 */
interface ViewProps extends NativeViewProps {
  className?: string;
}

/**
 * Props for AnimatedView components that include className support
 */
export type AnimatedViewProps = React.ComponentProps<typeof Animated.View>;
export interface AnimatedViewPropsWithClassName extends AnimatedViewProps {
  className?: string;
}

/**
 * View component that provides a high-performance view container.
 * Automatically detects NativeWind availability and falls back to StyleSheet if needed.
 *
 * @example
 * ```tsx
 * // With NativeWind
 * <View className="p-4 bg-gray-100">
 *   <String>Content</String>
 * </View>
 *
 * // Without NativeWind (fallback)
 * <View style={{ padding: 16, backgroundColor: '#f3f4f6' }}>
 *   <String>Content</String>
 * </View>
 * ```
 */
export function View(props: ViewProps) {
  const { children, ...rest } = props;
  return <NativeView {...rest}>{children}</NativeView>;
}
cssInterop(View, {
  className: {
    target: 'style', // map className->style
  },
});

/**
 * AnimatedView component that provides animated view capabilities.
 * Automatically detects NativeWind availability and falls back to StyleSheet if needed.
 *
 * @example
 * ```tsx
 * // With NativeWind
 * <AnimatedView className="p-4 bg-blue-500">
 *   <String>Animated Content</String>
 * </AnimatedView>
 *
 * // Without NativeWind (fallback)
 * <AnimatedView style={{ padding: 16, backgroundColor: '#3B82F6' }}>
 *   <String>Animated Content</String>
 * </AnimatedView>
 * ```
 */
export function AnimatedView(props: AnimatedViewPropsWithClassName) {
  const { children, ...rest } = props;

  return <AnimatedNativeView {...rest}>{children}</AnimatedNativeView>;
}

cssInterop(AnimatedView, {
  className: {
    target: 'style', // map className->style
  },
});
