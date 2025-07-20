import { SIZE_OPTIONS } from '../components/toggle/toggle';

/**
 * Props for the Toggle component
 */
export type ToggleProps = {
  /** Current toggle state (true for on, false for off) */
  value: boolean;
  /** Custom CSS classes for the container */
  className?: string;
  /** Whether the toggle is in loading state */
  isLoading?: boolean;
  /** Whether the toggle is disabled */
  isDisabled?: boolean;
  /** Callback function called when toggle state changes */
  onChange: (value: boolean) => void;
  /** Toggle size variant */
  size?: (typeof SIZE_OPTIONS)[number];
  /** Color of the thumb when toggle is on */
  thumbColorOn?: string;
  /** Color of the thumb when toggle is off */
  thumbColorOff?: string;
  /** Color of the track when toggle is off */
  trackColorOff?: string;
  /** Color of the track when toggle is on */
  trackColorOn?: string;
};
