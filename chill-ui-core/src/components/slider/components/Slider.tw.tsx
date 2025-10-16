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
 * <SliderRoot value={50} minimumValue={0} maximumValue={100}>
 *   <SliderTrack>
 *     <SliderRange />
 *   </SliderTrack>
 *   <SliderThumb />
 * </SliderRoot>
 * ```
 *
 * @param children - Child components (SliderTrack, SliderThumb, etc.)
 * @param className - Custom CSS classes for styling
 * @param disabled - Whether the slider is disabled
 * @param maximumValue - Maximum value of the slider
 * @param minimumValue - Minimum value of the slider
 * @param onSlidingComplete - Callback when sliding completes
 * @param onSlidingStart - Callback when sliding starts
 * @param onValueChange - Callback when value changes
 * @param step - Step value for discrete slider
 * @param value - Current value(s) of the slider
 * @param orientation - Orientation of the slider ('horizontal' | 'vertical')
 */
export function Slider(props: PropsWithChildren<SliderRootPropsTw>) {
  const {
    animateTransitions = sliderDefaultProps.animateTransitions,
    animationConfig,
    animationType = sliderDefaultProps.animationType,
    children,
    className,
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
