import { Animated } from 'react-native';
/**
 * Props for the basic AnimatedBox component.
 *
 * This is the base animated container component that extends AnimatedViewProps
 * without adding any additional animation-specific properties.
 * ```
 */

export type AnimatedBoxProps = React.ComponentProps<typeof Animated.View> & {
  /** Use optimized RCTView component for better performance (default: `true`) */
  useFastView?: boolean;
};
