import { cn } from '@utils';
import { Animated } from 'react-native';
import { useEffect, useRef } from 'react';
import { AnimatedBoxTw } from '@components/animatedBox';
import { SegmentedControlIndicatorPropsTw } from '@types';

import { twStyles } from '../styles/SegmentedControl.tw.styles';
import { segmentedControlDefaultProps } from '../utils/defaultProps';
import { useSegmentedControlState } from '../context/SegmentedControlContext';

/**
 * Animated visual indicator for the selected option.
 *
 * @example
 * ```tsx
 * <SegmentedControlIndicator />
 * ```
 *
 * @param className - Custom CSS classes for styling the indicator (NativeWind)
 * @param duration - Animation duration in milliseconds for position transitions (default: 200)
 * @param style - Style object for the indicator (React Native)
 * @returns SegmentedControlIndicator component with animated positioning
 * @throws Error if used outside of SegmentedControlProvider context
 */
export function SegmentedControlIndicator(props: SegmentedControlIndicatorPropsTw) {
  const { itemWidth, selectedOption, validItemsValues } = useSegmentedControlState();
  const { className, duration, style } = props;

  const animatedLeft = useRef(
    new Animated.Value(
      itemWidth * validItemsValues.indexOf(selectedOption) + segmentedControlDefaultProps.internalPadding / 2,
    ),
  ).current;

  useEffect(() => {
    const newLeft =
      itemWidth * validItemsValues.indexOf(selectedOption) + segmentedControlDefaultProps.internalPadding / 2;
    Animated.timing(animatedLeft, {
      duration: duration ?? segmentedControlDefaultProps.duration,
      toValue: newLeft,
      useNativeDriver: false,
    }).start();
  }, [selectedOption, validItemsValues, itemWidth, animatedLeft, duration]);

  return (
    <AnimatedBoxTw
      className={cn(twStyles.indicatorContainer, className, twStyles.indicatorContainerFreezed)}
      style={[
        {
          left: animatedLeft,
          width: itemWidth,
        },
        style,
      ]}
    />
  );
}

SegmentedControlIndicator.displayName = 'SegmentedControlIndicator';
