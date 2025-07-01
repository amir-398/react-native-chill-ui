export type TimePickerOptionsProps = {
  backgroundColor: string;
  textHeaderColor: string;
  textDefaultColor: string;
  selectedTextColor: string;
  mainColor: string;
  textSecondaryColor: string;
  borderColor: string;
  defaultFont: string;
  headerFont: string;
  textFontSize: number;
  textHeaderFontSize: number;
  headerAnimationDistance: number;
  daysAnimationDistance: number;
  height: number;
};

export type TimePickerProps<T> = {
  onTimeChange: (date: string) => void;
  current?: string;
  selected?: string;
  configs?: object;
  options?: Partial<TimePickerOptionsProps>;
  minuteInterval?: T;
  style?: object;
};

export type TimeScrollerProps = {
  title: string;
  data: string[];
  onChange: (value: number) => void;
  options: TimePickerOptionsProps;
};
