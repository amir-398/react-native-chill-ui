import { BoxSs } from '@components/box';
import { PropsWithChildren } from 'react';
import { SliderRootPropsSs } from '@types';

import { SliderProvider } from './SliderProvider';
import { styles } from '../styles/Slider.ss.styles';
import { sliderDefaultProps } from '../utils/defaultProps';
import { useSliderActions } from '../context/SliderContext';

/**
 * Root container for the slider component
 *
 * @example
 * ```tsx
 * <Slider value={50} minimumValue={0} maximumValue={100}>
 *   <SliderTrack>
 *     <SliderRange />
 *   </SliderTrack>
 *   <SliderThumb />
 * </Slider>
 * ```
 *
 * @param children - Child components (SliderTrack, SliderThumb, etc.)
 * @param style - Style object for additional styling
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
function SliderRootContent(props: PropsWithChildren<{ orientation?: 'horizontal' | 'vertical'; style?: any }>) {
  const { children, orientation = sliderDefaultProps.orientation, style, ...rest } = props;
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
    <BoxSs {...rest} onLayout={measureContainer} style={[vertical && styles.rootVertical, styles.root, style]}>
      {children}
      <BoxSs style={[styles.touchOverlay, touchOverflowStyle]} {...(panResponder?.panHandlers || {})} />
    </BoxSs>
  );
}

export function Slider(props: PropsWithChildren<SliderRootPropsSs>) {
  const {
    animateTransitions = sliderDefaultProps.animateTransitions,
    animationConfig,
    animationType = sliderDefaultProps.animationType,
    children,
    isDisabled = sliderDefaultProps.disabled,
    maximumValue = sliderDefaultProps.maximumValue,
    minimumValue = sliderDefaultProps.minimumValue,
    onSlidingComplete,
    onSlidingStart,
    onValueChange,
    orientation = sliderDefaultProps.orientation,
    step = sliderDefaultProps.step,
    style,
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
      <SliderRootContent {...rest} style={style} orientation={orientation}>
        {children}
      </SliderRootContent>
    </SliderProvider>
  );
}

Slider.displayName = 'Slider';
