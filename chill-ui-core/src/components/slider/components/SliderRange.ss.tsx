import { SliderRangePropsSs } from '@types';
import { AnimatedBoxSs } from '@components/animatedBox';

import { styles } from '../styles/Slider.ss.styles';
import { useSliderRange } from '../hooks/useSliderRange';

/**
 * Range indicator for the slider
 *
 * @example
 * ```tsx
 * <SliderTrack>
 *   <SliderRange />
 * </SliderTrack>
 * ```
 *
 * @param style - Style object for additional styling
 */
export function SliderRange(props: SliderRangePropsSs) {
  const { style, ...rest } = props;
  const { minimumTrackStyle } = useSliderRange();

  return <AnimatedBoxSs {...rest} renderToHardwareTextureAndroid style={[styles.range, minimumTrackStyle, style]} />;
}

SliderRange.displayName = 'SliderRange';
