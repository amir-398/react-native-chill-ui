import { StyleSheet } from 'react-native';

import { Box } from '../box';
import SelectTime from './SelectTime';
import { TimePickerOptionsProps, TimePickerProps } from '../../types';

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

const styles = (theme: TimePickerOptionsProps) =>
  StyleSheet.create({
    container: {
      backgroundColor: theme.backgroundColor,
      overflow: 'hidden',
      position: 'relative',
      width: '100%',
    },
  });

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

export default TimePicker;
