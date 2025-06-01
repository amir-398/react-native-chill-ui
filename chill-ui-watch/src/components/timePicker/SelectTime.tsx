import { useEffect, useRef, useState } from 'react';
import { StyleSheet, Animated, FlatList, ListRenderItem } from 'react-native';

import { Box } from '../box';
import String from '../string';
import { TimePickerOptionsProps, TimeScrollerProps } from '../../types';

const AnimatedFlatList = Animated.createAnimatedComponent(FlatList) as unknown as typeof FlatList;
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
function TimeScroller({ data, onChange, options, title }: TimeScrollerProps) {
  const [itemSize, setItemSize] = useState(0);
  const style = styles(options);
  const scrollAnimatedValue = useRef(new Animated.Value(0)).current;
  const scrollListener = useRef<string | null>(null);
  const active = useRef(0);
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

  const changeItemWidth = ({ nativeEvent }: { nativeEvent: { layout: { width: number } } }) => {
    const { width } = nativeEvent.layout;
    !itemSize && setItemSize(width / 5);
  };

  const renderItem: ListRenderItem<string> = ({ index, item }) => {
    const makeAnimated = (a: number, b: number, c: number) => ({
      inputRange: [...data.map((_, i) => i * itemSize)],
      outputRange: [
        ...data.map((_, i) => {
          const center = i + 2;
          if (center === index) {
            return a;
          }
          if (center + 1 === index || center - 1 === index) {
            return b;
          }
          return c;
        }),
      ],
    });

    return (
      <Animated.View
        style={[
          {
            opacity: scrollAnimatedValue.interpolate(makeAnimated(1, 0.6, 0.3)),
            transform: [
              {
                scale: scrollAnimatedValue.interpolate(makeAnimated(1.2, 0.9, 0.8)),
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
  };

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

function SelectTime({
  minuteInterval,
  onTimeChange,
  options,
}: {
  minuteInterval: number;
  onTimeChange: (time: string) => void;
  options: TimePickerOptionsProps;
}) {
  const [time, setTime] = useState({
    hour: 0,
    minute: 0,
  });

  const style = styles(options);

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
