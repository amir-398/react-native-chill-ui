import { ViewStyle, StyleProp, ViewProps } from 'react-native';

import { StringProps } from '../string/string.ss.types';

export type TimePickerValue = {
  hour?: number;
  minute?: number;
  second?: number;
  formatted: string;
  date?: Date;
};

export type TimePickerProps = ViewProps & {
  defaultTime?: Date;
  onTimeChange?: (time: TimePickerValue) => void;
  style?: StyleProp<ViewStyle>;
};

export type TimePickerScrollerProps = {
  mode?: 'hour' | 'minute' | 'second';
  data?: (string | number)[];
  defaultValue?: number;
  onChange?: (value: number) => void;
  style?: StyleProp<ViewStyle>;
  interval?: number;
};

export type TimePickerContentProps = ViewProps & {
  style?: StyleProp<ViewStyle>;
};

export type TimePickerTitleProps = StringProps;

export type TimePickerItemProps = {
  style?: StyleProp<ViewStyle>;
  stringProps?: StringProps;
};
