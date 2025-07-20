import { ReactNode } from 'react';

import type { AnimatedViewProps } from '../index';

/**
 * Props for the FadeInBox component.
 *
 * Creates a fade-in animation that smoothly transitions the content from transparent to opaque.
 * Perfect for revealing content with a subtle entrance effect.
 *
 */
export interface FadeInBoxProps extends AnimatedViewProps {
  /** Delay before starting the fade-in animation in milliseconds. @default 0 */
  delay?: number;

  /** Duration of the fade-in animation in milliseconds. @default 1000 */
  duration?: number;

  /** Content to be animated inside the fade-in box */
  children: ReactNode;

  /** Whether to start the animation automatically. @default false */
  autoStart?: boolean;

  /** Whether to loop the animation infinitely. @default false */
  infiniteLoop?: boolean;

  /** Whether to use native driver for the animation. @default true */
  className?: string;
}

/**
 * Ref interface for FadeInBox component.
 *
 * Provides methods to control the fade-in animation programmatically.
 *

 */
export interface FadeInBoxRef {
  /** Starts the fade-in animation */
  start: () => void;

  /** Stops the fade-in animation */
  stop: () => void;

  /** Loops the fade-in animation infinitely */
  loop: () => void;
}
