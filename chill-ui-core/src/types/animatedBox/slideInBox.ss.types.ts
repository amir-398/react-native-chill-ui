import { AnimatedBoxProps } from './animatedBox.ss.types';

/**
 * Props for the SlideInBox component (StyleSheet version).
 *
 * Creates a slide-in animation that moves the content from a specified direction.
 * Supports sliding from left, right, up, or down directions.
 *
 */
export interface SlideInBoxProps extends AnimatedBoxProps {
  /** Delay before starting the slide-in animation in milliseconds. @default 0 */
  delay?: number;

  /** Duration of the slide-in animation in milliseconds. @default 500 */
  duration?: number;

  /** Distance to slide from in pixels. @default 100 */
  distance?: number;

  /** Direction from which to slide in. @default 'left' */
  direction?: 'left' | 'right' | 'up' | 'down';

  /** Whether to start the animation automatically. @default false */
  autoStart?: boolean;

  /** Whether to loop the animation infinitely. @default false */
  infiniteLoop?: boolean;
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
