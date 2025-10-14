import { PropsWithChildren } from 'react';
import { classNamePropsHandler } from '@utils';
import { Animated, FlatList } from 'react-native';
import { TimePickerScrollerPropsTw } from '@types';

import { timePickerDefaultProps } from '../utils/defaultProps';
import { useTimePickerState } from '../context/TimePickerContext';
import {
  useTimePickerScroller,
  useTimePickerScrollerKeyExtractor,
  useTimePickerScrollerRenderItem,
} from '../hooks/useTimePickerScroller';

const AnimatedFlatList = Animated.createAnimatedComponent(FlatList<string | undefined>);

/**
 * TimePickerScroller component that provides an animated scrolling picker for time values.
 * Features smooth animations, snap-to-interval scrolling, and customizable styling.
 * Automatically detects NativeWind availability and falls back to StyleSheet if needed.
 * Automatically rounds defaultTime to nearest interval when applicable.
 *
 * @example
 * ```tsx
 * // Basic usage with mode (generates 0-23 for hours)
 * <TimePickerScroller mode="hour">
 *   <TimePickerItem />
 * </TimePickerScroller>
 *
 * // With interval (generates 0, 5, 10, 15... for minutes)
 * <TimePickerScroller mode="minute" interval={5}>
 *   <TimePickerItem />
 * </TimePickerScroller>
 *
 * // With default value (will be rounded to nearest interval if applicable)
 * <TimePickerScroller mode="minute" interval={5} defaultValue={27}>
 *   <TimePickerItem /> // Will display 25 (rounded from 27)
 * </TimePickerScroller>
 *
 * // With custom data
 * <TimePickerScroller data={['Morning', 'Afternoon', 'Evening']} onChange={(value) => console.log(value)}>
 *   <TimePickerItem />
 * </TimePickerScroller>
 * ```
 *
 * @param children - TimePickerItem component (required)
 * @param className - TailwindCSS class name for styling (optional)
 * @param data - Custom array of time values to display (overrides mode)
 * @param defaultValue - Initial value to display (will be rounded to nearest interval if applicable)
 * @param interval - Interval between values (e.g., 5 for every 5 minutes, 15 for every 15 minutes)
 * @param mode - Mode to determine data generation: 'hour' (0-23), 'minute' (0-59), or 'second' (0-59)
 * @param onChange - Callback function called when a value is selected
 * @param style - StyleSheet styles for the container (optional)
 * @returns Animated scrolling picker component
 */

export function TimePickerScroller(props: PropsWithChildren<TimePickerScrollerPropsTw>) {
  classNamePropsHandler(props, 'TimePickerScroller');
  const {
    children,
    className,
    data = timePickerDefaultProps.data,
    defaultValue,
    interval,
    mode = timePickerDefaultProps.mode,
    onChange,
    style,
  } = props;

  const { itemSize } = useTimePickerState();
  const { defaultData, flatListRef, handleMomentumScrollEnd, scrollAnimatedValuerRef } = useTimePickerScroller({
    data,
    defaultValue,
    interval,
    mode,
    onChange,
  });
  const { renderItem } = useTimePickerScrollerRenderItem({ children, defaultData, itemSize, scrollAnimatedValuerRef });

  const { keyExtractor } = useTimePickerScrollerKeyExtractor();

  return (
    <AnimatedFlatList
      ref={flatListRef}
      pagingEnabled
      showsHorizontalScrollIndicator={false}
      contentContainerClassName={className}
      contentContainerStyle={style}
      horizontal
      snapToInterval={itemSize || interval}
      decelerationRate="fast"
      scrollEventThrottle={16}
      onScroll={Animated.event([{ nativeEvent: { contentOffset: { x: scrollAnimatedValuerRef } } }], {
        useNativeDriver: true,
      })}
      data={defaultData}
      onMomentumScrollEnd={handleMomentumScrollEnd}
      keyExtractor={keyExtractor}
      renderItem={renderItem}
      removeClippedSubviews
      maxToRenderPerBatch={5}
      updateCellsBatchingPeriod={50}
    />
  );
}

TimePickerScroller.displayName = 'TimePickerScroller';
