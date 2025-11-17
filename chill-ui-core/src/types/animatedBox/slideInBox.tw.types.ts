import { AnimatedBoxProps } from './animatedBox.tw.types';

/**
 * Props for the SlideInBox component (Tailwind version).
 *
 * Creates a slide-in animation that moves the content from a specified direction.
 * Supports sliding from left, right, up, or down directions.
 *
 */
export interface SlideInBoxProps extends AnimatedBoxProps {
  /** Delay before starting the slide-in animation in milliseconds.   */
  delay?: number;

  /** Duration of the slide-in animation in milliseconds.  */
  duration?: number;

  /** Distance to slide from in pixels.  */
  distance?: number;

  /** Direction from which to slide in :
   * - `'left'`
   * - `'right'`
   * - `'up'`
   * - `'down'`
   */
  direction?: 'left' | 'right' | 'up' | 'down';

  /** Whether to start the animation automatically. */
  autoStart?: boolean;

  /** Whether to loop the animation infinitely. */
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
