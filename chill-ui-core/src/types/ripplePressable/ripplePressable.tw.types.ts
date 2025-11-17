import { PressableProps, StyleProp, ViewStyle } from 'react-native';

/**
 * Props for the RipplePressable component
 */
export type RipplePressableProps = Omit<PressableProps, 'style'> & {
  /** Custom CSS classes for the pressable component */
  className?: string;
  /** Whether the component is disabled */
  disabled?: boolean;
  /** Color of the ripple effect */
  effectColor?: string;
  /** Speed of the ripple effect animation in milliseconds (default: 500) */
  speed?: number;

  /** Style of the pressable component */
  style?: StyleProp<ViewStyle>;
};
