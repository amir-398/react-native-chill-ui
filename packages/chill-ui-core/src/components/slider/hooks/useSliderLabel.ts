import { useState } from 'react';

import { useSliderState } from '../context/SliderContext';
import { sliderDefaultProps } from '../utils/defaultProps';

export const useSliderLabel = (index: number = sliderDefaultProps.index) => {
  const { interpolatedThumbValues, thumbSize, valueVisibleStyle } = useSliderState();
  const [labelWidth, setLabelWidth] = useState(0);

  const val = interpolatedThumbValues[index];

  const onLayout = (e: any) => {
    const { width } = e.nativeEvent.layout;
    if (width !== labelWidth) {
      setLabelWidth(width);
    }
  };

  const labelTransformStyle = {
    left: thumbSize.width / 2 - labelWidth / 2,
    transform: [{ translateX: val }, { translateY: 0 }],
  };

  return {
    labelTransformStyle,
    onLayout,
    val,
    valueVisibleStyle,
  };
};
