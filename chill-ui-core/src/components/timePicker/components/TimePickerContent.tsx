import { BoxSs } from '@components/box';
import { PropsWithChildren } from 'react';
import { TimePickerContentPropsTw } from '@types';
import { classNameHandler, classNamePropsHandler, cn, styleHandler } from '@utils';

import { styles } from '../styles/TimePicker.ss.styles';
import { twStyles } from '../styles/TimePicker.tw.styles';
import { useTimePickerContent } from '../hooks/useTimePickerContent';
import { useTimePickerActions, useTimePickerState } from '../context/TimePickerContext';

/**
 * TimePickerContent component that wraps and layouts TimePickerScroller components.
 * Handles measurement and spacing between scrollers.
 * Automatically detects NativeWind availability and falls back to StyleSheet if needed.
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
 * @param className - TailwindCSS class name for styling (optional)
 * @param style - StyleSheet styles for styling (optional)
 * @returns Container component for time picker scrollers
 */
export function TimePickerContent(props: PropsWithChildren<TimePickerContentPropsTw>) {
  classNamePropsHandler(props, 'TimePickerContent');
  const { children, className, style, ...rest } = props;
  const { setItemSize } = useTimePickerActions();
  const { itemSize } = useTimePickerState();

  const { changeItemWidth } = useTimePickerContent({ itemSize, setItemSize });

  return (
    <BoxSs
      {...rest}
      {...classNameHandler(cn(twStyles.contentContainer, className))}
      {...styleHandler({ defaultStyle: styles.contentContainer, style })}
      onLayout={changeItemWidth}
    >
      {children}
    </BoxSs>
  );
}

TimePickerContent.displayName = 'TimePickerContent';
