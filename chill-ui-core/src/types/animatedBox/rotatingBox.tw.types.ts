import { AnimatedBoxProps } from './animatedBox.tw.types';

/**
 * Props for the RotatingBox component (Tailwind version).
 *
 * Creates a rotation animation that spins the content 360 degrees.
 * Can be set to loop continuously or run only once.
 *
 */
export interface RotatingBoxProps extends AnimatedBoxProps {
  /** Delay before starting the rotation animation in milliseconds. */
  delay?: number;

  /** Duration of one complete rotation in milliseconds. */
  duration?: number;

  /** Whether to start the animation automatically. */
  autoStart?: boolean;

  /** Whether to loop the animation infinitely. */
  infiniteLoop?: boolean;

  /** Whether to make the rotation continuous without pauses between loops. */
  continuous?: boolean;
}

/**
 * Ref interface for RotatingBox component.
 *
 * Provides methods to control the rotation animation programmatically.
 *
 * @example
 * ```tsx
 * const rotateRef = useRef<RotatingBoxRef>(null);
 *
 * // Start animation
 * rotateRef.current?.start();
 *
 * // Stop animation
 * rotateRef.current?.stop();
 * ```
 */
export interface RotatingBoxRef {
  /** Starts the rotation animation */
  start: () => void;

  /** Stops the rotation animation */
  stop: () => void;
}
