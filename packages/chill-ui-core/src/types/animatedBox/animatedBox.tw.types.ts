import { Animated } from 'react-native';
/**
 * Props for the basic AnimatedBox component.
 *
 * This is the base animated container component that extends AnimatedViewProps
 * without adding any additional animation-specific properties.
 * ```
 */

export type AnimatedViewProps = React.ComponentProps<typeof Animated.View>;

export interface AnimatedBoxProps extends AnimatedViewProps {
  /** Additional className for the animated box (Nativewind only) */
  className?: string;
  /** Use optimized RCTView component for better performance  */
  useFastView?: boolean;
}
