import { Animated, I18nManager } from 'react-native';
import { PropsWithChildren, useMemo, useState, useEffect, useCallback } from 'react';

import { useSliderGestures } from '../hooks/useSliderGestures';
import { useSliderAnimation } from '../hooks/useSliderAnimation';
import { normalizeValue, updateValues } from '../utils/normalize';
import useSliderMeasurements from '../hooks/useSliderMeasurements';
import { SliderStateContext, SliderActionsContext } from '../context/SliderContext';

export interface SliderProviderProps {
  /** Step value for discrete slider (default: 0) */
  step?: number;
  /** Whether the slider is disabled (default: false) */
  disabled?: boolean;
  /** Minimum value of the slider (default: 0) */
  minimumValue?: number;
  /** Maximum value of the slider (default: 1) */
  maximumValue?: number;
  /** Animation configuration object */
  animationConfig?: any;
  /** Current value(s) of the slider */
  value?: number | number[];
  /** Right padding for the track (defaults to thumb width) */
  trackRightPadding?: number;
  /** Whether to animate transitions (default: true) */
  animateTransitions?: boolean;
  /** Type of animation to use (default: 'timing') */
  animationType?: 'timing' | 'spring';
  /** Orientation of the slider (default: 'horizontal') */
  orientation?: 'horizontal' | 'vertical';
  /** Callback when value changes during sliding */
  onValueChange?: (values: number[], activeThumbIndex: number) => void;
  /** Callback when sliding starts */
  onSlidingStart?: (values: number[], activeThumbIndex: number) => void;
  /** Callback when sliding completes */
  onSlidingComplete?: (values: number[], activeThumbIndex: number) => void;
}

/**
 * Provider component that manages slider state and actions
 *
 * This component handles all the internal state management, animations,
 * and gesture handling for the slider. It should wrap all slider components.
 *
 * @example
 * ```tsx
 * <SliderProvider
 *   value={50}
 *   minimumValue={0}
 *   maximumValue={100}
 *   onValueChange={(values) => console.log(values)}
 * >
 *   <SliderTrack>
 *     <SliderRange />
 *   </SliderTrack>
 *   <SliderThumb />
 * </SliderProvider>
 * ```
 *
 * @param children - Child slider components (SliderTrack, SliderThumb, etc.)
 * @param step - Step value for discrete slider
 * @param disabled - Whether the slider is disabled
 * @param minimumValue - Minimum value of the slider
 * @param maximumValue - Maximum value of the slider
 * @param animationConfig - Animation configuration object
 * @param value - Current value(s) of the slider
 * @param trackRightPadding - Right padding for the track
 * @param animateTransitions - Whether to animate transitions
 * @param animationType - Type of animation to use
 * @param orientation - Orientation of the slider
 * @param onValueChange - Callback when value changes during sliding
 * @param onSlidingStart - Callback when sliding starts
 * @param onSlidingComplete - Callback when sliding completes
 */
