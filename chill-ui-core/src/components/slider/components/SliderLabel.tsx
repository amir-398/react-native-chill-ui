import { PropsWithChildren, memo } from 'react';
import { String } from '@components/string';
import { SliderLabelPropsTw } from '@types';
import { AnimatedBox } from '@components/animatedBox';
import { cn, classNameHandler, classNamePropsHandler, isString, styleHandler } from '@utils';

import { useSliderLabel } from '../hooks/useSliderLabel';
import { sliderLabelSv, styles } from '../styles/Slider.ss.styles';
import { sliderLabelTv, twStyles } from '../styles/Slider.tw.styles';

/**
 * Label component that displays content above or below the slider thumb
 *
 * This component can be used to show custom labels, values, or any content
 * that should follow the thumb position. It has a badge style and is always visible.
 * Automatically detects NativeWind availability and falls back to StyleSheet if needed.
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
 * @param className - Custom CSS classes for styling (NativeWind)
 * @param index - Index of the thumb to follow (for multiple thumbs, default: 0)
 * @param position - Position relative to the thumb: 'top' | 'bottom' (default: 'top')
 * @param stringProps - Props for String component when children is a string
 * @param style - Style object for additional styling (React Native)
 * @returns SliderLabel component with content following the thumb
 * @throws Error if used outside of SliderProvider context
 */
function SliderLabelComponent(props: PropsWithChildren<SliderLabelPropsTw>) {
  classNamePropsHandler(props, 'SliderLabel');
  const { children, className, index = 0, position = 'top', stringProps, style, ...rest } = props;
  const { labelTransformStyle, onLayout, val, valueVisibleStyle } = useSliderLabel(index);

  if (!val) {
    return null;
  }

  const isTop = position === 'top';

  const content = isString(children) ? (
    <String size="xs" color="#fff" {...stringProps}>
      {children}
    </String>
  ) : (
    children
  );

  return (
    <AnimatedBox
      {...rest}
      onLayout={onLayout}
      {...classNameHandler(cn(twStyles.label, sliderLabelTv({ position: isTop ? 'top' : 'bottom' }), className))}
      {...styleHandler({
        defaultStyle: [styles.label, sliderLabelSv({ position: isTop ? 'top' : 'bottom' })],
        style: [labelTransformStyle, valueVisibleStyle, style],
      })}
    >
      {content}
    </AnimatedBox>
  );
}

SliderLabelComponent.displayName = 'SliderLabel';

export const SliderLabel = memo(SliderLabelComponent);
