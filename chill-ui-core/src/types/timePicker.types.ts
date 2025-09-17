/**
 * Configuration options for the TimePicker component
 */
export type TimePickerOptionsProps = {
  /** Background color of the picker */
  backgroundColor: string;
  /** Color of the header text */
  textHeaderColor: string;
  /** Default color of the text */
  textDefaultColor: string;
  /** Color of the selected text */
  selectedTextColor: string;
  /** Main accent color */
  mainColor: string;
  /** Secondary text color */
  textSecondaryColor: string;
  /** Color of borders */
  borderColor: string;
  /** Default font family */
  defaultFont: string;
  /** Font family for headers */
  headerFont: string;
  /** Font size for regular text */
  textFontSize: number;
  /** Font size for header text */
  textHeaderFontSize: number;
  /** Animation distance for header */
  headerAnimationDistance: number;
  /** Animation distance for days */
  daysAnimationDistance: number;
  /** Height of the picker */
  height: number;
};

/**
 * Props for the TimePicker component
 */
export type TimePickerProps<T> = {
  /** Callback when time changes */
  onTimeChange: (date: string) => void;
  /** Current time value */
  current?: string;
  /** Selected time value */
  selected?: string;
  /** Additional configuration object */
  configs?: object;
  /** Styling options for the picker */
  options?: Partial<TimePickerOptionsProps>;
  /** Interval for minutes (e.g., 1, 5, 15, 30) */
  minuteInterval?: T;
  /** Custom styles */
  style?: object;
};

/**
 * Props for the TimeScroller component
 */
export type TimeScrollerProps = {
  /** Title of the scroller */
  title: string;
  /** Array of time values to display */
  data: string[];
  /** Callback when value changes */
  onChange: (value: number) => void;
  /** Styling options */
  options: TimePickerOptionsProps;
};
