import { AnimatedBoxProps } from './animatedBox.ss.types';

/**
 * Props for the BounceBox component.
 *
 * Creates a bouncing animation effect that moves the content up and down.
 * Can be triggered manually or automatically at specified intervals.
 *
 */
export interface BounceBoxProps extends AnimatedBoxProps {
  /** Duration of the bounce animation in milliseconds. @default 400 */
  duration?: number;

  /** Whether to start the bounce animation automatically. @default false */
  autoStart?: boolean;

  /** Height of the bounce effect in pixels. @default 20 */
  bounceHeight?: number;

  /** Callback function called when the bounce animation starts */
  onBounce?: () => void;

  /** Interval between automatic bounces in milliseconds. @default 2000 */
  bounceInterval?: number;

  /** Whether to loop the animation infinitely. @default false */
  infiniteLoop?: boolean;
}

/**
 * Ref interface for BounceBox component.
 *
 * Provides methods to control the bounce animation programmatically.
 *
 * @example
 * ```tsx
 * const bounceRef = useRef<BounceBoxRefProps>(null);
 *
 * // Trigger bounce manually
 * bounceRef.current?.bounce();
 *
 * // Start animation
 * bounceRef.current?.start();
 *
 * // Stop animation
 * bounceRef.current?.stop();
 * ```
 */
export interface BounceBoxRef {
  /** Triggers the bounce animation manually */
  bounce: () => void;

  /** Starts the bounce animation */
  start: () => void;

  /** Stops the bounce animation and resets to initial state */
  stop: () => void;
}
