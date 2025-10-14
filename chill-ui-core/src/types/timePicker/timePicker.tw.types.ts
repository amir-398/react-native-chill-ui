import { ViewStyle, StyleProp, ViewProps } from 'react-native';

import { StringProps } from '../string/string.tw.types';

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
  className?: string;
};

export type TimePickerScrollerProps = {
  className?: string;
  mode?: 'hour' | 'minute' | 'second';
  data?: (string | number)[];
  defaultValue?: number;
  onChange?: (value: number) => void;
  style?: StyleProp<ViewStyle>;
  interval?: number;
};

export type TimePickerContentProps = ViewProps & {
  className?: string;
};

export type TimePickerTitleProps = StringProps;

export type TimePickerItemProps = {
  className?: string;
  stringProps?: StringProps;
};
