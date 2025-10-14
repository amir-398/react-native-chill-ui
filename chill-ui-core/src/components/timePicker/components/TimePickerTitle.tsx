import { PropsWithChildren } from 'react';
import { String } from '@components/string';
import { TimePickerTitlePropsTw } from '@types';
import { classNamePropsHandler, isString } from '@utils';

/**
 * TimePickerTitle component for displaying labels or separators in the time picker.
 * Renders as a large-sized String component.
 * Automatically detects NativeWind availability and falls back to StyleSheet if needed.
 *
 * @example
 * ```tsx
 * // As a label
 * <TimePickerTitle>Hours</TimePickerTitle>
 *
 * // As a separator between scrollers
 * <TimePickerScroller mode="hour">
 *   <TimePickerItem />
 * </TimePickerScroller>
 * <TimePickerTitle>:</TimePickerTitle>
 * <TimePickerScroller mode="minute">
 *   <TimePickerItem />
 * </TimePickerScroller>
 * ```
 *
 * @param children - Text content to display (must be a string)
 * @param stringProps - Props for String component
 * @returns String component styled for time picker labels/separators, or null if children is not a string
 */
export function TimePickerTitle(props: PropsWithChildren<TimePickerTitlePropsTw>) {
  classNamePropsHandler(props, 'TimePickerTitle');
  const { children, ...rest } = props;

  if (!isString(children)) {
    return null;
  }

  return (
    <String size="lg" {...rest}>
      {children}
    </String>
  );
}

TimePickerTitle.displayName = 'TimePickerTitle';
