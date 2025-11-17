import { BoxSs } from '@components/box';
import { PropsWithChildren } from 'react';
import { TimePickerContentPropsSs } from '@types';

import { styles } from '../styles/TimePicker.ss.styles';
import { useTimePickerContent } from '../hooks/useTimePickerContent';
import { useTimePickerActions, useTimePickerState } from '../context/TimePickerContext';

/**
 * TimePickerContent component that wraps and layouts TimePickerScroller components.
 * Handles measurement and spacing between scrollers.
 *
 * @example
 * ```tsx
 * <TimePickerContent>
 *   <TimePickerScroller mode="hour">
 *     <TimePickerItem />
 *   </TimePickerScroller>
 *   <TimePickerTitle>:</TimePickerTitle>
 *   <TimePickerScroller mode="minute">
 *     <TimePickerItem />
 *   </TimePickerScroller>
 * </TimePickerContent>
 * ```
 *
 * @param children - TimePickerScroller components and optional separators
 * @param style - StyleSheet styles for styling
 * @returns Container component for time picker scrollers
 */
export function TimePickerContent(props: PropsWithChildren<TimePickerContentPropsSs>) {
  const { children, style, ...rest } = props;
  const { setItemSize } = useTimePickerActions();
  const { itemSize } = useTimePickerState();

  const { changeItemWidth } = useTimePickerContent({ itemSize, setItemSize });

  return (
    <BoxSs {...rest} style={[styles.contentContainer, style]} onLayout={changeItemWidth}>
      {children}
    </BoxSs>
  );
}

TimePickerContent.displayName = 'TimePickerContent';
