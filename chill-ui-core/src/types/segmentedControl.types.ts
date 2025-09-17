/**
 * Props for the SegmentedControl component
 */
export interface SegmentedControlProps {
  /** Array of option strings */
  options: string[];
  /** Custom CSS classes for the container */
  className?: string;
  /** Default selected option */
  defaultOption?: string;
  /** Custom CSS classes for individual items */
  itemClassName?: string;
  /** Internal padding for items */
  internalPadding?: number;
  /** External padding for the container */
  externalPadding?: number;
  /** Custom CSS classes for item text */
  itemTextClassName?: string;
  /** Color for active item text */
  activeItemTextColor?: string;
  /** Color for inactive item text */
  inactiveItemTextColor?: string;
  /** Custom CSS classes for active item text */
  activeItemTextClassName?: string;
  /** Callback when option changes */
  onChange?: (option: string) => void;
}
