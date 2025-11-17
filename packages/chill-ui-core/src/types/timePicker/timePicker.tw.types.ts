import { ViewStyle, StyleProp, ViewProps } from 'react-native';

import { StringProps } from '../string/string.tw.types';

export type TimePickerValue = {
  /** Hour value (0-23) */
  hour?: number;
  /** Minute value (0-59) */
  minute?: number;
  /** Second value (0-59) */
  second?: number;
  /** Formatted time string (e.g., "14:30:00") */
  formatted: string;
  /** Date object representing the selected time */
  date?: Date;
};

export type TimePickerProps = ViewProps & {
  /** Default time as Date object (use createTimePickerDate() helper to avoid timezone display issues) */
  defaultTime?: Date;
  /** Callback function called when time changes (returns TimePickerValue object with hour, minute, second, formatted string, and Date object) */
  onTimeChange?: (time: TimePickerValue) => void;
  /**  Custom CSS classes for styling (Nativewind only) */
  className?: string;
};

export type TimePickerScrollerProps = {
  /** Custom CSS classes for styling (Nativewind only) */
  className?: string;
  /** Mode for the scroller (hour, minute, or second) */
  mode?: 'hour' | 'minute' | 'second';
  /** Array of data to display in the scroller */
  data?: (string | number)[];
  /** Default value for the scroller */
  defaultValue?: number;
  /** Callback function called when the value changes */
  onChange?: (value: number) => void;
  /** StyleSheet styles for styling */
  style?: StyleProp<ViewStyle>;
  /** Interval for the scroller */
  interval?: number;
};

export type TimePickerContentProps = ViewProps & {
  /** Custom CSS classes for styling (Nativewind only) */
  className?: string;
};

export type TimePickerTitleProps = StringProps;

export type TimePickerItemProps = {
  /** Custom CSS classes for styling (Nativewind only) */
  className?: string;
  /** String props for the item */
  stringProps?: StringProps;
  /** StyleSheet styles for styling */
  style?: StyleProp<ViewStyle>;
};
