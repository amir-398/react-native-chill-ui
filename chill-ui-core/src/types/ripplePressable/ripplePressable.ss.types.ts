import { PressableProps, ViewStyle } from 'react-native';

/**
 * Props for the RipplePressable component
 */
export type RipplePressableProps = Omit<PressableProps, 'style'> & {
  /** Whether the component is disabled */
  disabled?: boolean;
  /** Color of the ripple effect */
  effectColor?: string;
  /** Speed of the ripple effect animation in milliseconds (default: 500) */
  speed?: number;
  /** Style of the pressable component */
  style?: ViewStyle;
};
