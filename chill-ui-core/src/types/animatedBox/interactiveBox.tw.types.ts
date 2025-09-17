import { AnimatedBoxProps } from './animatedBox.tw.types';

/**
 * Props for the InteractiveBox component (Tailwind version).
 *
 * Creates an interactive pressable container with scale and opacity animations.
 * Responds to press events with smooth visual feedback.
 *
 */
export interface InteractiveBoxProps extends AnimatedBoxProps {
  /** Duration of the press animation in milliseconds. @default 200 */
  duration?: number;

  /** Scale value when pressed. @default 1.1 */
  scaleValue?: number;

  /** Opacity value when pressed. @default 0.8 */
  opacityValue?: number;

  /** Callback function called when pressing in */
  onPressIn?: () => void;

  /** Callback function called when pressing out */
  onPressOut?: () => void;
}
