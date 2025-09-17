import { useEffect, useRef, useState } from 'react';
import { StyleSheet, Animated, FlatList, ListRenderItem } from 'react-native';

import { Box } from '../box';
import { String } from '../string';
import { TimePickerOptionsProps, TimeScrollerProps } from '../../types/timePicker.types';

const AnimatedFlatList = Animated.createAnimatedComponent(FlatList) as unknown as typeof FlatList;

/**
 * Creates styles for the SelectTime component based on theme options
 * @param theme - Theme options for styling
 * @returns StyleSheet object with component styles
 */
const styles = (theme: TimePickerOptionsProps) =>
  StyleSheet.create({
    container: {
      backgroundColor: theme.backgroundColor,
      borderRadius: 10,
      flexDirection: 'column',
      height: '100%',
      justifyContent: 'center',
      position: 'absolute',
      right: 0,
      top: 0,
      width: '100%',
      zIndex: 999,
    },
    listItem: {
      alignItems: 'center',
      height: 60,
      justifyContent: 'center',
    },
    listItemText: {
      color: theme.textDefaultColor,
      fontFamily: theme.defaultFont,
      fontSize: theme.textHeaderFontSize,
    },
    row: {
      alignItems: 'center',
      flexDirection: 'column',
      marginVertical: 5,
    },
    title: {
      color: theme.mainColor,
      fontFamily: theme.headerFont,
      fontSize: theme.textHeaderFontSize,
    },
  });

/**
 * TimeScroller component that provides an animated scrolling picker for time values.
 * Features smooth animations, snap-to-interval scrolling, and customizable styling.
 *
 * @example
 * ```tsx
 * <TimeScroller
 *   title="Heures"
 *   data={Array.from({ length: 24 }, (_, i) => i.toString().padStart(2, '0'))}
 *   onChange={(hour) => setHour(hour)}
 *   options={themeOptions}
 * />
 * ```
 *
 * @param data - Array of time values to display
 * @param onChange - Callback function when a value is selected
 * @param options - Styling options for the scroller
 * @param title - Title displayed above the scroller
 * @returns Animated scrolling picker component
 */
function TimeScroller({ data, onChange, options, title }: TimeScrollerProps) {
  /** Size of each item in the scroller */
  const [itemSize, setItemSize] = useState(0);
  const style = styles(options);

  /** Animated value for scroll position */
  const scrollAnimatedValue = useRef(new Animated.Value(0)).current;

  /** Reference to scroll listener for cleanup */
  const scrollListener = useRef<string | null>(null);

  /** Currently active item index */
  const active = useRef(0);

  // Add padding items for smooth scrolling
  // @ts-ignore
  // eslint-disable-next-line no-param-reassign
  data = [undefined, undefined, ...data, undefined, undefined];

  useEffect(() => {
    scrollListener.current && scrollAnimatedValue.removeListener(scrollListener.current);
    scrollListener.current = scrollAnimatedValue.addListener(({ value }) => {
      active.current = value;
    });

    return () => {
      if (scrollListener.current) {
        scrollAnimatedValue.removeListener(scrollListener.current);
      }
    };
  }, [scrollAnimatedValue]);

  /**
   * Calculates item size based on container width
   * @param nativeEvent - Layout event with width information
   */
  const changeItemWidth = ({ nativeEvent }: { nativeEvent: { layout: { width: number } } }) => {
    const { width } = nativeEvent.layout;
    !itemSize && setItemSize(width / 5);
  };

  /**
   * Creates animated interpolation for opacity and scale effects
   * @param a - Value for center item
   * @param b - Value for adjacent items
   * @param c - Value for distant items
   * @param currentIndex - Current item index
   * @returns Interpolation configuration object
   */
  const makeAnimated = (a: number, b: number, c: number, currentIndex: number) => ({
    inputRange: [...data.map((_, i) => i * itemSize)],
    outputRange: [
      ...data.map((_, i) => {
        const center = i + 2;
        if (center === currentIndex) {
          return a;
        }
        if (center + 1 === currentIndex || center - 1 === currentIndex) {
          return b;
        }
        return c;
      }),
    ],
  });

  /**
   * Renders individual time items with animations
   * @param index - Item index
   * @param item - Time value to display
   * @returns Animated view component
   */
  const renderItem: ListRenderItem<string> = ({ index, item }) => (
    <Animated.View
      style={[
        {
          opacity: scrollAnimatedValue.interpolate(makeAnimated(1, 0.6, 0.3, index)),
          transform: [
            {
              scale: scrollAnimatedValue.interpolate(makeAnimated(1.2, 0.9, 0.8, index)),
            },
          ],
          width: itemSize,
        },
        style.listItem,
      ]}
    >
      <String style={style.listItemText}>{item}</String>
    </Animated.View>
  );

  return (
    <Box style={style.row} onLayout={changeItemWidth}>
      <String style={style.title}>{title}</String>
      <AnimatedFlatList
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        horizontal
        snapToInterval={itemSize}
        decelerationRate="fast"
        onScroll={Animated.event([{ nativeEvent: { contentOffset: { x: scrollAnimatedValue } } }], {
          useNativeDriver: true,
        })}
        data={data}
        onMomentumScrollEnd={() => {
          const index = Math.round(active.current / itemSize);
          onChange(Number(data[index + 2]));
        }}
        keyExtractor={(_: string | undefined, index: number) => `time-${index}`}
        renderItem={renderItem}
      />
    </Box>
  );
}

/**
 * SelectTime component that provides hour and minute selection with animated scrollers.
 * Manages time state and coordinates between hour and minute pickers.
 *
 * @example
 * ```tsx
 * <SelectTime
 *   minuteInterval={15}
 *   onTimeChange={(time) => console.log('Time:', time)}
 *   options={themeOptions}
 * />
 * ```
 *
 * @param minuteInterval - Interval between minutes for the minute picker
 * @param onTimeChange - Callback function when time changes
 * @param options - Styling options for the time picker
 * @returns Time selection component with hour and minute scrollers
 */
function SelectTime({
  minuteInterval,
  onTimeChange,
  options,
}: {
  minuteInterval: number;
  onTimeChange: (time: string) => void;
  options: TimePickerOptionsProps;
}) {
  /** Current time state with hour and minute */
  const [time, setTime] = useState({
    hour: 0,
    minute: 0,
  });

  const style = styles(options);

  /** Notify parent component when time changes */
  useEffect(() => {
    onTimeChange(`${time.hour}:${time.minute}`);
  }, [time, onTimeChange]);

  return (
    <Animated.View style={style.container}>
      <TimeScroller
        title="Heures"
        data={Array.from({ length: 24 }, (_, i) => i.toString().padStart(2, '0'))}
        onChange={hour => setTime({ ...time, hour })}
        options={options}
      />
      <TimeScroller
        title="Minutes"
        data={Array.from({ length: 60 / minuteInterval }, (_, i) => (i * minuteInterval).toString().padStart(2, '0'))}
        onChange={minute => setTime({ ...time, minute })}
        options={options}
      />
    </Animated.View>
  );
}

export default SelectTime;
