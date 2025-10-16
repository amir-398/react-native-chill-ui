import { memo } from 'react';
import { SliderThumbPropsTw } from '@types';
import { AnimatedBox } from '@components/animatedBox';
import { cn, classNameHandler, classNamePropsHandler, styleHandler } from '@utils';

import { styles } from '../styles/Slider.ss.styles';
import { twStyles } from '../styles/Slider.tw.styles';
import { useSliderThumb } from '../hooks/useSliderThumb';
import { sliderDefaultProps } from '../utils/defaultProps';

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
function SliderThumbComponent(props: SliderThumbPropsTw) {
  classNamePropsHandler(props, 'SliderThumb');
  const {
    animationType = sliderDefaultProps.animationTypeThumb,
    className,
    index = sliderDefaultProps.index,
    style,
    touchSize = sliderDefaultProps.touchSize,
    ...rest
  } = props;

  const { hasExtendAnimation, measureThumb, scale, scaleTransform, val, valueVisibleStyle } = useSliderThumb({
    animationType,
    index,
    touchSize,
  });

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

SliderThumbComponent.displayName = 'SliderThumb';

export const SliderThumb = memo(SliderThumbComponent);
