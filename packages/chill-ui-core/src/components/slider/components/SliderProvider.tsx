import { Animated, I18nManager } from 'react-native';
import { PropsWithChildren, useMemo, useState, useEffect, useCallback, useRef } from 'react';

import { useSliderGestures } from '../hooks/useSliderGestures';
import { useSliderAnimation } from '../hooks/useSliderAnimation';
import useSliderMeasurements from '../hooks/useSliderMeasurements';
import { SliderStateContext, SliderActionsContext } from '../context/SliderContext';

export interface SliderProviderProps {
  /** Step value for discrete slider (default: 0) */
  step?: number;
  /** Whether the slider is disabled (default: false) */
  disabled?: boolean;
  /** Minimum value of the slider (default: 0) */
  minimumValue?: number;
  /** Maximum value of the slider (default: 100) */
  maximumValue?: number;
  /** Animation configuration object */
  animationConfig?: Partial<Animated.TimingAnimationConfig | Animated.SpringAnimationConfig>;
  /** Current value(s) of the slider (controlled mode). If not provided, slider works in uncontrolled mode */
  value?: number | number[];
  /** Default initial value(s) for uncontrolled mode (default: 0) */
  defaultValue?: number | number[];
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
 *   defaultValue={50}
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
    defaultValue,
    disabled = false,
    maximumValue = 100,
    minimumValue = 0,
    onSlidingComplete,
    onSlidingStart,
    onValueChange,
    orientation = 'horizontal',
    step = 0,
    trackRightPadding,
    value,
  } = props;

  // Determine if component is controlled
  const isControlled = value !== undefined;

  // Get initial value (from value or defaultValue) - only evaluated once on mount
  const getInitialValue = () => {
    const val = value ?? defaultValue ?? minimumValue;
    return Array.isArray(val) ? [...val] : [val];
  };

  // Internal state for uncontrolled mode
  const [internalValue, setInternalValue] = useState<number[]>(getInitialValue);

  // Use controlled value if provided, otherwise use internal value
  const currentValue = isControlled ? value : internalValue;

  // Normalize current value to always be an array
  const normalizedValue = useMemo(() => {
    const val = currentValue ?? minimumValue;
    return Array.isArray(val) ? [...val] : [val];
  }, [currentValue, minimumValue]);

  const [values, setValues] = useState<Animated.Value[]>(() =>
    normalizedValue.map(v => new Animated.Value(Math.max(minimumValue, Math.min(maximumValue, v)))),
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

  const handleValueChange = useCallback(
    (newValues: number[], activeThumbIndex: number) => {
      // Update internal state if uncontrolled
      if (!isControlled) {
        setInternalValue(newValues);
      }
      // Always call the callback if provided
      onValueChange?.(newValues, activeThumbIndex);
    },
    [onValueChange, isControlled],
  );

  const handleSlidingStart = useCallback(
    (slidingValues: number[], activeThumbIndex: number) => {
      onSlidingStart?.(slidingValues, activeThumbIndex);
    },
    [onSlidingStart],
  );

  const handleSlidingComplete = useCallback(
    (completeValues: number[], activeThumbIndex: number) => {
      onSlidingComplete?.(completeValues, activeThumbIndex);
    },
    [onSlidingComplete],
  );

  const { getTouchOverflowSize, panResponder } = useSliderGestures({
    containerSize,
    disabled,
    maximumValue,
    minimumValue,
    onSlidingComplete: handleSlidingComplete,
    onSlidingStart: handleSlidingStart,
    onValueChange: handleValueChange,
    orientation,
    setCurrentValue,
    setIsSliding,
    step,
    thumbSize,
    thumbTouchSize,
    trackClickable,
    values,
  });

  // Track current values in a ref to avoid dependency on values in the effect
  const currentValuesRef = useRef<number[]>(normalizedValue);

  // Update current values when values change
  useEffect(() => {
    const listeners: string[] = [];

    // Initialize/sync currentValuesRef with actual Animated.Value values
    values.forEach((val, index) => {
      // Check if it's an Animated.Value with addListener method
      if (typeof (val as any).addListener === 'function') {
        // eslint-disable-next-line no-underscore-dangle
        currentValuesRef.current[index] = (val as any)._value ?? 0;

        const listenerId = val.addListener(({ value: newValue }) => {
          currentValuesRef.current[index] = newValue;
        });
        listeners.push(listenerId);
      } else {
        // For plain numbers or in test environments
        currentValuesRef.current[index] = typeof val === 'number' ? val : 0;
      }
    });

    return () => {
      values.forEach((val, index) => {
        if (typeof (val as any).removeListener === 'function' && listeners[index]) {
          val.removeListener(listeners[index]);
        }
      });
    };
  }, [values]);

  // Ref to track the last external value to avoid processing internal updates
  const lastExternalValueRef = useRef<number | number[] | undefined>(value);
  const processingUpdateRef = useRef(false);

  // Update values when value prop changes (external updates only, controlled mode)
  useEffect(() => {
    // Only process in controlled mode
    if (!isControlled) {
      return;
    }

    // Don't process if we're already processing an update
    if (processingUpdateRef.current) {
      return;
    }

    // Don't process updates during sliding at all
    if (isSliding) {
      return;
    }

    if (value === undefined) {
      return;
    }

    const newValues = Array.isArray(value) ? [...value] : [value];
    const currentAnimatedValues = currentValuesRef.current;

    // If we don't have current values yet (initial render), initialize them
    if (currentAnimatedValues.length === 0) {
      processingUpdateRef.current = true;
      newValues.forEach((newVal, i) => {
        const numValue = typeof newVal === 'number' ? newVal : 0;
        setCurrentValue(numValue, i);
      });
      lastExternalValueRef.current = value;
      setTimeout(() => {
        processingUpdateRef.current = false;
      }, 0);
      return;
    }

    // Check if the new values are significantly different from current values
    // This helps distinguish external changes from callback-triggered updates
    const hasSignificantChange = newValues.some((newVal, i) => {
      const currentVal = currentAnimatedValues[i] ?? 0;
      const diff = Math.abs(newVal - currentVal);
      // Use a threshold of 1 to avoid processing small changes from callbacks
      return diff > 1;
    });

    if (!hasSignificantChange) {
      return;
    }

    // Apply external update
    processingUpdateRef.current = true;
    newValues.forEach((newVal, i) => {
      const numValue = typeof newVal === 'number' ? newVal : 0;

      if (animateTransitions && !isSliding) {
        setCurrentValueAnimated(numValue, i);
      } else {
        setCurrentValue(numValue, i);
      }
    });
    lastExternalValueRef.current = value;
    setTimeout(() => {
      processingUpdateRef.current = false;
    }, 0);
  }, [value, isSliding, animateTransitions, setCurrentValue, setCurrentValueAnimated, isControlled]);

  const rightPadding = trackRightPadding ?? thumbSize.width;

  const interpolatedThumbValues = useMemo(
    () =>
      values.map((val: any) =>
        val.interpolate({
          inputRange: [minimumValue, maximumValue],
          outputRange: I18nManager.isRTL
            ? [0, -(containerSize.width - rightPadding)]
            : [0, containerSize.width - rightPadding],
        }),
      ),
    [values, minimumValue, maximumValue, containerSize.width, rightPadding],
  );

  const interpolatedTrackValues = useMemo(
    () =>
      values.map((val: Animated.Value) =>
        val.interpolate({
          inputRange: [minimumValue, maximumValue],
          outputRange: [0, containerSize.width - rightPadding],
        }),
      ),
    [values, minimumValue, maximumValue, containerSize.width, rightPadding],
  );

  const valueVisibleStyle: { opacity?: number } = useMemo(() => (!allMeasured ? { opacity: 0 } : {}), [allMeasured]);

  const minimumTrackStyle = useMemo(() => {
    // For multiple thumbs, use first and last thumb positions
    const firstThumbWidth = interpolatedTrackValues[0];
    const lastThumbWidth = interpolatedTrackValues[interpolatedTrackValues.length - 1];

    return {
      left:
        interpolatedTrackValues.length === 1
          ? new Animated.Value(0)
          : Animated.add(firstThumbWidth, thumbSize.width / 2),
      width:
        interpolatedTrackValues.length === 1
          ? Animated.add(firstThumbWidth, thumbSize.width / 2)
          : Animated.add(Animated.multiply(firstThumbWidth, -1), lastThumbWidth),
      ...valueVisibleStyle,
    };
  }, [interpolatedTrackValues, thumbSize.width, valueVisibleStyle]);

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

  const getMinimumTrackStyle = useCallback(() => minimumTrackStyle, [minimumTrackStyle]);

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
