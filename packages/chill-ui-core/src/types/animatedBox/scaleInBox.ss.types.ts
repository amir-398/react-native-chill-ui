import { AnimatedBoxProps } from './animatedBox.ss.types';

/**
 * Props for the ScaleInBox component (StyleSheet version).
 *
 * Creates a scale-in animation that smoothly transitions the content from small to normal size.
 * Uses a spring animation for a natural, bouncy effect.
 *
 */
export interface ScaleInBoxProps extends AnimatedBoxProps {
  /** Delay before starting the scale-in animation in milliseconds. @default 0 */
  delay?: number;

  /** Whether to start the animation automatically. @default false */
  autoStart?: boolean;

  /** Whether to loop the animation infinitely. @default false */
  infiniteLoop?: boolean;
}

/**
 * Ref interface for ScaleInBox component.
 *
 * Provides methods to control the scale-in animation programmatically.
 *
 * @example
 * ```tsx
 * const scaleRef = useRef<ScaleInBoxRef>(null);
 *
 * // Start animation
 * scaleRef.current?.start();
 *
 * // Stop animation and reset to initial state
 * scaleRef.current?.stop();
 * ```
 */
export interface ScaleInBoxRef {
  /** Starts the scale-in animation */
  start: () => void;

  /** Stops the scale-in animation and resets to initial state */
  stop: () => void;
}
