import { useCallback, useRef, useMemo, useEffect } from 'react';
import { PanResponder, GestureResponderEvent, Animated, I18nManager } from 'react-native';

import Rect from '../utils/rect';
import { indexOfLowest } from '../utils/normalize';

export interface UseSliderGesturesProps {
  step: number;
  disabled: boolean;
  minimumValue: number;
  maximumValue: number;
  trackClickable: boolean;
  values: (number | Animated.Value)[];
  orientation: 'horizontal' | 'vertical';
  setIsSliding: (sliding: boolean) => void;
  thumbSize: { width: number; height: number };
  containerSize: { width: number; height: number };
  thumbTouchSize: { width: number; height: number };
  onValueChange?: (values: number[], activeThumbIndex: number) => void;
  onSlidingStart?: (values: number[], activeThumbIndex: number) => void;
  onSlidingComplete?: (values: number[], activeThumbIndex: number) => void;
  setCurrentValue: (value: number, index: number, callback?: () => void) => void;
}

export const useSliderGestures = (props: UseSliderGesturesProps) => {
  const {
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
    trackClickable = true,
    values,
  } = props;

  const vertical = orientation === 'vertical';

  const activeThumbIndexRef = useRef(0);
  const previousLeftRef = useRef(0);
  const currentValuesRef = useRef<number[]>([]);

  // Track current values using listeners instead of __getValue()
  useEffect(() => {
    const listeners: string[] = [];

    // Initialize with current values from Animated.Value
    values.forEach((val, index) => {
      // Check if it's an Animated.Value with addListener method
      if (val instanceof Animated.Value && typeof (val as any).addListener === 'function') {
        // Use the internal _value property to get the current value
        // This is safer than __getValue() and only used for initialization
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
        if (val instanceof Animated.Value && typeof (val as any).removeListener === 'function' && listeners[index]) {
          val.removeListener(listeners[index]);
        }
      });
    };
  }, [values]);

  const getRawValues = useCallback(() => [...currentValuesRef.current], []);

  const getRatio = useCallback(
    (val: number) => (val - minimumValue) / (maximumValue - minimumValue),
    [minimumValue, maximumValue],
  );

  const getThumbLeft = useCallback(
    (val: number) => {
      const standardRatio = getRatio(val);
      const ratio = I18nManager.isRTL ? 1 - standardRatio : standardRatio;
      return ratio * ((vertical ? containerSize.height : containerSize.width) - thumbSize.width);
    },
    [getRatio, vertical, containerSize, thumbSize],
  );

  const getCurrentValue = useCallback((thumbIndex = 0) => currentValuesRef.current[thumbIndex] || 0, []);

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

      const rawValues = getRawValues();
      const effectiveStep = step || 0.1; // Use effective step for buffer

      // Range bounding logic for multi-thumb sliders
      if (values.length > 1) {
        const currentIndex = activeThumbIndexRef.current;

        // Constrain by previous thumb (if exists)
        if (currentIndex > 0) {
          minValue = rawValues[currentIndex - 1] + effectiveStep;
        }

        // Constrain by next thumb (if exists)
        if (currentIndex < values.length - 1) {
          maxValue = rawValues[currentIndex + 1] - effectiveStep;
        }
      }

      const calculatedValue = ratio * (maximumValue - minimumValue) + minimumValue;

      if (step) {
        // Apply stepping
        const steppedValue = minimumValue + Math.round((calculatedValue - minimumValue) / step) * step;
        return Math.max(minValue, Math.min(maxValue, steppedValue));
      }

      // Apply simple bounds (no stepping)
      return Math.max(minValue, Math.min(maxValue, calculatedValue));
    },
    [containerSize, thumbSize, vertical, minimumValue, maximumValue, step, getRawValues, values],
  );

  // Calculate touch overflow area for better UX
  // Returns the extra space around the thumb for touch handling
  const getTouchOverflowSize = useCallback(() => {
    // Calculate width/height excess of touch area compared to thumb size
    const widthExcess = (thumbTouchSize.width - thumbSize.width) / 2;
    const heightExcess = (thumbTouchSize.height - thumbSize.height) / 2;

    return {
      // Return overflow for PanResponder touch area
      height: Math.max(0, heightExcess),
      width: Math.max(0, widthExcess),
    };
  }, [thumbTouchSize, thumbSize]);

  // Create touch rectangle using touch area dimensions
  const getThumbTouchRect = useCallback(
    (thumbIndex = 0) => {
      const { height, width } = thumbTouchSize || { height: 40, width: 40 };

      // Touch area is centered around the thumb. Calculate offset.
      const widthDifference = (width - thumbSize.width) / 2;

      // X: Thumb position (left corner) - half of width excess
      const x = getThumbLeft(getCurrentValue(thumbIndex)) - widthDifference;

      // Y: Container center - half of touch area height
      const y = (containerSize.height - height) / 2;

      return Rect({
        height,
        width,
        x,
        y,
      });
    },
    [thumbTouchSize, getThumbLeft, getCurrentValue, thumbSize, containerSize],
  );

  const thumbHitTest = useCallback(
    (e: GestureResponderEvent) => {
      const { nativeEvent } = e;

      // 1. Attempt to touch an existing thumb
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

      // 2. If no thumb is touched, check if track is clickable
      if (trackClickable) {
        // Determine which thumb is closest to the click position
        if (values.length === 1) {
          activeThumbIndexRef.current = 0;
        } else {
          const thumbDistances = values.map((_: any, index: number) => {
            const thumbTouchRect = getThumbTouchRect(index);
            // trackDistanceToPoint measures horizontal/vertical distance to thumb center
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

  const handlePanResponderGrant = useCallback(
    (e: GestureResponderEvent) => {
      if (disabled) {
        return;
      }
      const { nativeEvent } = e;

      let initialLeft: number;

      if (trackClickable) {
        // If click on track, movement starts at click position
        // Subtract half thumb size to center it
        initialLeft = vertical ? nativeEvent.locationY : nativeEvent.locationX - thumbSize.width / 2;
      } else {
        // If dragging thumb, movement starts at current thumb position
        initialLeft = getThumbLeft(getCurrentValue(activeThumbIndexRef.current));
      }

      // Adjust for touch area (if touch area is larger than thumb)
      const touchAreaDifference = (thumbTouchSize.width - thumbSize.width) / 2;
      if (thumbTouchSize) {
        initialLeft -= touchAreaDifference;
      }

      previousLeftRef.current = initialLeft;

      setIsSliding(true);
      onSlidingStart?.(getRawValues(), activeThumbIndexRef.current);
    },
    [
      disabled,
      trackClickable,
      thumbSize,
      getThumbLeft,
      getCurrentValue,
      getRawValues,
      onSlidingStart,
      thumbTouchSize,
      setIsSliding,
      vertical,
    ],
  );

  const handlePanResponderMove = useCallback(
    (_e: GestureResponderEvent, gestureState: { dx: number; dy: number }) => {
      if (disabled) {
        return;
      }
      const newValue = getValue(gestureState);
      setCurrentValue(newValue, activeThumbIndexRef.current, () => {
        const rawValues = getRawValues();
        onValueChange?.(rawValues, activeThumbIndexRef.current);
      });
    },
    [disabled, getValue, setCurrentValue, getRawValues, onValueChange],
  );

  const handlePanResponderRequestEnd = useCallback(() => false, []);

  const handlePanResponderEnd = useCallback(
    (_e: GestureResponderEvent, gestureState: { dx: number; dy: number }) => {
      if (disabled) {
        return;
      }

      // Ensure final value is correct
      setCurrentValue(getValue(gestureState), activeThumbIndexRef.current, () => {
        // Call onValueChange even if track wasn't clickable (for final movement)
        onValueChange?.(getRawValues(), activeThumbIndexRef.current);
        onSlidingComplete?.(getRawValues(), activeThumbIndexRef.current);
        setIsSliding(false);
      });
      activeThumbIndexRef.current = 0;
    },
    [disabled, getValue, setCurrentValue, getRawValues, onValueChange, onSlidingComplete, setIsSliding],
  );

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

  return {
    getTouchOverflowSize,
    panResponder,
  };
};
