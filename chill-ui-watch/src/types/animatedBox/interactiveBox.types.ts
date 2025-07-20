import { ReactNode } from 'react';

import type { AnimatedViewProps } from '../index';

/**
 * Props for the InteractiveBox component.
 *
 * Creates an interactive pressable container with scale and opacity animations.
 * Responds to press events with smooth visual feedback.
 *
 */
export interface InteractiveBoxProps extends AnimatedViewProps {
  /** Duration of the press animation in milliseconds. @default 200 */
  duration?: number;

  /** Content to be animated inside the interactive box */
  children: ReactNode;

  /** Scale value when pressed. @default 1.1 */
  scaleValue?: number;

  /** Opacity value when pressed. @default 0.8 */
  opacityValue?: number;

  /** Callback function called when pressing in */
  onPressIn?: () => void;

  /** Callback function called when pressing out */
  onPressOut?: () => void;
}
