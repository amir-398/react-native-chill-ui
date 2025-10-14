import { BoxSs } from '@components/box';
import { SliderTrackPropsSs } from '@types';
import { PropsWithChildren, useEffect } from 'react';

import { styles } from '../styles/Slider.ss.styles';
import { sliderDefaultProps } from '../utils/defaultProps';
import { useSliderActions } from '../context/SliderContext';

/**
 * Track container for the slider
 *
 * @example
 * ```tsx
 * <SliderTrack clickable={true}>
 *   <SliderRange />
 * </SliderTrack>
 * ```
 *
 * @param children - Child components (SliderRange)
 * @param style - Style object for additional styling
 * @param clickable - Whether clicking on the track moves the thumb (default: true)
 */
export function SliderTrack(props: PropsWithChildren<SliderTrackPropsSs>) {
  const { children, clickable = sliderDefaultProps.trackClickable, style, ...rest } = props;
  const { measureTrack, setTrackClickable } = useSliderActions();

  useEffect(() => {
    setTrackClickable(clickable);
  }, [clickable, setTrackClickable]);

  return (
    <BoxSs {...rest} onLayout={measureTrack} renderToHardwareTextureAndroid style={[styles.track, style]}>
      {children}
    </BoxSs>
  );
}

SliderTrack.displayName = 'SliderTrack';
