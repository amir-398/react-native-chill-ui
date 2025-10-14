import { Animated } from 'react-native';
import { SliderThumbPropsTw } from '@types';
import { useEffect, useMemo, useRef } from 'react';
import { AnimatedBox } from '@components/animatedBox';
import { cn, classNameHandler, classNamePropsHandler, styleHandler } from '@utils';

import { styles } from '../styles/Slider.ss.styles';
import { twStyles } from '../styles/Slider.tw.styles';
import { sliderDefaultProps } from '../utils/defaultProps';
import { useSliderState, useSliderActions } from '../context/SliderContext';

/**
 * Draggable thumb for the slider
 *
 * This component represents the draggable handle that users can interact with
 * to change the slider value. It supports different animation types and
 * customizable touch areas for better accessibility.
 * Automatically detects NativeWind availability and falls back to StyleSheet if needed.
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
 * @param className - Custom CSS classes for styling (NativeWind)
 * @param index - Index of the thumb (for multiple thumbs, default: 0)
 * @param touchSize - Touch area size in pixels for better gesture handling (default: 40)
 * @param animationType - Animation type for the thumb: 'scale' | 'extend' | 'none' (default: 'extend')
 * @param style - Style object for additional styling (React Native)
 * @returns SliderThumb component with draggable functionality
 * @throws Error if used outside of SliderProvider context
 */
export function SliderThumb(props: SliderThumbPropsTw) {
  classNamePropsHandler(props, 'SliderThumb');
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
        <AnimatedBox
          {...classNameHandler(cn(twStyles.thumb, className, 'opacity-30'))}
          {...styleHandler({
            defaultStyle: [styles.thumb, styles.thumbOpacity],
            style: [
              {
                transform: [{ translateX: val }, { translateY: 0 }, { scale }],
              },
              valueVisibleStyle,
              style,
            ],
          })}
        />
      )}
      <AnimatedBox
        {...rest}
        onLayout={measureThumb}
        {...classNameHandler(cn(twStyles.thumb, className))}
        {...styleHandler({
          defaultStyle: styles.thumb,
          style: [
            {
              transform: [{ translateX: val }, { translateY: 0 }, { scale: scaleTransform }],
            },
            valueVisibleStyle,
            style,
          ],
        })}
      />
    </>
  );
}

SliderThumb.displayName = 'SliderThumb';
