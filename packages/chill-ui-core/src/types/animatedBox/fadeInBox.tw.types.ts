import { AnimatedBoxProps } from './animatedBox.tw.types';

/**
 * Props for the FadeInBox component (Tailwind version).
 *
 * Creates a fade-in animation that smoothly transitions the content from transparent to opaque.
 * Perfect for revealing content with a subtle entrance effect.
 *
 */
export interface FadeInBoxProps extends AnimatedBoxProps {
  /** Delay before starting the fade-in animation in milliseconds. */
  delay?: number;

  /** Duration of the fade-in animation in milliseconds. */
  duration?: number;

  /** Whether to start the animation automatically. */
  autoStart?: boolean;

  /** Whether to loop the animation infinitely. */
  infiniteLoop?: boolean;
}

/**
 * Ref interface for FadeInBox component.
 *
 * Provides methods to control the fade-in animation programmatically.
 *
 * @example
 * ```tsx
 * const fadeRef = useRef<FadeInBoxRef>(null);
 *
 * // Start animation
 * fadeRef.current?.start();
 *
 * // Stop animation and reset to initial state
 * fadeRef.current?.stop();
 * ```
 */
export interface FadeInBoxRef {
  /** Starts the fade-in animation */
  start: () => void;

  /** Stops the fade-in animation and resets to initial state */
  stop: () => void;
}
