import { isString } from '@utils';
import { PropsWithChildren } from 'react';
import { StringTw } from '@components/string';
import { TimePickerTitlePropsTw } from '@types';

/**
 * TimePickerTitle component for displaying labels or separators in the time picker.
 * Renders as a large-sized String component.
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
  const { children, ...rest } = props;

  if (!isString(children)) {
    return null;
  }

  return (
    <StringTw size="lg" {...rest}>
      {children}
    </StringTw>
  );
}

TimePickerTitle.displayName = 'TimePickerTitle';
