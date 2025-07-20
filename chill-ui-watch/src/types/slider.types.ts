/**
 * Props for the Slider component
 */
export interface SliderProps {
  /** Step value for the slider */
  step?: number;
  /** Whether the slider is disabled */
  disabled?: boolean;
  /** Whether the slider is vertical */
  vertical?: boolean;
  /** Color of the thumb */
  thumbColor?: string;
  /** Minimum value of the slider */
  minimumValue: number;
  /** Maximum value of the slider */
  maximumValue: number;
  /** Array of track mark positions */
  trackMarks?: number[];
  /** Animation configuration */
  animationConfig?: any;
  /** Whether to start from zero */
  startFromZero?: boolean;
  /** Custom CSS classes for the track */
  trackClassName?: string;
  /** Custom CSS classes for the thumb */
  thumbClassName?: string;
  /** Current value(s) of the slider */
  value: number | number[];
  /** Whether the track is clickable */
  trackClickable?: boolean;
  /** Whether to debug touch area */
  debugTouchArea?: boolean;
  /** Right padding for the track */
  trackRightPadding?: number;
  /** Color of the maximum track */
  maximumTrackColor?: string;
  /** Color of the minimum track */
  minimumTrackColor?: string;
  /** Custom CSS classes for the container */
  containerClassName?: string;
  /** Whether to animate transitions */
  animateTransitions?: boolean;
  /** Custom CSS classes for the maximum track */
  maximumTrackClassName?: string;
  /** Custom CSS classes for the minimum track */
  minimumTrackClassName?: string;
  /** Image for the thumb */
  thumbImage?: string | string[];
  /** Type of animation */
  animationType?: 'timing' | 'spring';
  /** Touch size for the thumb */
  thumbTouchSize?: { width: number; height: number };
  /** Custom render function for maximum track */
  renderMaximumTrackComponent?: () => React.ReactNode;
  /** Custom render function for minimum track */
  renderMinimumTrackComponent?: () => React.ReactNode;
  /** Custom render function for track marks */
  renderTrackMarkComponent?: (index: number) => React.ReactNode;
  /** Callback when value changes */
  onValueChange?: (values: number[], activeThumbIndex: number) => void;
  /** Callback when sliding starts */
  onSlidingStart?: (values: number[], activeThumbIndex: number) => void;
  /** Callback when sliding completes */
  onSlidingComplete?: (values: number[], activeThumbIndex: number) => void;
  /** Custom render function for component above thumb */
  renderAboveThumbComponent?: (index: number, value: number) => React.ReactNode;
  /** Custom render function for component below thumb */
  renderBelowThumbComponent?: (index: number, value: number) => React.ReactNode;
  /** Custom render function for thumb component */
  renderThumbComponent?: React.ReactNode | ((index: number) => React.ReactNode);
}
