import { BoxSs } from '@components/box';
import { PropsWithChildren } from 'react';
import { TimePickerPropsSs } from '@types';

import TimePickerNotifier from './TimePickerNotifier';
import { styles } from '../styles/TimePicker.ss.styles';
import { TimePickerProvider } from './TimePickerProvider';

/**
 * The `<TimePicker />` component provides a customizable time selection interface.
 * It features animated scrolling pickers for hours and minutes with customizable styling.
 *
 * <!-- STORYBOOK_IMPORT_START
 * ```tsx
 * import { TimePicker, TimePickerContent, TimePickerScroller, TimePickerItem,TimePickerTitle, createTimePickerDate } from 'react-native-chill-ui';
 * ```
 * STORYBOOK_IMPORT_END -->
 *
 * @example
 * ```tsx
 * <TimePicker>
 *   <TimePickerContent>
 *     <TimePickerScroller mode="hour">
 *       <TimePickerItem />
 *     </TimePickerScroller>
 *     <TimePickerScroller mode="minute">
 *       <TimePickerItem />
 *     </TimePickerScroller>
 *   </TimePickerContent>
 * </TimePicker>
 * ```
 *
 * @param defaultTime - Default time as Date object (use getTimePickerDateNow() helper to avoid timezone display issues)
 * @param onTimeChange - Callback function called when time changes (returns TimePickerValue object with hour, minute, second, formatted string, and Date object)
 * @param style - StyleSheet styles for styling
 * @returns TimePicker component with animated time selection
 */
export function TimePicker(props: PropsWithChildren<TimePickerPropsSs>) {
  const { children, defaultTime, onTimeChange, style, ...rest } = props;

  return (
    <TimePickerProvider defaultTime={defaultTime}>
      {onTimeChange && <TimePickerNotifier onTimeChange={onTimeChange} />}
      <BoxSs style={[styles.container, style]} {...rest}>
        {children}
      </BoxSs>
    </TimePickerProvider>
  );
}

TimePicker.displayName = 'TimePicker';
