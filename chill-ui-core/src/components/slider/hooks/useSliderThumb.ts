import { Animated } from 'react-native';
import { useEffect, useMemo, useRef } from 'react';

import { sliderDefaultProps } from '../utils/defaultProps';
import { useSliderState, useSliderActions } from '../context/SliderContext';

interface UseSliderThumbProps {
  index?: number;
  touchSize?: number;
  animationType?: 'scale' | 'extend' | 'none';
}

export const useSliderThumb = (props: UseSliderThumbProps) => {
  const {
    animationType = sliderDefaultProps.animationTypeThumb,
    index = sliderDefaultProps.index,
    touchSize = sliderDefaultProps.touchSize,
  } = props;

  const { interpolatedThumbValues, isSliding, valueVisibleStyle } = useSliderState();
  const { measureThumb, setThumbTouchSize } = useSliderActions();

  useEffect(() => {
    setThumbTouchSize(touchSize);
  }, [touchSize, setThumbTouchSize]);

  const val = interpolatedThumbValues[index];
  const scale = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    if (animationType === 'none') return;

    Animated.timing(scale, {
      duration: 100,
      toValue: isSliding ? 1.5 : 1,
      useNativeDriver: false,
    }).start();
  }, [isSliding, animationType, scale]);

  const scaleTransform = useMemo(() => (animationType === 'scale' ? scale : 1), [animationType, scale]);
  const hasExtendAnimation = animationType === 'extend';

  return {
    hasExtendAnimation,
    measureThumb,
    scale,
    scaleTransform,
    val,
    valueVisibleStyle,
  };
};
