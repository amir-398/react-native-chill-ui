import { isString } from '@utils';
import { SliderLabelPropsSs } from '@types';
import { StringSs } from '@components/string';
import { PropsWithChildren, useState } from 'react';
import { AnimatedBoxSs } from '@components/animatedBox';

import { useSliderState } from '../context/SliderContext';
import { sliderLabelSv, styles } from '../styles/Slider.ss.styles';

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
 * @param style - Style object for additional styling
 * @param index - Index of the thumb to follow (for multiple thumbs, default: 0)
 * @param stringProps - Props for String component when children is a string
 * @param position - Position relative to the thumb: 'top' | 'bottom' (default: 'top')
 */
export function SliderLabel(props: PropsWithChildren<SliderLabelPropsSs>) {
  const { children, index = 0, position = 'top', stringProps, style, ...rest } = props;
  const { interpolatedThumbValues, thumbSize, valueVisibleStyle } = useSliderState();
  const [labelWidth, setLabelWidth] = useState(0);

  const val = interpolatedThumbValues[index];

  if (!val) {
    return null;
  }

  const isTop = position === 'top';

  const content = isString(children) ? (
    <StringSs size="xs" color="#fff" {...stringProps}>
      {children}
    </StringSs>
  ) : (
    children
  );

  return (
    <AnimatedBoxSs
      {...rest}
      onLayout={e => {
        const { width } = e.nativeEvent.layout;
        if (width !== labelWidth) {
          setLabelWidth(width);
        }
      }}
      style={[
        styles.label,
        sliderLabelSv({ position: isTop ? 'top' : 'bottom' }),
        {
          left: thumbSize.width / 2 - labelWidth / 2,
          transform: [{ translateX: val }, { translateY: 0 }],
        },
        valueVisibleStyle,
        style,
      ]}
    >
      {content}
    </AnimatedBoxSs>
  );
}

SliderLabel.displayName = 'SliderLabel';
