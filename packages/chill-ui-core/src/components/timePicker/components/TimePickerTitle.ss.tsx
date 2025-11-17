import { isString } from '@utils';
import { PropsWithChildren } from 'react';
import { StringSs } from '@components/string';
import { TimePickerTitlePropsSs } from '@types';

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
export function TimePickerTitle(props: PropsWithChildren<TimePickerTitlePropsSs>) {
  const { children, ...rest } = props;

  if (!isString(children)) {
    return null;
  }

  return (
    <StringSs size="lg" {...rest}>
      {children}
    </StringSs>
  );
}

TimePickerTitle.displayName = 'TimePickerTitle';
