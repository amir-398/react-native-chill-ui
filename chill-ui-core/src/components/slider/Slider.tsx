import { cn } from '@utils';
import { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import { Animated, GestureResponderEvent, I18nManager, PanResponder, ViewStyle } from 'react-native';

import { Box } from '../box';
import Rect from './utils/rect';
import SliderTrack from './components/SliderTrack';
import SliderThumb from './components/SliderThumb';
import { SliderProps } from '../../types/slider.types';
import useSliderAnimation from './hooks/useSliderAnimation';
import useSliderMeasurements from './hooks/useSliderMeasurements';
import { normalizeValue, updateValues, indexOfLowest } from './utils/normalize';

/**
 * Slider component that provides a customizable range slider with smooth animations.
 * Supports single and dual thumb sliders, custom styling, track marks, and gesture handling.
 *
 * @example
 * ```tsx
 * // Basic single slider
 * <Slider
 *   value={50}
 *   minimumValue={0}
 *   maximumValue={100}
 *   onValueChange={(value) => console.log('Value:', value)}
 * />
 *
 * // Range slider with custom styling
 * <Slider
 *   value={[25, 75]}
 *   minimumValue={0}
 *   maximumValue={100}
 *   minimumTrackColor="#007AFF"
 *   maximumTrackColor="#E5E5EA"
 *   thumbColor="#007AFF"
 *   onValueChange={(values) => setRange(values)}
 * />
 * ```
 *
 * @param animateTransitions - Whether to animate value transitions
 * @param animationConfig - Configuration for animations
 * @param animationType - Type of animation ('timing' | 'spring')
 * @param containerClassName - Custom CSS classes for the container
 * @param debugTouchArea - Show debug touch areas (development only)
 * @param disabled - Whether the slider is disabled
 * @param maximumTrackClassName - Custom CSS classes for maximum track
 * @param maximumTrackColor - Color of the maximum track
 * @param maximumValue - Maximum value of the slider
 * @param minimumTrackClassName - Custom CSS classes for minimum track
 * @param minimumTrackColor - Color of the minimum track
 * @param minimumValue - Minimum value of the slider
 * @param onSlidingComplete - Callback when sliding completes
 * @param onSlidingStart - Callback when sliding starts
 * @param onValueChange - Callback when value changes
 * @param renderAboveThumbComponent - Component to render above thumb
 * @param renderBelowThumbComponent - Component to render below thumb
 * @param renderMaximumTrackComponent - Custom maximum track component
 * @param renderMinimumTrackComponent - Custom minimum track component
 * @param renderThumbComponent - Custom thumb component
 * @param renderTrackMarkComponent - Custom track mark component
 * @param step - Step value for discrete slider
 * @param thumbClassName - Custom CSS classes for thumb
 * @param thumbColor - Color of the thumb
 * @param thumbImage - Image for the thumb
 * @param thumbTouchSize - Touch area size for thumb
 * @param trackClassName - Custom CSS classes for track
 * @param trackClickable - Whether track is clickable
 * @param trackMarks - Array of track mark values
 * @param value - Current value(s) of the slider
 * @param vertical - Whether slider is vertical
 * @returns Slider component with gesture handling and animations
 */
function Slider(props: SliderProps) {
  const {
    animateTransitions = true,
    animationConfig = {},
    animationType = 'timing',
    containerClassName,
    debugTouchArea = false,
    disabled = false,
    maximumTrackClassName,
    maximumTrackColor = '#b3b3b3',
    maximumValue = 1,
    minimumTrackClassName,
    minimumTrackColor = '#3f3f3f',
    minimumValue = 0,
    onSlidingComplete,
    onSlidingStart,
    onValueChange,
    renderAboveThumbComponent,
    renderBelowThumbComponent,
    renderMaximumTrackComponent,
    renderMinimumTrackComponent,
    renderThumbComponent,
    renderTrackMarkComponent,
    step = 0,
    thumbClassName,
    thumbColor = '#343434',
    thumbImage,
    thumbTouchSize = { height: 10, width: 10 },
    trackClassName,
    trackClickable = true,
    trackMarks = [],
    value = 0,
    vertical = false,
    ...restProps
  } = props;

  /** Current values of the slider (supports single and dual thumb) */
  const [values, setValues] = useState(() =>
    updateValues({
      // eslint-disable-next-line
      values: normalizeValue(props, value instanceof Animated.Value ? (value as any).__getValue() : value),
    }),
  );
  /** Track mark values for discrete slider */
  const [trackMarksValues, setTrackMarksValues] = useState(() =>
    updateValues({
      values: normalizeValue(props, trackMarks || []),
    }),
  );

  /** Animation hooks for smooth value transitions */
  const { setCurrentValue, setCurrentValueAnimated } = useSliderAnimation(
    values,
    setValues,
    animationType,
    animationConfig,
  );
  /** Measurement hooks for container, track, and thumb dimensions */
  const {
    allMeasured,
    containerSize,

    measureContainer,
    measureThumb,
    measureTrack,
    thumbSize,
  } = useSliderMeasurements();

  // Refs pour les valeurs qui persistent entre les renders
  const activeThumbIndexRef = useRef(0);
  const previousLeftRef = useRef(0);

  // Effet pour mettre à jour les valeurs quand les props changent
  useEffect(() => {
    if (value !== undefined) {
      const newValues = normalizeValue(props, value);
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
  }, [value]);

  useEffect(() => {
    if (trackMarks) {
      const newTrackMarksValues = normalizeValue(props, trackMarks);
      setTrackMarksValues(
        updateValues({
          newValues: newTrackMarksValues,
          values: trackMarksValues,
        }),
      );
    }
    // eslint-disable-next-line
  }, [props.trackMarks]);

  /**
   * Gets raw numeric values from animated values
   * @param vals - Array of animated or numeric values
   * @returns Array of numeric values
   */
  const getRawValues = useCallback(
    // eslint-disable-next-line
    (vals: (number | Animated.Value)[]) => vals.map(val => (val as any).__getValue()),
    [],
  );

  /**
   * Calculates the ratio of a value within the slider range
   * @param val - The value to calculate ratio for
   * @returns Ratio between 0 and 1
   */
  const getRatio = useCallback(
    (val: number) => (val - minimumValue) / (maximumValue - minimumValue),
    [minimumValue, maximumValue],
  );

  /**
   * Calculates the left position of a thumb based on its value
   * @param val - The thumb value
   * @returns Left position in pixels
   */
  const getThumbLeft = useCallback(
    (val: number) => {
      const standardRatio = getRatio(val);
      const ratio = I18nManager.isRTL ? 1 - standardRatio : standardRatio;
      return ratio * ((vertical ? containerSize.height : containerSize.width) - thumbSize.width);
    },
    [getRatio, vertical, containerSize, thumbSize],
  );
  // eslint-disable-next-line
  const getCurrentValue = useCallback((thumbIndex = 0) => (values[thumbIndex] as any).__getValue() || 0, [values]);

  /**
   * Calculates the new value based on gesture state
   * @param gestureState - The current gesture state
   * @returns New calculated value
   */
  const getValue = useCallback(
    (gestureState: { dy: number; dx: number }) => {
      const length = containerSize.width - thumbSize.width;
      const thumbLeft = vertical
        ? previousLeftRef.current + gestureState.dy * -1
        : previousLeftRef.current + gestureState.dx;
      const nonRtlRatio = thumbLeft / length;
      const ratio = I18nManager.isRTL ? 1 - nonRtlRatio : nonRtlRatio;
      let minValue = minimumValue;
      let maxValue = maximumValue;
      const rawValues = getRawValues(values);
      const buffer = step || 0.1;

      if (values.length === 2) {
        if (activeThumbIndexRef.current === 1) {
          minValue = rawValues[0] + buffer;
        } else {
          maxValue = rawValues[1] - buffer;
        }
      }

      if (step) {
        return Math.max(
          minValue,
          Math.min(maxValue, minimumValue + Math.round((ratio * (maximumValue - minimumValue)) / step) * step),
        );
      }
      return Math.max(minValue, Math.min(maxValue, ratio * (maximumValue - minimumValue) + minimumValue));
    },
    [containerSize, thumbSize, vertical, minimumValue, maximumValue, step, getRawValues, values],
  );

  /**
   * Calculates the touch overflow size for better touch handling
   * @returns Object with width and height of touch area
   */
  const getTouchOverflowSize = useCallback(() => {
    const size = { height: 40, width: 40 };
    if (allMeasured && thumbTouchSize) {
      size.width = Math.max(0, thumbTouchSize.width || 0 + thumbSize.width);
      size.height = Math.max(0, thumbTouchSize.height || 0 - containerSize.height);
    }
    return size;
  }, [allMeasured, thumbTouchSize, thumbSize, containerSize]);

  /**
   * Gets the touch overflow style for positioning
   * @returns Style object for touch overflow
   */
  const getTouchOverflowStyle = useCallback(() => {
    const { height, width } = getTouchOverflowSize();
    const touchOverflowStyle: {
      marginTop?: number;
      marginBottom?: number;
      marginLeft?: number;
      marginRight?: number;
      backgroundColor?: string;
      opacity?: number;
    } = {};
    if (width !== undefined && height !== undefined) {
      const verticalMargin = -height / 2;
      touchOverflowStyle.marginTop = verticalMargin;
      touchOverflowStyle.marginBottom = verticalMargin;
      const horizontalMargin = -width / 2;
      touchOverflowStyle.marginLeft = horizontalMargin;
      touchOverflowStyle.marginRight = horizontalMargin;
    }
    if (debugTouchArea === true) {
      touchOverflowStyle.backgroundColor = 'orange';
      touchOverflowStyle.opacity = 0.5;
    }
    return touchOverflowStyle;
  }, [getTouchOverflowSize, debugTouchArea]);

  /**
   * Gets the touch rectangle for a specific thumb
   * @param thumbIndex - Index of the thumb
   * @returns Rectangle object for touch detection
   */
  const getThumbTouchRect = useCallback(
    (thumbIndex = 0) => {
      const { height, width } = thumbTouchSize || { height: 40, width: 40 };
      const touchOverflowSize = getTouchOverflowSize();
      return Rect({
        height,
        width,
        x: touchOverflowSize.width / 2 + getThumbLeft(getCurrentValue(thumbIndex)) + (thumbSize.width - width) / 2,
        y: touchOverflowSize.height / 2 + (containerSize.height - height) / 2,
      });
    },
    [thumbTouchSize, getTouchOverflowSize, getThumbLeft, getCurrentValue, thumbSize, containerSize],
  );

  /**
   * Tests if a touch event hits any thumb or track
   * @param e - The gesture responder event
   * @returns True if touch hits thumb or track
   */
  const thumbHitTest = useCallback(
    (e: GestureResponderEvent) => {
      const { nativeEvent } = e;

      const hitThumb = values.find((_: any, i: number) => {
        const thumbTouchRect = getThumbTouchRect(i);
        const containsPoint = thumbTouchRect.containsPoint(nativeEvent.locationX, nativeEvent.locationY);
        if (containsPoint) {
          activeThumbIndexRef.current = i;
        }
        return containsPoint;
      });

      if (hitThumb) {
        return true;
      }

      if (trackClickable) {
        if (values.length === 1) {
          activeThumbIndexRef.current = 0;
        } else {
          const thumbDistances = values.map((_: any, index: number) => {
            const thumbTouchRect = getThumbTouchRect(index);
            return thumbTouchRect.trackDistanceToPoint(nativeEvent.locationX);
          });
          activeThumbIndexRef.current = indexOfLowest(thumbDistances);
        }
        return true;
      }
      return false;
    },
    [values, getThumbTouchRect, trackClickable],
  );

  const handleStartShouldSetPanResponder = useCallback((e: GestureResponderEvent) => thumbHitTest(e), [thumbHitTest]);

  const handleMoveShouldSetPanResponder = useCallback(() => false, []);

  /**
   * Handles the start of a pan gesture
   * @param e - The gesture responder event
   */
  const handlePanResponderGrant = useCallback(
    (e: GestureResponderEvent) => {
      const { nativeEvent } = e;

      previousLeftRef.current = trackClickable
        ? nativeEvent.locationX - thumbSize.width
        : getThumbLeft(getCurrentValue(activeThumbIndexRef.current));
      if (thumbTouchSize) {
        previousLeftRef.current -= (thumbTouchSize.width - thumbSize.width) / 2;
      }
      onSlidingStart?.(getRawValues(values), activeThumbIndexRef.current);
    },
    [trackClickable, thumbSize, getThumbLeft, getCurrentValue, getRawValues, values, onSlidingStart, thumbTouchSize],
  );

  /**
   * Handles the movement of a pan gesture
   * @param _e - The gesture responder event
   * @param gestureState - The current gesture state
   */
  const handlePanResponderMove = useCallback(
    (_e: GestureResponderEvent, gestureState: { dx: number; dy: number }) => {
      if (disabled) {
        return;
      }
      setCurrentValue(getValue(gestureState), activeThumbIndexRef.current, () => {
        onValueChange?.(getRawValues(values), activeThumbIndexRef.current);
      });
    },
    [disabled, getValue, setCurrentValue, getRawValues, values, onValueChange],
  );

  const handlePanResponderRequestEnd = useCallback(() => false, []);

  /**
   * Handles the end of a pan gesture
   * @param _e - The gesture responder event
   * @param gestureState - The final gesture state
   */
  const handlePanResponderEnd = useCallback(
    (_e: GestureResponderEvent, gestureState: { dx: number; dy: number }) => {
      if (disabled) {
        return;
      }
      setCurrentValue(getValue(gestureState), activeThumbIndexRef.current, () => {
        if (trackClickable) {
          onValueChange?.(getRawValues(values), activeThumbIndexRef.current);
        }
        onSlidingComplete?.(getRawValues(values), activeThumbIndexRef.current);
      });
      activeThumbIndexRef.current = 0;
    },
    [disabled, getValue, setCurrentValue, trackClickable, getRawValues, values, onValueChange, onSlidingComplete],
  );

  /** PanResponder for gesture handling */
  const panResponder = useMemo(
    () =>
      PanResponder.create({
        onMoveShouldSetPanResponder: handleMoveShouldSetPanResponder,
        onPanResponderGrant: handlePanResponderGrant,
        onPanResponderMove: handlePanResponderMove,
        onPanResponderRelease: handlePanResponderEnd,
        onPanResponderTerminate: handlePanResponderEnd,
        onPanResponderTerminationRequest: handlePanResponderRequestEnd,
        onStartShouldSetPanResponder: handleStartShouldSetPanResponder,
      }),
    [
      handleStartShouldSetPanResponder,
      handleMoveShouldSetPanResponder,
      handlePanResponderGrant,
      handlePanResponderMove,
      handlePanResponderEnd,
      handlePanResponderRequestEnd,
    ],
  );

  /**
   * Renders debug touch rectangles for development
   * @param _thumbLeft - Left position of thumb
   * @param index - Index of the thumb
   * @returns Debug view component
   */
  const renderDebugThumbTouchRect = useCallback(
    (_thumbLeft: number, index: number) => {
      const { height, width, x, y } = getThumbTouchRect() || {};
      const positionStyle = { height, left: x, top: y, width };

      return (
        <Animated.View
          key={`debug-thumb-${index}`}
          pointerEvents="none"
          className="absolute bottom-0 left-0 right-0 top-0 bg-transparent"
          style={positionStyle}
        />
      );
    },
    [getThumbTouchRect],
  );

  // Calculs pour le rendu
  const { startFromZero: propStartFromZero, trackRightPadding } = props;
  const rightPadding = trackRightPadding ?? thumbSize.width;
  const shouldStartFromZero = values.length === 1 && minimumValue < 0 && maximumValue > 0 ? propStartFromZero : false;

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

  const interpolatedTrackMarksValues =
    trackMarksValues &&
    trackMarksValues.map((v: any) =>
      v.interpolate({
        inputRange: [minimumValue, maximumValue],
        outputRange: I18nManager.isRTL
          ? [0, -(containerSize.width - rightPadding)]
          : [0, containerSize.width - rightPadding],
      }),
    );

  const valueVisibleStyle: { opacity?: number } = {};
  if (!allMeasured) {
    valueVisibleStyle.opacity = 0;
  } // eslint-disable-next-line
  const currentValue = (values[0] as any).__getValue();
  const sliderWidthCoefficient = containerSize.width / (Math.abs(minimumValue) + Math.abs(maximumValue));

  let startPositionOnTrack = 0;
  if (shouldStartFromZero) {
    if (currentValue < 0 + step) {
      startPositionOnTrack = (currentValue + Math.abs(minimumValue)) * sliderWidthCoefficient;
    } else {
      startPositionOnTrack = Math.abs(minimumValue) * sliderWidthCoefficient;
    }
  }

  const minTrackWidth = shouldStartFromZero
    ? Math.abs(currentValue) * sliderWidthCoefficient - thumbSize.width / 2
    : interpolatedTrackValues[0];

  const maxTrackWidth = interpolatedTrackValues[1];

  const clearBorderRadius: {
    borderBottomRightRadius?: number;
    borderTopRightRadius?: number;
    borderTopLeftRadius?: number;
    borderBottomLeftRadius?: number;
  } = {};

  if (shouldStartFromZero && currentValue < 0 + step) {
    clearBorderRadius.borderBottomRightRadius = 0;
    clearBorderRadius.borderTopRightRadius = 0;
  }
  if (shouldStartFromZero && currentValue > 0) {
    clearBorderRadius.borderTopLeftRadius = 0;
    clearBorderRadius.borderBottomLeftRadius = 0;
  }

  const minimumTrackStyle: ViewStyle = {
    backgroundColor: minimumTrackColor,
    left:
      interpolatedTrackValues.length === 1
        ? new Animated.Value(startPositionOnTrack)
        : Animated.add(minTrackWidth, thumbSize.width / 2),
    width:
      interpolatedTrackValues.length === 1
        ? Animated.add(minTrackWidth, thumbSize.width / 2)
        : Animated.add(Animated.multiply(minTrackWidth, -1), maxTrackWidth),
    ...valueVisibleStyle,
    ...clearBorderRadius,
  };

  const touchOverflowStyle = getTouchOverflowStyle();

  return (
    <Box
      {...restProps}
      onLayout={measureContainer}
      className={cn(vertical ? 'rotate-[-90deg]' : '', 'h-10 justify-center', containerClassName)}
    >
      {renderAboveThumbComponent &&
        interpolatedThumbValues.map((interpolationValue: any, i: number) => {
          const animatedValue = values[i] || 0;
          // eslint-disable-next-line
          const val = animatedValue instanceof Animated.Value ? (animatedValue as any).__getValue() : animatedValue;
          return (
            <Animated.View
              key={`slider-above-thumb-${i}`}
              className="absolute"
              style={[
                {
                  bottom: '90%',
                  transform: [{ translateX: interpolationValue }, { translateY: 0 }],
                  ...valueVisibleStyle,
                } as ViewStyle,
              ]}
            >
              {renderAboveThumbComponent?.(i, val)}
            </Animated.View>
          );
        })}

      <SliderTrack
        trackClassName={trackClassName}
        maximumTrackClassName={maximumTrackClassName}
        minimumTrackClassName={minimumTrackClassName}
        maximumTrackColor={maximumTrackColor}
        minimumTrackColor={minimumTrackColor}
        minimumTrackStyle={minimumTrackStyle}
        renderMaximumTrackComponent={renderMaximumTrackComponent}
        renderMinimumTrackComponent={renderMinimumTrackComponent}
        renderTrackMarkComponent={renderTrackMarkComponent}
        interpolatedTrackMarksValues={interpolatedTrackMarksValues}
        valueVisibleStyle={valueVisibleStyle}
        measureTrack={measureTrack}
      />

      <SliderThumb
        thumbClassName={thumbClassName}
        thumbColor={thumbColor}
        thumbImage={thumbImage}
        renderThumbComponent={renderThumbComponent}
        interpolatedThumbValues={interpolatedThumbValues}
        valueVisibleStyle={valueVisibleStyle}
        measureThumb={measureThumb}
      />

      <Box
        className="absolute bottom-0 left-0 right-0 top-0 bg-transparent"
        style={touchOverflowStyle}
        {...panResponder.panHandlers}
      >
        {!!debugTouchArea && interpolatedThumbValues.map((val: any, i: number) => renderDebugThumbTouchRect(val, i))}
      </Box>
      {renderBelowThumbComponent &&
        interpolatedThumbValues.map((interpolationValue: any, i: number) => {
          const animatedValue = values[i] || 0;
          // eslint-disable-next-line
          const val = animatedValue instanceof Animated.Value ? (animatedValue as any).__getValue() : animatedValue;
          return (
            <Animated.View
              key={`slider-below-thumb-${i}`}
              className="absolute"
              style={[
                {
                  top: '90%',
                  transform: [{ translateX: interpolationValue }, { translateY: 0 }],
                  ...valueVisibleStyle,
                } as ViewStyle,
              ]}
            >
              {renderBelowThumbComponent?.(i, val)}
            </Animated.View>
          );
        })}
    </Box>
  );
}

Slider.displayName = 'Slider';

export default Slider;
