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
  /** Type of the item :
   * - `'touchable-opacity'`
   * - `'pressable'`
   */
  as?: 'touchable-opacity' | 'pressable';
  /** Props for the String component */
  stringProps?: StringProps & { activeStyle?: TextStyle; activeColor?: string; activeClassName?: string };
}

/**
 * Props for the SegmentedControlIndicator component
 */
export interface SegmentedControlIndicatorProps {
  /**
   * Duration of the indicator animation
   */
  duration?: number;

  /**
   * Custom CSS classes for the indicator (Nativewind only)
   */
  className?: string;

  /**
   * Style of the indicator
   */
  style?: StyleProp<ViewStyle>;
}

/**
 * Props for the SegmentedControlPanel component
 */
export type SegmentedControlPanelProps = ViewProps & {
  /**
   * The value of the item that should be active when initially rendered
   */
  value: string;

  /**
   * Whether the panel is a child
   */
  asChild?: boolean;

  /**
   * Whether the panel should be force rendered
   */
  forceRender?: boolean;

  /**
   * Custom CSS classes for the panel container (Nativewind only)
   */
  className?: string;
};

/**
 * Props for the SegmentedControlPanelContent component
 */
export type SegmentedControlPanelsProps = ViewProps & {
  /**
   * Custom CSS classes for the panel content container (Nativewind only)
   */
  className?: string;

  /**
   * Style of the panel content container
   */
  style?: StyleProp<ViewStyle>;

  /**
   * Whether the panel content is a child
   */
  asChild?: boolean;
};

/**
 * Props for the SegmentedControlPanelSliderContent component
 */
export type SegmentedControlPanelSliderContentProps = {
  /**
   * Custom CSS classes for the panel slider content container (Nativewind only)
   */
  className?: string;

  /**
   * Style of the panel slider content container
   */
  style?: StyleProp<ViewStyle>;
};

/**
 * Props for the SegmentedControlTriggerContent component
 */
export interface SegmentedControlTriggerContentProps {
  /**
   * Custom CSS classes for the trigger content container
   */
  className?: string;

  /**
   * Initial selected option value (must match one of the trigger values)
   */
  defaultValue?: string;

  /**
   * Internal padding between trigger items in pixels
   */
  internalPadding?: number;

  /**
   * Style of the trigger content container
   */
  style?: StyleProp<ViewStyle>;

  /**
   * Callback function called when the selected option changes, receives the new option value
   */
  onChange?: (option: string) => void;
}
