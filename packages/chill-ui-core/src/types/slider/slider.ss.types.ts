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
  /** Animation type for the thumb:
   * - `'scale'` : for scale animation
   * - `'extend'` : for extend animation
   * - `'none'` : for no animation
   */
  animationType?: 'scale' | 'extend' | 'none';
};

export type SliderLabelProps = ViewProps & {
  /** Style object for additional styling */
  style?: StyleProp<ViewStyle>;
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
