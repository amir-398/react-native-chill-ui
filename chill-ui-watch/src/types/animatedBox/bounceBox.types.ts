import { ReactNode } from 'react';

import { AnimatedViewProps } from '@/components/box/components/View';

/**
 * Props for the BounceBox component.
 *
 * Creates a bouncing animation effect that moves the content up and down.
 * Can be triggered manually or automatically at specified intervals.
 *
 */
export interface BounceBoxProps extends AnimatedViewProps {
  /** Duration of the bounce animation in milliseconds. @default 400 */
  duration?: number;

  /** Content to be animated inside the bounce box */
  children: ReactNode;

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

  /** Additional className for the bounce box */
  className?: string;
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
