import { VariantProps } from 'tailwind-variants';
import { ViewStyle, StyleProp } from 'react-native';
import { toggleTv } from '@components/toggle/styles/toggle.tw.styles';

/**
 * Props for the Toggle component
 */
export type ToggleProps = {
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
  /** Whether the toggle is in loading state */
  isLoading?: VariantProps<typeof toggleTv>['isLoading'];
  /** Whether the toggle is disabled */
  isDisabled?: VariantProps<typeof toggleTv>['isDisabled'];
  /** Size of the toggle */
  size?: VariantProps<typeof toggleTv>['size'];
};
