import { StyleSheet } from 'react-native';

import { Box } from '../box';
import SelectTime from './SelectTime';
import { TimePickerOptionsProps, TimePickerProps } from '../../types/timePicker.types';

/** Default styling options for the TimePicker component */
const options = {
  backgroundColor: '#fff',
  borderColor: 'rgba(122, 146, 165, 0.1)',
  daysAnimationDistance: 200,
  defaultFont: 'System',
  headerAnimationDistance: 100,
  headerFont: 'System',
  height: 220,
  mainColor: '#61dafb',
  selectedTextColor: '#fff',
  textDefaultColor: '#2d4150',
  textFontSize: 15,
  textHeaderColor: '#212c35',
  textHeaderFontSize: 17,
  textSecondaryColor: '#7a92a5',
};

type MinuteInterval = 1 | 2 | 3 | 4 | 5 | 6 | 10 | 12 | 15 | 20 | 30 | 60;

/**
 * Creates styles for the TimePicker container based on theme options
 * @param theme - Theme options for styling
 * @returns StyleSheet object with container styles
 */
const styles = (theme: TimePickerOptionsProps) =>
  StyleSheet.create({
    container: {
      backgroundColor: theme.backgroundColor,
      overflow: 'hidden',
      position: 'relative',
      width: '100%',
    },
  });

/**
 * TimePicker component that provides a customizable time selection interface.
 * Features animated scrolling pickers for hours and minutes with customizable styling.
 *
 * @example
 * ```tsx
 * // Basic time picker
 * <TimePicker
 *   onTimeChange={(time) => console.log('Selected time:', time)}
 *   minuteInterval={15}
 * />
 *
 * // Customized time picker
 * <TimePicker
 *   onTimeChange={(time) => setSelectedTime(time)}
 *   minuteInterval={30}
 *   options={{
 *     backgroundColor: '#f8f9fa',
 *     mainColor: '#007AFF',
 *     height: 300,
 *     textDefaultColor: '#333',
 *   }}
 * />
 * ```
 *
 * @param minuteInterval - Interval between minutes (1, 2, 3, 4, 5, 6, 10, 12, 15, 20, 30, 60)
 * @param onTimeChange - Callback function called when time changes
 * @param options - Custom styling options for the time picker
 * @returns TimePicker component with animated time selection
 */
function TimePicker(props: TimePickerProps<MinuteInterval>) {
  const { minuteInterval = 5, onTimeChange, options: propsOptions } = props;

  const timePickerOptions = {
    ...options,
    ...propsOptions,
  };

  const style = styles(timePickerOptions);

  return (
    <Box style={[style.container, { height: timePickerOptions.height }]}>
      <SelectTime options={timePickerOptions} onTimeChange={onTimeChange} minuteInterval={minuteInterval} />
    </Box>
  );
}

export { TimePicker };
