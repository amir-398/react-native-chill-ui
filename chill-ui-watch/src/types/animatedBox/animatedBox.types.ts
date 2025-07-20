import type { AnimatedViewProps } from '../index';

/**
 * Props for the basic AnimatedBox component.
 *
 * This is the base animated container component that extends AnimatedViewProps
 * without adding any additional animation-specific properties.
 * ```
 */
export interface AnimatedBoxProps extends AnimatedViewProps {
  /** Additional className for the animated box */
  className?: string;
}
