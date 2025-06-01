import { useState } from 'react';
import { Dimensions, TouchableOpacity } from 'react-native';
import Animated, { useAnimatedStyle, withTiming } from 'react-native-reanimated';

import cn from '../cn';
import { Box } from '../box';
import String from '../string';
import { SegmentedControlProps } from '../../types';

const { width: windowWidth } = Dimensions.get('window');

export default function SegmentedControl({
  activeItemTextClassName,
  activeItemTextColor,
  className,
  defaultOption,
  externalPadding = 30,
  inactiveItemTextColor,
  internalPadding,
  itemClassName,
  itemTextClassName,
  onChange,
  options,
}: SegmentedControlProps) {
  const INTERNAL_PADDING = internalPadding ?? 10;
  const SEGMENTED_CONTROL_WIDTH = windowWidth - externalPadding;
  const [selectedOption, setSelectedOption] = useState(defaultOption || options[0]);

  const itemWidth = (SEGMENTED_CONTROL_WIDTH - INTERNAL_PADDING) / options.length;

  const rStyle = useAnimatedStyle(
    () => ({
      left: withTiming(itemWidth * options.indexOf(selectedOption) + INTERNAL_PADDING / 2),
    }),
    [selectedOption, options, itemWidth],
  );

  const handleOptionPress = (option: string) => {
    setSelectedOption(option);
    onChange?.(option);
  };

  return (
    <Box
      className={cn('h-16 flex-row self-center rounded-xl border border-black/30', className)}
      style={{
        paddingLeft: INTERNAL_PADDING / 2,
        width: SEGMENTED_CONTROL_WIDTH,
      }}
    >
      <Animated.View
        className={cn('bg-primary absolute top-[10%] h-4/5 rounded-lg', itemClassName)}
        style={[
          {
            width: itemWidth,
          },
          rStyle,
        ]}
      />
      {options.map(option => (
        <TouchableOpacity
          className={cn('items-center justify-center')}
          onPress={() => handleOptionPress(option)}
          key={option}
          style={{
            width: itemWidth,
          }}
        >
          <String
            className={cn(itemTextClassName, selectedOption === option && activeItemTextClassName)}
            color={selectedOption === option ? activeItemTextColor : inactiveItemTextColor}
          >
            {option}
          </String>
        </TouchableOpacity>
      ))}
    </Box>
  );
}
