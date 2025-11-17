import type { ViewProps as NativeViewProps } from 'react-native';

import { isNativeWindInstalled } from '@utils';
import { createElement, ReactElement } from 'react';
import { Animated, View as NativeView, Platform } from 'react-native';

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
 * Props for View components that include className support
 */

/**
 * Props for AnimatedView components that include className support
 */
export type AnimatedViewProps = React.ComponentProps<typeof Animated.View>;
export interface AnimatedViewPropsWithClassName extends AnimatedViewProps {
  className?: string;
  useFastView?: boolean;
}

/**
 * The `<View />` component provides a high-performance view container.
 * Automatically detects NativeWind availability and falls back to StyleSheet if needed.
 *
 *
 * <!-- STORYBOOK_IMPORT_START
 * ```tsx
 * import { View } from 'react-native-chill-ui';
 * ```
 * STORYBOOK_IMPORT_END -->
 *
 * @example
 * ```tsx
 * <View className="p-4 bg-gray-100">
 *   <String>Content</String>
 * </View>
 * ```
 *
 * @param children - Content to render inside the view
 * @param className - Custom CSS classes for the view container (NativeWind)
 * @param style - Style object for the view container
 * @param useFastView - Whether to use the optimized FastView component (default: true)
 */
export function View(props: ViewProps) {
  const { children, useFastView = true, ...rest } = props;
  if (useFastView) {
    return <FastView {...rest}>{children}</FastView>;
  }

  return <NativeView {...rest}>{children}</NativeView>;
}

/**
 * The `<AnimatedView />` component provides animated view capabilities.
 * Automatically detects NativeWind availability and falls back to StyleSheet if needed.
 *
 *
 * <!-- STORYBOOK_IMPORT_START
 * ```tsx
 * import { AnimatedView } from 'react-native-chill-ui';
 * ```
 * STORYBOOK_IMPORT_END -->
 *
 * @example
 * ```tsx
 * <AnimatedView className="p-4 bg-blue-500">
 *   <String>Animated Content</String>
 * </AnimatedView>
 * ```
 *
 * @param children - Content to render inside the animated view
 * @param className - Custom CSS classes for the animated view container (NativeWind)
 * @param style - Style object for the animated view container
 * @param useFastView - Whether to use the optimized FastView component (default: true)
 */
export function AnimatedView(props: AnimatedViewPropsWithClassName) {
  const { children, useFastView = true, ...rest } = props;

  if (useFastView) {
    return <FastAnimatedView {...rest}>{children}</FastAnimatedView>;
  }

  return <Animated.View {...rest}>{children}</Animated.View>;
}

// Only apply cssInterop if NativeWind is available
if (isNativeWindInstalled()) {
  try {
    const { cssInterop } = require('nativewind');

    cssInterop(View, {
      className: {
        target: 'style', // map className->style
      },
    });

    cssInterop(AnimatedView, {
      className: {
        target: 'style', // map className->style
      },
    });
  } catch {
    // NativeWind is not available, skip cssInterop
  }
}
