import { ViewProps, StyleProp, TextStyle, ViewStyle } from 'react-native';

import { StringProps } from '../string/string.tw.types';

/**
 * Props for the SegmentedControlItem component
 */
export interface SegmentedControlTriggerProps {
  /** Value of the item */
  value: string;
  /** Whether the item is a child */
  asChild?: boolean;
  /** Custom CSS classes for the item */
  className?: string;
  /** Whether the item is disabled */
  isDisabled?: boolean;
  /** Style of the active item */
  activeStyle?: ViewStyle;
  /** Custom CSS classes for the active item */
  activeClassName?: string;
  /** Style of the item */
  style?: StyleProp<ViewStyle>;
  /** Type of the item */
  as?: 'touchable-opacity' | 'pressable';
  /** Props for the String component */
  stringProps?: StringProps & { activeStyle?: TextStyle; activeColor?: string; activeClassName?: string };
}

/**
 * Props for the SegmentedControlIndicator component
 */
export interface SegmentedControlIndicatorProps {
  /** Duration of the indicator animation */
  duration?: number;
  /** Custom CSS classes for the indicator */
  className?: string;
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
  className?: string;
};

/**
 * Props for the SegmentedControlPanelContent component
 */
export type SegmentedControlPanelsProps = ViewProps & {
  className?: string;
  style?: StyleProp<ViewStyle>;
  asChild?: boolean;
};

/**
 * Props for the SegmentedControlPanelSliderContent component
 */
export type SegmentedControlPanelSliderContentProps = {
  className?: string;
  style?: StyleProp<ViewStyle>;
};

/**
 * Props for the SegmentedControlTriggerContent component
 */
export interface SegmentedControlTriggerContentProps {
  className?: string;
  defaultValue?: string;
  internalPadding?: number;
  style?: StyleProp<ViewStyle>;
  onChange?: (option: string) => void;
}
