import { cn } from '@utils';
import { BoxTw } from '@components/box';
import { SliderTrackPropsTw } from '@types';
import { PropsWithChildren, useEffect } from 'react';

import { twStyles } from '../styles/Slider.tw.styles';
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
 * @param className - Custom CSS classes for styling
 * @param clickable - Whether clicking on the track moves the thumb (default: true)
 */
export function SliderTrack(props: PropsWithChildren<SliderTrackPropsTw>) {
  const { children, className, clickable = sliderDefaultProps.trackClickable, ...rest } = props;
  const { measureTrack, setTrackClickable } = useSliderActions();

  useEffect(() => {
    setTrackClickable(clickable);
  }, [clickable, setTrackClickable]);

  return (
    <BoxTw {...rest} onLayout={measureTrack} renderToHardwareTextureAndroid className={cn(twStyles.track, className)}>
      {children}
    </BoxTw>
  );
}

SliderTrack.displayName = 'SliderTrack';
