import { cn } from '@utils';
import { BoxTw } from '@components/box';
import { PropsWithChildren } from 'react';
import { TimePickerContentPropsTw } from '@types';

import { twStyles } from '../styles/TimePicker.tw.styles';
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
 * @param className - TailwindCSS class name for styling
 * @returns Container component for time picker scrollers
 */
export function TimePickerContent(props: PropsWithChildren<TimePickerContentPropsTw>) {
  const { children, className, ...rest } = props;
  const { setItemSize } = useTimePickerActions();
  const { itemSize } = useTimePickerState();

  const { changeItemWidth } = useTimePickerContent({ itemSize, setItemSize });

  return (
    <BoxTw {...rest} className={cn(twStyles.contentContainer, className)} onLayout={changeItemWidth}>
      {children}
    </BoxTw>
  );
}

TimePickerContent.displayName = 'TimePickerContent';
