import { VariantProps } from 'tailwind-variants';
import { ViewStyle, StyleProp } from 'react-native';
import { toggleTv } from '@components/toggle/styles/toggle.tw.styles';

/**
 * Props for the Toggle component
 */
export type ToggleProps = VariantProps<typeof toggleTv> & {
  /** Current toggle state (true for on, false for off) */
  value?: boolean;
  /** Custom CSS classes for the container */
  className?: string;
  /** Callback function called when toggle state changes */
  onChange?: (value: boolean) => void;
  /** Color of the thumb when toggle is on */
  thumbColorOn?: string;
  /** Color of the thumb when toggle is off */
  thumbColorOff?: string;
  /** Color of the track when toggle is off */
  trackColorOff?: string;
  /** Color of the track when toggle is on */
  trackColorOn?: string;
  /** Custom CSS classes for the container */
  style?: StyleProp<ViewStyle>;
};
