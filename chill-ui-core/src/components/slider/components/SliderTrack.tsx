import { PropsWithChildren, memo } from 'react';
import { Box } from '@components/box';
import { SliderTrackPropsTw } from '@types';
import { cn, classNameHandler, classNamePropsHandler, styleHandler } from '@utils';

import { styles } from '../styles/Slider.ss.styles';
import { twStyles } from '../styles/Slider.tw.styles';
import { useSliderTrack } from '../hooks/useSliderTrack';
import { sliderDefaultProps } from '../utils/defaultProps';

/**
 * Track container for the slider
 *
 * This component serves as the background track for the slider and contains
 * the range indicator. It handles click interactions to jump to a specific value.
 * Automatically detects NativeWind availability and falls back to StyleSheet if needed.
 *
 * @example
 * ```tsx
 * <SliderTrack clickable={true}>
 *   <SliderRange />
 * </SliderTrack>
 * ```
 *
 * @param children - Child components (SliderRange)
 * @param className - Custom CSS classes for styling (NativeWind)
 * @param clickable - Whether clicking on the track moves the thumb (default: true)
 * @param style - Style object for additional styling (React Native)
 * @returns SliderTrack component serving as the slider background
 * @throws Error if used outside of SliderProvider context
 */
function SliderTrackComponent(props: PropsWithChildren<SliderTrackPropsTw>) {
  classNamePropsHandler(props, 'SliderTrack');
  const { children, className, clickable = sliderDefaultProps.trackClickable, style, ...rest } = props;
  const { measureTrack } = useSliderTrack(clickable);

  return (
    <Box
      {...rest}
      onLayout={measureTrack}
      renderToHardwareTextureAndroid
      {...classNameHandler(cn(twStyles.track, className))}
      {...styleHandler({ defaultStyle: styles.track, style })}
    >
      {children}
    </Box>
  );
}

SliderTrackComponent.displayName = 'SliderTrack';

export const SliderTrack = memo(SliderTrackComponent);
