import { BoxSs } from '@components/box';
import { PropsWithChildren } from 'react';
import { TimePickerPropsTw } from '@types';
import { classNameHandler, classNamePropsHandler, cn, styleHandler } from '@utils';

import { useTimePicker } from '../hooks/useTimePicker';
import { styles } from '../styles/TimePicker.ss.styles';
import { TimePickerProvider } from './TimePickerProvider';
import { twStyles } from '../styles/TimePicker.tw.styles';

/**
 * Internal component that observes time values and formats output
 */
function TimePickerWithProvider(props: PropsWithChildren<TimePickerPropsTw>) {
  classNamePropsHandler(props, 'TimePicker');
  const { children, className, onTimeChange, style, ...rest } = props;

  useTimePicker({ onTimeChange });

  return (
    <BoxSs
      {...classNameHandler(cn(twStyles.container, className))}
      {...styleHandler({ defaultStyle: styles.container, style })}
      {...rest}
    >
      {children}
    </BoxSs>
  );
}

/**
 * TimePicker component that provides a customizable time selection interface.
 * Features animated scrolling pickers for hours and minutes with customizable styling.
 * Automatically detects NativeWind availability and falls back to StyleSheet if needed.
 *
 * @example
 * ```tsx
 * import { TimePicker, TimePickerContent, TimePickerScroller, TimePickerItem, getTimePickerDateNow } from '@components';
 *
 * // Basic time picker
 * <TimePicker
 *   onTimeChange={(time) => {
 *     console.log(time.formatted); // "12:30:45"
 *     console.log(time.hour);      // 12
 *     console.log(time.date);      // Date object (UTC)
 *   }}
 * >
 *   <TimePickerContent>
 *     <TimePickerScroller mode="hour">
 *       <TimePickerItem />
 *     </TimePickerScroller>
 *     <TimePickerScroller mode="minute">
 *       <TimePickerItem />
 *     </TimePickerScroller>
 *   </TimePickerContent>
 * </TimePicker>
 *
 * // With default time (use getTimePickerDateNow to avoid timezone issues)
 * <TimePicker defaultTime={getTimePickerDateNow()}>
 *   <TimePickerContent>
 *     <TimePickerScroller mode="hour">
 *       <TimePickerItem />
 *     </TimePickerScroller>
 *     <TimePickerScroller mode="minute" interval={5}>
 *       <TimePickerItem />
 *     </TimePickerScroller>
 *   </TimePickerContent>
 * </TimePicker>
 *
 * // Or with specific default values per scroller
 * <TimePicker>
 *   <TimePickerContent>
 *     <TimePickerScroller mode="hour" defaultValue={14}>
 *       <TimePickerItem />
 *     </TimePickerScroller>
 *     <TimePickerScroller mode="minute" defaultValue={30}>
 *       <TimePickerItem />
 *     </TimePickerScroller>
 *   </TimePickerContent>
 * </TimePicker>
 * ```
 *
 * @param defaultTime - Default time as Date object (use getTimePickerDateNow() helper to avoid timezone display issues)
 * @param onTimeChange - Callback function called when time changes (returns TimePickerValue object with hour, minute, second, formatted string, and Date object)
 * @param className - TailwindCSS class name for styling (optional)
 * @param style - StyleSheet styles for styling (optional)
 * @returns TimePicker component with animated time selection
 */
export function TimePicker(props: PropsWithChildren<TimePickerPropsTw>) {
  const { defaultTime } = props;

  return (
    <TimePickerProvider defaultTime={defaultTime}>
      <TimePickerWithProvider {...props} />
    </TimePickerProvider>
  );
}

TimePicker.displayName = 'TimePicker';
