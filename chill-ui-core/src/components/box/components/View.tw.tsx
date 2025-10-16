import type { ViewProps as NativeViewProps } from 'react-native';

import { ReactElement } from 'react';
import { createElement, cssInterop } from 'nativewind';
import { Animated, View as NativeView, Platform } from 'react-native';

/**
 * Props for View components that include className support
 */
interface ViewProps extends NativeViewProps {
  className?: string;
  useFastView?: boolean;
}

function FastView(props: NativeViewProps): ReactElement {
  if (Platform.OS === 'web') {
    return <NativeView {...props} />;
  }
  return createElement('RCTView', props);
}

const FastAnimatedView = Animated.createAnimatedComponent(FastView);

/**
 * Props for AnimatedView components that include className support
 */
export type AnimatedViewProps = React.ComponentProps<typeof Animated.View>;
export interface AnimatedViewPropsWithClassName extends AnimatedViewProps {
  className?: string;
  useFastView?: boolean;
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
  const { children, useFastView = true, ...rest } = props;

  if (useFastView) {
    return <FastView {...rest}>{children}</FastView>;
  }

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
  const { children, useFastView = true, ...rest } = props;

  if (useFastView) {
    return <FastAnimatedView {...rest}>{children}</FastAnimatedView>;
  }

  return <Animated.View {...rest}>{children}</Animated.View>;
}

cssInterop(AnimatedView, {
  className: {
    target: 'style', // map className->style
  },
});
