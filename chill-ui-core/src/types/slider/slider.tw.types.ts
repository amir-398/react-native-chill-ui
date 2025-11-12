import { ViewProps } from 'react-native';

import { StringProps } from '../string/string.tw.types';

/**
 * Props for Slider components (Tailwind)
 */

export type SliderRootProps = ViewProps & {
  /** Custom CSS classes for styling (NativeWind only) */
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
  /** Current value(s) of the slider (controlled mode) - can be a single number or array */
  value?: number | number[];
  /** Default initial value(s) for uncontrolled mode - can be a single number or array */
  defaultValue?: number | number[];
  /** Right padding for the track */
  trackRightPadding?: number;
  /** Whether to animate transitions */
  animateTransitions?: boolean;
  /** Type of animation to use :
   * - `'timing'` : for smooth transitions
   * - `'spring'` : for springy transitions
   */
  animationType?: 'timing' | 'spring';
  /** Orientation of the slider :
   * - `'horizontal'` : for horizontal orientation
   * - `'vertical'` : for vertical orientation
   */
  orientation?: 'horizontal' | 'vertical';
  /** Callback when value changes during sliding */
  onValueChange?: (values: number[], activeThumbIndex: number) => void;
  /** Callback when sliding starts */
  onSlidingStart?: (values: number[], activeThumbIndex: number) => void;
  /** Callback when sliding completes */
  onSlidingComplete?: (values: number[], activeThumbIndex: number) => void;
};

export type SliderTrackProps = ViewProps & {
  /** Custom CSS classes for styling (NativeWind only) */
  className?: string;
  /** Whether clicking on the track moves the thumb */
  clickable?: boolean;
};

export type SliderRangeProps = ViewProps & {
  /** Custom CSS classes for styling (NativeWind only) */
  className?: string;
};

export type SliderThumbProps = ViewProps & {
  /** Custom CSS classes for styling (NativeWind only) */
  className?: string;
  /** Index of the thumb (for multiple thumbs) */
  index?: number;
  /** Touch area size in pixels */
  touchSize?: number;
  /** Animation type for the thumb:
   * - `'scale'` : for scale animation
   * - `'extend'` : for extend animation
   * - `'none'` : for no animation
   */
  animationType?: 'scale' | 'extend' | 'none';
};

export type SliderLabelProps = ViewProps & {
  /** Custom CSS classes for styling (NativeWind only) */
  className?: string;
  /** Index of the thumb to follow (for multiple thumbs) */
  index?: number;
  /** Position relative to the thumb:
   * - `'top'` : for top position
   * - `'bottom'` : for bottom position
   */
  position?: 'top' | 'bottom';
  /** Props for String component when children is a string */
  stringProps?: StringProps;
};
