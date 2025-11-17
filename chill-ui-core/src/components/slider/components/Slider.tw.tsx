import { PropsWithChildren } from 'react';
import { SliderRootPropsTw } from '@types';

import { SliderProvider } from './SliderProvider';
import { sliderDefaultProps } from '../utils/defaultProps';
import { SliderRootContent } from './SliderRootContent.tw';

/**
 * The `<Slider />` component is a component that provides a slider for selecting a value.
 *
 * <!-- STORYBOOK_IMPORT_START
 * ```tsx
 * import { Slider } from 'react-native-chill-ui';
 * ```
 * STORYBOOK_IMPORT_END -->
 *
 * @example
 * ```tsx
 * <Slider defaultValue={50}>
 *   <SliderTrack>
 *     <SliderRange />
 *   </SliderTrack>
 *   <SliderThumb />
 *   <SliderLabel position="top">50%</SliderLabel>
 * </Slider>
 * ```
 *
 * @param children - Child components (SliderTrack, SliderThumb, SliderLabel, etc.)
 * @param className - Custom CSS classes for styling (NativeWind)
 * @param isDisabled - Whether the slider is disabled (default: false)
 * @param maximumValue - Maximum value of the slider (default: 100)
 * @param minimumValue - Minimum value of the slider (default: 0)
 * @param onSlidingComplete - Callback when sliding completes
 * @param onSlidingStart - Callback when sliding starts
 * @param onValueChange - Callback when value changes
 * @param step - Step value for discrete slider (default: 0)
 * @param value - Current value(s) of the slider (controlled mode, optional)
 * @param defaultValue - Default initial value (uncontrolled mode, optional)
 * @param orientation - Orientation of the slider: 'horizontal' | 'vertical' (default: 'horizontal')
 * @param animateTransitions - Whether to animate value transitions (default: true)
 * @param animationConfig - Configuration for animations
 * @param animationType - Type of animation: 'timing' | 'spring' (default: 'timing')
 * @param trackRightPadding - Right padding for the track
 */
export function Slider(props: PropsWithChildren<SliderRootPropsTw>) {
  const {
    animateTransitions = sliderDefaultProps.animateTransitions,
    animationConfig,
    animationType = sliderDefaultProps.animationType,
    children,
    className,
    defaultValue = sliderDefaultProps.defaultValue,
    isDisabled = sliderDefaultProps.disabled,
    maximumValue = sliderDefaultProps.maximumValue,
    minimumValue = sliderDefaultProps.minimumValue,
    onSlidingComplete,
    onSlidingStart,
    onValueChange,
    orientation = sliderDefaultProps.orientation,
    step = sliderDefaultProps.step,
    trackRightPadding,
    value,
    ...rest
  } = props;

  return (
    <SliderProvider
      value={value}
      defaultValue={defaultValue}
      minimumValue={minimumValue}
      maximumValue={maximumValue}
      step={step}
      disabled={isDisabled}
      orientation={orientation}
      animateTransitions={animateTransitions}
      animationConfig={animationConfig}
      animationType={animationType}
      onValueChange={onValueChange}
      onSlidingStart={onSlidingStart}
      onSlidingComplete={onSlidingComplete}
      trackRightPadding={trackRightPadding}
    >
      <SliderRootContent {...rest} className={className} orientation={orientation}>
        {children}
      </SliderRootContent>
    </SliderProvider>
  );
}

Slider.displayName = 'Slider';
