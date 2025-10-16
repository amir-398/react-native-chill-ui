import { memo } from 'react';
import { SliderRangePropsTw } from '@types';
import { AnimatedBox } from '@components/animatedBox';
import { cn, classNameHandler, classNamePropsHandler, styleHandler } from '@utils';

import { styles } from '../styles/Slider.ss.styles';
import { twStyles } from '../styles/Slider.tw.styles';
import { useSliderRange } from '../hooks/useSliderRange';

/**
 * Range indicator for the slider
 *
 * This component displays the filled portion of the slider track,
 * showing the current value range.
 * Automatically detects NativeWind availability and falls back to StyleSheet if needed.
 *
 * @example
 * ```tsx
 * <SliderTrack>
 *   <SliderRange className="bg-blue-500" />
 * </SliderTrack>
 * ```
 *
 * @param className - Custom CSS classes for styling (NativeWind)
 * @param style - Style object for additional styling (React Native)
 * @returns SliderRange component showing the filled track portion
 * @throws Error if used outside of SliderProvider context
 */
function SliderRangeComponent(props: SliderRangePropsTw) {
  classNamePropsHandler(props, 'SliderRange');
  const { className, style, ...rest } = props;
  const { minimumTrackStyle } = useSliderRange();

  return (
    <AnimatedBox
      {...rest}
      renderToHardwareTextureAndroid
      {...classNameHandler(cn(twStyles.range, className))}
      {...styleHandler({
        defaultStyle: [styles.range],
        style: [minimumTrackStyle, style],
      })}
    />
  );
}

SliderRangeComponent.displayName = 'SliderRange';

export const SliderRange = memo(SliderRangeComponent);
