import { cn } from '@utils';
import { SliderRangePropsTw } from '@types';
import { AnimatedBoxTw } from '@components/animatedBox';

import { twStyles } from '../styles/Slider.tw.styles';
import { useSliderRange } from '../hooks/useSliderRange';

/**
 * Range indicator for the slider
 *
 * This component displays the filled portion of the slider track,
 * showing the current value range.
 *
 * @example
 * ```tsx
 * <SliderTrack>
 *   <SliderRange className="bg-blue-500" />
 * </SliderTrack>
 * ```
 *
 * @param className - Custom CSS classes for styling
 */
export function SliderRange(props: SliderRangePropsTw) {
  const { className, style, ...rest } = props;
  const { minimumTrackStyle } = useSliderRange();

  return (
    <AnimatedBoxTw
      {...rest}
      renderToHardwareTextureAndroid
      className={cn(twStyles.range, className)}
      style={[minimumTrackStyle, style]}
    />
  );
}

SliderRange.displayName = 'SliderRange';
