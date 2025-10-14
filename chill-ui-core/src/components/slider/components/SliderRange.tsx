import { SliderRangePropsTw } from '@types';
import { AnimatedBox } from '@components/animatedBox';
import { cn, classNameHandler, classNamePropsHandler, styleHandler } from '@utils';

import { styles } from '../styles/Slider.ss.styles';
import { twStyles } from '../styles/Slider.tw.styles';
import { useSliderActions } from '../context/SliderContext';

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
export function SliderRange(props: SliderRangePropsTw) {
  classNamePropsHandler(props, 'SliderRange');
  const { className, style, ...rest } = props;
  const { getMinimumTrackStyle } = useSliderActions();

  const minimumTrackStyle = getMinimumTrackStyle();

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

SliderRange.displayName = 'SliderRange';
