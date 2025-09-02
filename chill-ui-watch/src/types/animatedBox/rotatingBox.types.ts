import { ReactNode } from 'react';

import type { AnimatedViewProps } from '../index';

/**
 * Props for the RotatingBox component.
 *
 * Creates a rotation animation that spins the content 360 degrees.
 * Can be set to loop continuously or run only once.
 *
 */
export interface RotatingBoxProps extends AnimatedViewProps {
  /** Delay before starting the rotation animation in milliseconds. @default 0 */
  delay?: number;

  /** Duration of one complete rotation in milliseconds. @default 2000 */
  duration?: number;

  /** Content to be animated inside the rotating box */
  children: ReactNode;

  /** Whether to start the animation automatically. @default false */
  autoStart?: boolean;

  /** Whether to loop the animation infinitely. @default false */
  infiniteLoop?: boolean;

  /** Whether to make the rotation continuous without pauses between loops. @default false */
  continuous?: boolean;

  /** Additional className for the rotating box */
  className?: string;
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
 *

 * ```
 */
export interface RotatingBoxRef {
  /** Starts the rotation animation */
  start: () => void;

  /** Stops the rotation animation */
  stop: () => void;
}
