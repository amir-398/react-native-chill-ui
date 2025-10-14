import { Box } from '@components/box';
import { PropsWithChildren } from 'react';
import { SliderRootPropsTw } from '@types';
import { cn, classNameHandler, classNamePropsHandler, styleHandler } from '@utils';

import { SliderProvider } from './SliderProvider';
import { styles } from '../styles/Slider.ss.styles';
import { twStyles } from '../styles/Slider.tw.styles';
import { sliderDefaultProps } from '../utils/defaultProps';
import { useSliderActions } from '../context/SliderContext';

/**
 * Root container for the slider component
 *
 * This is the main slider component that wraps all slider parts and manages their state.
 * It handles gestures, animations, and value updates.
 * Automatically detects NativeWind availability and falls back to StyleSheet if needed.
 *
 * @example
 * ```tsx
 * <Slider value={50} minimumValue={0} maximumValue={100}>
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
 * @param maximumValue - Maximum value of the slider (default: 1)
 * @param minimumValue - Minimum value of the slider (default: 0)
 * @param onSlidingComplete - Callback when sliding completes
 * @param onSlidingStart - Callback when sliding starts
 * @param onValueChange - Callback when value changes
 * @param step - Step value for discrete slider (default: 0)
 * @param value - Current value(s) of the slider
 * @param orientation - Orientation of the slider: 'horizontal' | 'vertical' (default: 'horizontal')
 * @param animateTransitions - Whether to animate value transitions (default: true)
 * @param animationConfig - Configuration for animations
 * @param animationType - Type of animation: 'timing' | 'spring' (default: 'timing')
 * @param trackRightPadding - Right padding for the track
 * @param style - Style object for additional styling (React Native)
 * @returns Slider component with full gesture and animation support
 */
function SliderRootContent(
  props: PropsWithChildren<{ className?: string; orientation?: 'horizontal' | 'vertical'; style?: any }>,
) {
  classNamePropsHandler(props, 'SliderRootContent');
  const { children, className, orientation = sliderDefaultProps.orientation, style, ...rest } = props;
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
    <Box
      {...rest}
      onLayout={measureContainer}
      {...classNameHandler(cn(vertical && twStyles.rootVertical, twStyles.root, className))}
      {...styleHandler({
        defaultStyle: [vertical && styles.rootVertical, styles.root],
        style,
      })}
    >
      {children}
      <Box
        {...classNameHandler(twStyles.touchOverlay)}
        {...styleHandler({
          defaultStyle: [styles.touchOverlay, touchOverflowStyle],
        })}
        {...(panResponder?.panHandlers || {})}
      />
    </Box>
  );
}

export function Slider(props: PropsWithChildren<SliderRootPropsTw>) {
  classNamePropsHandler(props, 'Slider');
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
      <SliderRootContent {...rest} className={className} style={style} orientation={orientation}>
        {children}
      </SliderRootContent>
    </SliderProvider>
  );
}

Slider.displayName = 'Slider';
