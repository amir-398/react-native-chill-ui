import { cn } from '@utils';
import { Animated } from 'react-native';
import { SliderThumbPropsTw } from '@types';
import { useEffect, useMemo, useRef } from 'react';
import { AnimatedBoxTw } from '@components/animatedBox';

import { twStyles } from '../styles/Slider.tw.styles';
import { sliderDefaultProps } from '../utils/defaultProps';
import { useSliderState, useSliderActions } from '../context/SliderContext';

/**
 * Draggable thumb for the slider
 *
 * This component represents the draggable handle that users can interact with
 * to change the slider value. It supports different animation types and
 * customizable touch areas for better accessibility.
 *
 * @example
 * ```tsx
 * <Slider value={50} minimumValue={0} maximumValue={100}>
 *   <SliderTrack>
 *     <SliderRange />
 *   </SliderTrack>
 *   <SliderThumb touchSize={40} animationType="scale" />
 * </Slider>
 * ```
 *
 * @param className - Custom CSS classes for styling
 * @param index - Index of the thumb (for multiple thumbs)
 * @param touchSize - Touch area size in pixels for better gesture handling (default: 40)
 * @param animationType - Animation type for the thumb: 'scale' | 'extend' | 'none' (default: 'extend')
 */
export function SliderThumb(props: SliderThumbPropsTw) {
  const {
    animationType = sliderDefaultProps.animationTypeThumb,
    className,
    index = sliderDefaultProps.index,
    style,
    touchSize = sliderDefaultProps.touchSize,
    ...rest
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

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isSliding]);

  const scaleTransform = useMemo(() => (animationType === 'scale' ? scale : 1), [animationType, scale]);
  const hasExtendAnimation = animationType === 'extend';

  if (!val) {
    return null;
  }

  return (
    <>
      {hasExtendAnimation && (
        <AnimatedBoxTw
          className={cn(twStyles.thumb, className, 'opacity-30')}
          style={[
            {
              transform: [{ translateX: val }, { translateY: 0 }, { scale }],
            },
            valueVisibleStyle,
          ]}
        />
      )}
      <AnimatedBoxTw
        {...rest}
        onLayout={measureThumb}
        className={cn(twStyles.thumb, className)}
        style={[
          {
            transform: [{ translateX: val }, { translateY: 0 }, { scale: scaleTransform }],
          },
          valueVisibleStyle,
          style,
        ]}
      />
    </>
  );
}

SliderThumb.displayName = 'SliderThumb';
