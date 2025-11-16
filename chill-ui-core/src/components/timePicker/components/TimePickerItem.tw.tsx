import { cn } from '@utils';
import { Animated } from 'react-native';
import { StringTw } from '@components/string';
import { AnimatedBoxTw } from '@components/animatedBox';

import { TimePickerItemPropsTw } from '@/types';

import { twStyles } from '../styles/TimePicker.tw.styles';
import { useTimePickerItem } from '../hooks/useTimePickerItem';

export type TimePickerItemInternalProps = TimePickerItemPropsTw & {
  defaultData: (string | number)[];
  index: number;
  itemSize: number;
  scrollAnimatedValuerRef: Animated.Value;
  item: string | number;
};

/**
 * TimePickerItem component that renders individual time values in the scroller.
 * Features smooth opacity and scale animations based on scroll position.
 * This component is used internally by TimePickerScroller and receives props automatically.
 *
 * @example
 * ```tsx
 * // Used as a child of TimePickerScroller
 * <TimePickerScroller mode="hour">
 *   <TimePickerItem />
 * </TimePickerScroller>
 *
 * // With custom string props for styling
 * <TimePickerScroller mode="minute">
 *   <TimePickerItem stringProps={{ font: 'primaryBold', size: 'xl' }} />
 * </TimePickerScroller>
 * ```
 *
 * @param className - TailwindCSS class name for styling the item container
 * @param stringProps - Props to pass to the String component that displays the value
 * @returns Animated item component with smooth opacity and scale transitions
 */
export function TimePickerItem(props: TimePickerItemPropsTw) {
  const { className, defaultData, index, item, itemSize, scrollAnimatedValuerRef, stringProps, style } =
    props as TimePickerItemInternalProps;

  const { makeAnimated } = useTimePickerItem({ defaultData, itemSize });

  return (
    <AnimatedBoxTw
      className={cn(twStyles.listItem, className)}
      style={[
        {
          opacity: scrollAnimatedValuerRef.interpolate(makeAnimated(1, 0.6, 0.3, index)),
          transform: [
            {
              scale: scrollAnimatedValuerRef.interpolate(makeAnimated(1.2, 0.9, 0.8, index)),
            },
          ],
          width: itemSize,
        },
        style,
      ]}
    >
      <StringTw {...stringProps}>{item}</StringTw>
    </AnimatedBoxTw>
  );
}

TimePickerItem.displayName = 'TimePickerItem';
