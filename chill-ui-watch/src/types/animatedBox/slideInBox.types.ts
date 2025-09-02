import { ReactNode } from 'react';

import type { AnimatedViewProps } from '../index';

/**
 * Props for the SlideInBox component.
 *
 * Creates a slide-in animation that moves the content from a specified direction.
 * Supports sliding from left, right, up, or down directions.
 *
 */
export interface SlideInBoxProps extends AnimatedViewProps {
  /** Delay before starting the slide-in animation in milliseconds. @default 0 */
  delay?: number;

  /** Duration of the slide-in animation in milliseconds. @default 500 */
  duration?: number;

  /** Distance to slide from in pixels. @default 100 */
  distance?: number;

  /** Content to be animated inside the slide-in box */
  children: ReactNode;

  /** Direction from which to slide in. @default 'left' */
  direction?: 'left' | 'right' | 'up' | 'down';

  /** Whether to start the animation automatically. @default false */
  autoStart?: boolean;

  /** Whether to loop the animation infinitely. @default false */
  infiniteLoop?: boolean;

  /** Additional className for the slide-in box */
  className?: string;
}

/**
 * Ref interface for SlideInBox component.
 *
 * Provides methods to control the slide-in animation programmatically.
 *
 * @example
 * ```tsx
 * const slideRef = useRef<SlideInBoxRef>(null);
 *
 * // Start animation
 * slideRef.current?.start();
 *
 * // Stop animation and reset to initial state
 * slideRef.current?.stop();
 * ```
 */
export interface SlideInBoxRef {
  /** Starts the slide-in animation */
  start: () => void;

  /** Stops the slide-in animation and resets to initial state */
  stop: () => void;
}
