import { StyleProp, TextStyle, ViewProps, ViewStyle } from 'react-native';

import { StringProps } from '../string/string.ss.types';

/**
 * Props for the SegmentedControlItem component
 */
export interface SegmentedControlTriggerProps {
  /** Value of the item */
  value: string;
  /** Whether the item is a child */
  asChild?: boolean;
  /** Whether the item is disabled */
  isDisabled?: boolean;
  /** Style of the active item */
  activeStyle?: ViewStyle;
  /** Style of the item */
  style?: StyleProp<ViewStyle>;
  /** Type of the item */
  as?: 'touchable-opacity' | 'pressable';
  /** Props for the String component */
  stringProps?: StringProps & { activeStyle?: TextStyle; activeColor?: string };
}

/**
 * Props for the SegmentedControlIndicator component
 */
export interface SegmentedControlIndicatorProps {
  /** Duration of the indicator animation */
  duration?: number;
  /** Style of the indicator */
  style?: StyleProp<ViewStyle>;
}

/**
 * Props for the SegmentedControlPanel component
 */
export type SegmentedControlPanelProps = ViewProps & {
  /** The value of the item that should be active when initially rendered */
  value: string;
  /** Whether the panel is a child */
  asChild?: boolean;
  /** Whether the panel should be force rendered */
  forceRender?: boolean;
};

export type SegmentedControlPanelsProps = ViewProps & {
  /** Custom style for the panel content container */
  style?: StyleProp<ViewStyle>;
  /** Whether the panel content is a child */
  asChild?: boolean;
};
/**
 * Props for the SegmentedControlPanelSliderContent component
 */
export type SegmentedControlPanelSliderContentProps = {
  /** Custom style for the panel slider content container */
  style?: StyleProp<ViewStyle>;
};

/**
 * Props for the SegmentedControlTriggerContent component
 */
export interface SegmentedControlTriggerContentProps {
  /** Initial selected option value (must match one of the trigger values) */
  defaultValue?: string;
  /** Internal padding between trigger items in pixels */
  internalPadding?: number;
  /** Custom style for the trigger content container */
  style?: StyleProp<ViewStyle>;
  /** Callback function called when the selected option changes, receives the new option value */
  onChange?: (option: string) => void;
}