export function SliderProvider(props: PropsWithChildren<SliderProviderProps>) {
  const {
    animateTransitions = true,
    animationConfig = {},
    animationType = 'timing',
    children,
    disabled = false,
    maximumValue = 1,
    minimumValue = 0,
    onSlidingComplete,
    onSlidingStart,
    onValueChange,
    orientation = 'horizontal',
    step = 0,
    trackRightPadding,
    value = 0,
  } = props;

  const [values, setValues] = useState(() =>
    updateValues({
      values: normalizeValue(
        // eslint-disable-next-line
        { maximumValue, minimumValue, value: value instanceof Animated.Value ? (value as any).__getValue() : value },
        // eslint-disable-next-line
        value instanceof Animated.Value ? (value as any).__getValue() : value,
      ),
    }),
  );

  const [trackClickable, setTrackClickable] = useState(true);
  const [thumbTouchSize, setThumbTouchSizeState] = useState({ height: 40, width: 40 });
  const [isSliding, setIsSliding] = useState(false);

  const setThumbTouchSize = useCallback((size: number) => {
    setThumbTouchSizeState({ height: size, width: size });
  }, []);

  const { setCurrentValue, setCurrentValueAnimated } = useSliderAnimation(
    values,
    setValues,
    animationType,
    animationConfig,
  );

  const { allMeasured, containerSize, measureContainer, measureThumb, measureTrack, thumbSize } =
    useSliderMeasurements();

  const { getTouchOverflowSize, panResponder } = useSliderGestures({
    containerSize,
    disabled,
    maximumValue,
    minimumValue,
    onSlidingComplete,
    onSlidingStart,
    onValueChange,
    orientation,
    setCurrentValue,
    setIsSliding,
    step,
    thumbSize,
    thumbTouchSize,
    trackClickable,
    values,
  });

  useEffect(() => {
    if (value !== undefined) {
      const newValues = normalizeValue({ maximumValue, minimumValue, value }, value);
      const updatedValues = updateValues({
        newValues,
        values,
      });
      setValues(updatedValues);

      newValues.forEach((newValue, i) => {
        // eslint-disable-next-line
        const currentValue = (updatedValues[i] as any).__getValue();
        if (newValue !== currentValue && animateTransitions) {
          setCurrentValueAnimated(newValue, i);
        } else {
          setCurrentValue(newValue, i);
        }
      });
    }
    // eslint-disable-next-line
  }, [value, minimumValue, maximumValue]);

  const rightPadding = trackRightPadding ?? thumbSize.width;

  const interpolatedThumbValues = values.map((val: any) =>
    val.interpolate({
      inputRange: [minimumValue, maximumValue],
      outputRange: I18nManager.isRTL
        ? [0, -(containerSize.width - rightPadding)]
        : [0, containerSize.width - rightPadding],
    }),
  );

  const interpolatedTrackValues = values.map((val: any) =>
    val.interpolate({
      inputRange: [minimumValue, maximumValue],
      outputRange: [0, containerSize.width - rightPadding],
    }),
  );

  const valueVisibleStyle: { opacity?: number } = useMemo(() => (!allMeasured ? { opacity: 0 } : {}), [allMeasured]);

  const minTrackWidth = interpolatedTrackValues[0];
  const maxTrackWidth = interpolatedTrackValues[1];

  const minimumTrackStyle = {
    left:
      interpolatedTrackValues.length === 1 ? new Animated.Value(0) : Animated.add(minTrackWidth, thumbSize.width / 2),
    width:
      interpolatedTrackValues.length === 1
        ? Animated.add(minTrackWidth, thumbSize.width / 2)
        : Animated.add(Animated.multiply(minTrackWidth, -1), maxTrackWidth),
    ...valueVisibleStyle,
  };

  const stateValue = useMemo(
    () => ({
      allMeasured,
      containerSize,
      disabled,
      interpolatedThumbValues,
      interpolatedTrackValues,
      isSliding,
      maximumValue,
      minimumValue,
      orientation,
      step,
      thumbSize,
      thumbTouchSize,
      trackClickable,
      values,
      valueVisibleStyle,
    }),
    [
      values,
      allMeasured,
      containerSize,
      thumbSize,
      thumbTouchSize,
      minimumValue,
      maximumValue,
      step,
      disabled,
      orientation,
      trackClickable,
      interpolatedThumbValues,
      interpolatedTrackValues,
      valueVisibleStyle,
      isSliding,
    ],
  );

  const getMinimumTrackStyle = () => minimumTrackStyle;

  const actionsValue = useMemo(
    () => ({
      getMinimumTrackStyle,
      getTouchOverflowSize,
      measureContainer,
      measureThumb,
      measureTrack,
      onSlidingComplete,
      onSlidingStart,
      onValueChange,
      panResponder,
      setThumbTouchSize,
      setTrackClickable,
    }),
    // eslint-disable-next-line
    [
      measureContainer,
      measureTrack,
      measureThumb,
      onValueChange,
      onSlidingStart,
      onSlidingComplete,
      panResponder,
      getTouchOverflowSize,
      minimumTrackStyle,
    ],
  );

  return (
    <SliderStateContext.Provider value={stateValue}>
      <SliderActionsContext.Provider value={actionsValue}>{children}</SliderActionsContext.Provider>
    </SliderStateContext.Provider>
  );
}

SliderProvider.displayName = 'SliderProvider';
