import { cn } from '@utils';
import { SliderThumbPropsTw } from '@types';
import { AnimatedBoxTw } from '@components/animatedBox';

import { twStyles } from '../styles/Slider.tw.styles';
import { useSliderThumb } from '../hooks/useSliderThumb';
import { sliderDefaultProps } from '../utils/defaultProps';

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
