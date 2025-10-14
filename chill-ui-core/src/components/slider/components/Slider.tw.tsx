import { cn } from '@utils';
import { BoxTw } from '@components/box';
import { PropsWithChildren } from 'react';
import { SliderRootPropsTw } from '@types';

import { SliderProvider } from './SliderProvider';
import { twStyles } from '../styles/Slider.tw.styles';
import { sliderDefaultProps } from '../utils/defaultProps';
import { useSliderActions } from '../context/SliderContext';

/**
 * Root container for the slider component
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
function SliderRootContent(props: PropsWithChildren<{ className?: string; orientation?: 'horizontal' | 'vertical' }>) {
  const { children, className, orientation = sliderDefaultProps.orientation, ...rest } = props;
  const vertical = orientation === 'vertical';
  const { getTouchOverflowSize, measureContainer, panResponder } = useSliderActions();

  const getTouchOverflowStyle = () => {
    const { height, width } = getTouchOverflowSize();
    const touchOverflowStyle: {
      marginTop?: number;
      marginBottom?: number;
      marginLeft?: number;
      marginRight?: number;
    } = {};
    if (width !== undefined && height !== undefined) {
      const verticalMargin = -height / 2;
      touchOverflowStyle.marginTop = verticalMargin;
      touchOverflowStyle.marginBottom = verticalMargin;
      const horizontalMargin = -width / 2;
      touchOverflowStyle.marginLeft = horizontalMargin;
      touchOverflowStyle.marginRight = horizontalMargin;
    }
    return touchOverflowStyle;
  };

  const touchOverflowStyle = getTouchOverflowStyle();

  return (
    <BoxTw
      {...rest}
      onLayout={measureContainer}
      className={cn(vertical && twStyles.rootVertical, twStyles.root, className)}
    >
      {children}
      <BoxTw className={twStyles.touchOverlay} style={touchOverflowStyle} {...(panResponder?.panHandlers || {})} />
    </BoxTw>
  );
}

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
