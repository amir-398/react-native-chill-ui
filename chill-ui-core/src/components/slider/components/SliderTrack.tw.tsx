import { cn } from '@utils';
import { BoxTw } from '@components/box';
import { PropsWithChildren } from 'react';
import { SliderTrackPropsTw } from '@types';

import { twStyles } from '../styles/Slider.tw.styles';
import { useSliderTrack } from '../hooks/useSliderTrack';
import { sliderDefaultProps } from '../utils/defaultProps';

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
  const { measureTrack } = useSliderTrack(clickable);

  return (
    <BoxTw {...rest} onLayout={measureTrack} renderToHardwareTextureAndroid className={cn(twStyles.track, className)}>
      {children}
    </BoxTw>
  );
}

SliderTrack.displayName = 'SliderTrack';
