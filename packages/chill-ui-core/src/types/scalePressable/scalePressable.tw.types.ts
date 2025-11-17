import { PressableProps, StyleProp, ViewStyle } from 'react-native';

export interface ScalePressableProps extends Omit<PressableProps, 'onPress' | 'onPressIn' | 'onPressOut' | 'style'> {
  /**
   * Scale factor when pressed (default: 0.95)
   */
  scaleValue?: number;

  /**
   * Custom CSS classes for styling the container (NativeWind)
   */
  className?: string;

  /**
   * Animation duration in milliseconds (default: 100)
   */
  duration?: number;
  /**
   * Callback function called when the component is pressed
   */
  onPress?: (event: any) => void;

  /**
   * Style object for the pressable container
   */
  style?: StyleProp<ViewStyle>;
}
