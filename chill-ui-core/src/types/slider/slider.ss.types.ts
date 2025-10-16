import { StyleProp, ViewProps, ViewStyle } from 'react-native';

import { StringProps } from '../string/string.ss.types';

/**
 * Props for Slider components (StyleSheet)
 */

export type SliderRootProps = ViewProps & {
  /** Style object for additional styling */
  style?: StyleProp<ViewStyle>;
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
  /** Current value(s) of the slider - use an array even for a single thumb */
  value: number[];
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
  /** Style object for additional styling */
  style?: StyleProp<ViewStyle>;
  /** Whether clicking on the track moves the thumb */
  clickable?: boolean;
};

export type SliderRangeProps = ViewProps & {
  /** Style object for additional styling */
  style?: StyleProp<ViewStyle>;
};

export type SliderThumbProps = ViewProps & {
  /** Style object for additional styling */
  style?: StyleProp<ViewStyle>;
  /** Index of the thumb (for multiple thumbs) */
  index?: number;
  /** Touch area size in pixels */
  touchSize?: number;
  /** Animation type for the thumb */
  animationType?: 'scale' | 'extend' | 'none';
};

export type SliderLabelProps = ViewProps & {
  /** Style object for additional styling */
  style?: StyleProp<ViewStyle>;
  /** Index of the thumb to follow (for multiple thumbs) */
  index?: number;
  /** Position relative to the thumb */
  position?: 'top' | 'bottom';
  /** Props for String component when children is a string */
  stringProps?: StringProps;
};
