import { cn } from '@utils';
import { useState } from 'react';
// eslint-disable-next-line
import Animated, { useAnimatedStyle, withTiming } from 'react-native-reanimated';
import { Dimensions, TouchableOpacity } from 'react-native';

import { Box } from '../box';
import { String } from '../string';
import { SegmentedControlProps } from '../../types/segmentedControl.types';

const { width: windowWidth } = Dimensions.get('window');

/**
 * SegmentedControl component that provides a tab-like interface for switching between options.
 * Features smooth animations, customizable styling, and responsive design.
 *
 * @example
 * ```tsx
 * // Basic usage
 * <SegmentedControl
 *   options={['Option 1', 'Option 2', 'Option 3']}
 *   onChange={(option) => console.log('Selected:', option)}
 * />
 *
 * // With custom styling and default option
 * <SegmentedControl
 *   options={['All', 'Active', 'Completed']}
 *   defaultOption="Active"
 *   activeItemTextColor="white"
 *   inactiveItemTextColor="gray"
 *   onChange={(option) => setFilter(option)}
 * />
 * ```
 *
 * @param activeItemTextClassName - Custom CSS classes for active item text
 * @param activeItemTextColor - Color for active item text
 * @param className - Custom CSS classes for the container
 * @param defaultOption - Default selected option
 * @param externalPadding - External padding from screen edges
 * @param inactiveItemTextColor - Color for inactive item text
 * @param internalPadding - Internal padding between items
 * @param itemClassName - Custom CSS classes for the active item background
 * @param itemTextClassName - Custom CSS classes for item text
 * @param onChange - Callback when option changes
 * @param options - Array of option strings to display
 * @returns SegmentedControl component with animated selection
 */
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

  /** Calculate width for each item based on available space */
  const itemWidth = (SEGMENTED_CONTROL_WIDTH - INTERNAL_PADDING) / options.length;

  /**
   * Animated style for the active item background
   * Animates the position based on the selected option
   */
  const rStyle = useAnimatedStyle(
    () => ({
      left: withTiming(itemWidth * options.indexOf(selectedOption) + INTERNAL_PADDING / 2),
    }),
    [selectedOption, options, itemWidth],
  );

  /**
   * Handles option selection and triggers onChange callback
   * @param option - The selected option string
   */
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
