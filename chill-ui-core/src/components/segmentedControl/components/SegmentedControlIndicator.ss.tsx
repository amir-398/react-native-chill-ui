import { Animated } from 'react-native';
import { useEffect, useRef } from 'react';
import { AnimatedBoxSs } from '@components/animatedBox';
import { SegmentedControlIndicatorPropsSs } from '@types';

import { styles } from '../styles/SegmentedControl.ss.styles';
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
 * @param style - Style object for the indicator (React Native)
 * @param duration - Animation duration in milliseconds for position transitions (default: 200)
 * @returns SegmentedControlIndicator component with animated positioning
 * @throws Error if used outside of SegmentedControlProvider context
 */
export function SegmentedControlIndicator(props: SegmentedControlIndicatorPropsSs) {
  const { itemWidth, selectedOption, validItemsValues } = useSegmentedControlState();
  const { duration, style } = props;

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
    <AnimatedBoxSs
      style={[
        styles.indicatorContainer,
        {
          left: animatedLeft,
          width: itemWidth,
        },
        style,
        styles.indicatorContainerFreezed,
      ]}
    />
  );
}

SegmentedControlIndicator.displayName = 'SegmentedControlIndicator';
