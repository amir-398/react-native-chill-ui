import { ViewProps } from 'react-native';

import { StringProps } from '../string/string.tw.types';

/**
 * Props for Slider components (Tailwind)
 */

export type SliderRootProps = ViewProps & {
  /** Custom CSS classes for styling */
  className?: string;
  /** Whether the slider is disabled */
  isDisabled?: boolean;
  /** Step value for discrete slider */
  step?: number;
  /** Minimum value of the slider */
  minimumValue?: number;
  /** Maximum value of the slider */
  maximumValue?: number;
  /** Animation configuration object */
  animationConfig?: any;
  /** Current value(s) of the slider */
  value?: number | number[];
  /** Right padding for the track */
  trackRightPadding?: number;
  /** Whether to animate transitions */
  animateTransitions?: boolean;
  /** Type of animation to use */
  animationType?: 'timing' | 'spring';
  /** Orientation of the slider */
  orientation?: 'horizontal' | 'vertical';
  /** Callback when value changes during sliding */
  onValueChange?: (values: number[], activeThumbIndex: number) => void;
  /** Callback when sliding starts */
  onSlidingStart?: (values: number[], activeThumbIndex: number) => void;
  /** Callback when sliding completes */
  onSlidingComplete?: (values: number[], activeThumbIndex: number) => void;
};

export type SliderTrackProps = ViewProps & {
  /** Custom CSS classes for styling */
  className?: string;
  /** Whether clicking on the track moves the thumb */
  clickable?: boolean;
};

export type SliderRangeProps = ViewProps & {
  /** Custom CSS classes for styling */
  className?: string;
};

export type SliderThumbProps = ViewProps & {
  /** Custom CSS classes for styling */
  className?: string;
  /** Index of the thumb (for multiple thumbs) */
  index?: number;
  /** Touch area size in pixels */
  touchSize?: number;
  /** Animation type for the thumb */
  animationType?: 'scale' | 'extend' | 'none';
};

export type SliderLabelProps = ViewProps & {
  /** Custom CSS classes for styling */
  className?: string;
  /** Index of the thumb to follow (for multiple thumbs) */
  index?: number;
  /** Position relative to the thumb */
  position?: 'top' | 'bottom';
  /** Props for String component when children is a string */
  stringProps?: StringProps;
};
