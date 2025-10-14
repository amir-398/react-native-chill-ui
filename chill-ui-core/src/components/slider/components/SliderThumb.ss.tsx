import { Animated } from 'react-native';
import { SliderThumbPropsSs } from '@types';
import { useEffect, useMemo, useRef } from 'react';
import { AnimatedBoxSs } from '@components/animatedBox';

import { styles } from '../styles/Slider.ss.styles';
import { sliderDefaultProps } from '../utils/defaultProps';
import { useSliderState, useSliderActions } from '../context/SliderContext';

/**
 * Draggable thumb for the slider
 *
 * @example
 * ```tsx
 * <SliderRoot>
 *   <SliderTrack>
 *     <SliderRange />
 *   </SliderTrack>
 *   <SliderThumb touchSize={40} />
 * </SliderRoot>
 * ```
 *
 * @param className - Custom CSS classes for styling
 * @param index - Index of the thumb (for multiple thumbs)
 * @param animationType - Animation type for the thumb (default: 'extend') | 'scale' | 'none'
 * @param style - Style object for additional styling
 * @param touchSize - Touch area size in pixels for better gesture handling (default: 40)
 */
export function SliderThumb(props: SliderThumbPropsSs) {
  const {
    animationType = sliderDefaultProps.animationTypeThumb,
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
        <AnimatedBoxSs
          {...rest}
          style={[
            styles.thumb,
            {
              transform: [{ translateX: val }, { translateY: 0 }, { scale }],
            },
            valueVisibleStyle,
            style,
            styles.thumbOpacity,
          ]}
        />
      )}
      <AnimatedBoxSs
        {...rest}
        onLayout={measureThumb}
        style={[
          styles.thumb,
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
