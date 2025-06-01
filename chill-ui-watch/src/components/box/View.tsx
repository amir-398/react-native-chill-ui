import type { ViewProps as NativeViewProps } from 'react-native';

import { cssInterop } from 'nativewind';
import Animated from 'react-native-reanimated';

import type { AnimatedViewProps } from '../../types';

// eslint-disable-next-line
export const NativeView = require('react-native/Libraries/Components/View/ViewNativeComponent').default;

const AnimatedNativeView = Animated.createAnimatedComponent(NativeView);

export function View(props: NativeViewProps) {
  const { children, ...rest } = props;
  return <NativeView {...rest}>{children}</NativeView>;
}

cssInterop(View, {
  className: {
    target: 'style', // map className->style
  },
});

export function AnimatedView(props: AnimatedViewProps) {
  const { children, ...rest } = props;

  return <AnimatedNativeView {...rest}>{children}</AnimatedNativeView>;
}

cssInterop(AnimatedView, {
  className: {
    target: 'style', // map className->style
  },
});
