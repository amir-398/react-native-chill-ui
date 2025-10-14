import { useCallback, useRef, useMemo } from 'react';
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

  const getRawValues = useCallback(
    (vals: (number | Animated.Value)[]) => vals.map(val => (val as any).__getValue()),
    [],
  );

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

  const getCurrentValue = useCallback((thumbIndex = 0) => (values[thumbIndex] as any).__getValue() || 0, [values]);

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

  const getTouchOverflowSize = useCallback(() => {
    const size = { height: 40, width: 40 };
    if (thumbTouchSize) {
      size.width = Math.max(0, thumbTouchSize.width || 0 + thumbSize.width);
      size.height = Math.max(0, thumbTouchSize.height || 0 - containerSize.height);
    }
    return size;
  }, [thumbTouchSize, thumbSize, containerSize]);

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

  const handlePanResponderGrant = useCallback(
    (e: GestureResponderEvent) => {
      const { nativeEvent } = e;

      previousLeftRef.current = trackClickable
        ? nativeEvent.locationX - thumbSize.width
        : getThumbLeft(getCurrentValue(activeThumbIndexRef.current));
      if (thumbTouchSize) {
        previousLeftRef.current -= (thumbTouchSize.width - thumbSize.width) / 2;
      }
      setIsSliding(true);
      onSlidingStart?.(getRawValues(values), activeThumbIndexRef.current);
    },
    [
      trackClickable,
      thumbSize,
      getThumbLeft,
      getCurrentValue,
      getRawValues,
      values,
      onSlidingStart,
      thumbTouchSize,
      setIsSliding,
    ],
  );

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
      setIsSliding(false);
      activeThumbIndexRef.current = 0;
    },
    [
      disabled,
      getValue,
      setCurrentValue,
      trackClickable,
      getRawValues,
      values,
      onValueChange,
      onSlidingComplete,
      setIsSliding,
    ],
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
