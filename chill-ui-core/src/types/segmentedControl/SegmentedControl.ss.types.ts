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
  value: string;
  asChild?: boolean;
  forceRender?: boolean;
};

export type SegmentedControlPanelsProps = ViewProps & {
  style?: StyleProp<ViewStyle>;
  asChild?: boolean;
};
/**
 * Props for the SegmentedControlPanelSliderContent component
 */
export type SegmentedControlPanelSliderContentProps = {
  style?: StyleProp<ViewStyle>;
};

/**
 * Props for the SegmentedControlTriggerContent component
 */
export interface SegmentedControlTriggerContentProps {
  defaultValue?: string;
  internalPadding?: number;
  style?: StyleProp<ViewStyle>;
  onChange?: (option: string) => void;
}
