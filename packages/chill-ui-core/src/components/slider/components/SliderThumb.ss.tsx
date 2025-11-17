import { SliderThumbPropsSs } from '@types';
import { AnimatedBoxSs } from '@components/animatedBox';

import { styles } from '../styles/Slider.ss.styles';
import { useSliderThumb } from '../hooks/useSliderThumb';
import { sliderDefaultProps } from '../utils/defaultProps';

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
