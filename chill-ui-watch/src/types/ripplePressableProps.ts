/**
 * Props for the RipplePressable component
 */
export interface RipplePressableProps {
  /** Custom CSS classes for the pressable component */
  className?: string;
  /** Callback function when the component is pressed */
  onPress?: () => void;
  /** Child components to render inside the pressable */
  children: React.ReactNode;
}
