import { cn, isString } from '@utils';
import { PropsWithChildren } from 'react';
import { SliderLabelPropsTw } from '@types';
import { StringTw } from '@components/string';
import { AnimatedBoxTw } from '@components/animatedBox';

import { useSliderLabel } from '../hooks/useSliderLabel';
import { sliderLabelTv, twStyles } from '../styles/Slider.tw.styles';

/**
 * Label component that displays content above or below the slider thumb
 *
 * This component can be used to show custom labels, values, or any content
 * that should follow the thumb position. It has a badge style and is always visible.
 *
 * @example
 * ```tsx
 * <Slider value={50} minimumValue={0} maximumValue={100}>
 *   <SliderTrack>
 *     <SliderRange />
 *   </SliderTrack>
 *   <SliderThumb />
 *   <SliderLabel position="top">50%</SliderLabel>
 * </Slider>
 * ```
 *
 * @param children - Content to display in the label
 * @param className - Custom CSS classes for styling
 * @param index - Index of the thumb to follow (for multiple thumbs, default: 0)
 * @param stringProps - Props for String component when children is a string
 * @param position - Position relative to the thumb: 'top' | 'bottom' (default: 'top')
 */
export function SliderLabel(props: PropsWithChildren<SliderLabelPropsTw>) {
  const { children, className, index = 0, position = 'top', stringProps, style, ...rest } = props;
  const { labelTransformStyle, onLayout, val, valueVisibleStyle } = useSliderLabel(index);

  if (!val) {
    return null;
  }

  const isTop = position === 'top';

  const content = isString(children) ? (
    <StringTw size="xs" color="#fff" {...stringProps}>
      {children}
    </StringTw>
  ) : (
    children
  );

  return (
    <AnimatedBoxTw
      {...rest}
      onLayout={onLayout}
      className={cn(twStyles.label, sliderLabelTv({ position: isTop ? 'top' : 'bottom' }), className)}
      style={[labelTransformStyle, valueVisibleStyle, style]}
    >
      {content}
    </AnimatedBoxTw>
  );
}

SliderLabel.displayName = 'SliderLabel';
