import { cn } from '@utils';
import { BoxTw } from '@components/box';
import { PropsWithChildren } from 'react';
import { TimePickerPropsTw } from '@types';

import TimePickerNotifier from './TimePickerNotifier';
import { TimePickerProvider } from './TimePickerProvider';
import { twStyles } from '../styles/TimePicker.tw.styles';

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
 * @param defaultTime - Default time as Date object (use createTimePickerDate() helper to avoid timezone display issues)
 * @param onTimeChange - Callback function called when time changes (returns TimePickerValue object with hour, minute, second, formatted string, and Date object)
 * @param className - TailwindCSS class name for styling
 * @returns TimePicker component with animated time selection
 */
export function TimePicker(props: PropsWithChildren<TimePickerPropsTw>) {
  const { children, className, defaultTime, onTimeChange, ...rest } = props;

  return (
    <TimePickerProvider defaultTime={defaultTime}>
      {onTimeChange && <TimePickerNotifier onTimeChange={onTimeChange} />}
      <BoxTw className={cn(twStyles.container, className)} {...rest}>
        {children}
      </BoxTw>
    </TimePickerProvider>
  );
}

TimePicker.displayName = 'TimePicker';
