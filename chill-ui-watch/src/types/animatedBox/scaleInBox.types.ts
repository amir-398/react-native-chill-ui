import { ReactNode } from 'react';

import type { AnimatedViewProps } from '../index';

/**
 * Props for the ScaleInBox component.
 *
 * Creates a scale-in animation that smoothly transitions the content from small to normal size.
 * Uses a spring animation for a natural, bouncy effect.
 *
 */
export interface ScaleInBoxProps extends AnimatedViewProps {
  /** Delay before starting the scale-in animation in milliseconds. @default 0 */
  delay?: number;

  /** Duration of the scale-in animation in milliseconds. @default 800 */
  duration?: number;

  /** Content to be animated inside the scale-in box */
  children: ReactNode;

  /** Whether to start the animation automatically. @default false */
  autoStart?: boolean;

  /** Whether to loop the animation infinitely. @default false */
  infiniteLoop?: boolean;

  /** Additional className for the scale-in box */
  className?: string;
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
 * // Stop animation
 * scaleRef.current?.stop();
 *
 * // Loop animation
 * scaleRef.current?.loop();
 * ```
 */
export interface ScaleInBoxRef {
  /** Starts the scale-in animation */
  start: () => void;

  /** Stops the scale-in animation */
  stop: () => void;

  /** Loops the scale-in animation infinitely */
  loop: () => void;
}
