import { Box } from '@components/box';
import { PropsWithChildren } from 'react';
import { TimePickerPropsTw } from '@types';
import { classNameHandler, cn, styleHandler } from '@utils';

import TimePickerNotifier from './TimePickerNotifier';
import { styles } from '../styles/TimePicker.ss.styles';
import { TimePickerProvider } from './TimePickerProvider';
import { twStyles } from '../styles/TimePicker.tw.styles';

/**
 *
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
 * @param className - TailwindCSS class name for styling (optional)
 * @param style - StyleSheet styles for styling (optional)
 * @returns TimePicker component with animated time selection
 */
export function TimePicker(props: PropsWithChildren<TimePickerPropsTw>) {
  const { children, className, defaultTime, onTimeChange, style, ...rest } = props;

  return (
    <TimePickerProvider defaultTime={defaultTime}>
      {onTimeChange && <TimePickerNotifier onTimeChange={onTimeChange} />}
      <Box
        {...classNameHandler(cn(twStyles.container, className))}
        {...styleHandler({ defaultStyle: styles.container, style })}
        {...rest}
      >
        {children}
      </Box>
    </TimePickerProvider>
  );
}

TimePicker.displayName = 'TimePicker';
