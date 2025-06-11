import React, { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import {
  Animated,
  Easing,
  GestureResponderEvent,
  I18nManager,
  Image,
  PanResponder,
  StyleProp,
  ViewStyle,
} from 'react-native';

import { Box } from '../box';
import defaultStyles from './styles';

export interface SliderProps {
  step?: number;
  disabled?: boolean;
  vertical?: boolean;
  minimumValue: number;
  maximumValue: number;
  trackMarks?: number[];
  animationConfig?: any;
  thumbTintColor?: string;
  startFromZero?: boolean;
  value: number | number[];
  trackClickable?: boolean;
  debugTouchArea?: boolean;
  trackRightPadding?: number;
  animateTransitions?: boolean;
  trackMarksTintColor?: string;
  thumbImage?: string | string[];
  maximumTrackTintColor?: string;
  minimumTrackTintColor?: string;
  trackStyle?: StyleProp<ViewStyle>;
  thumbStyle?: StyleProp<ViewStyle>;
  animationType?: 'timing' | 'spring';
  containerStyle?: StyleProp<ViewStyle>;
  trackMarksStyle?: StyleProp<ViewStyle>;
  maximumTrackStyle?: StyleProp<ViewStyle>;
  minimumTrackStyle?: StyleProp<ViewStyle>;
  thumbTouchSize?: { width: number; height: number };
  renderMaximumTrackComponent?: () => React.ReactNode;
  renderMinimumTrackComponent?: () => React.ReactNode;
  renderTrackMarkComponent?: (index: number) => React.ReactNode;
  onValueChange?: (values: number[], activeThumbIndex: number) => void;
  onSlidingStart?: (values: number[], activeThumbIndex: number) => void;
  onSlidingComplete?: (values: number[], activeThumbIndex: number) => void;
  renderAboveThumbComponent?: (index: number, value: number) => React.ReactNode;
  renderBelowThumbComponent?: (index: number, value: number) => React.ReactNode;
  renderThumbComponent?: React.ReactNode | ((index: number) => React.ReactNode);
}

const Rect = ({ height, width, x, y }: { height: number; width: number; x: number; y: number }) => ({
  containsPoint: (nativeX: number, nativeY: number) =>
    nativeX >= x && nativeY >= y && nativeX <= x + width && nativeY <= y + height,
  height,
  trackDistanceToPoint: (nativeX: number) => {
    if (nativeX < x) {
      return x - nativeX;
    }
    if (nativeX > x + width) {
      return nativeX - (x + width);
    }
    return 0;
  },
  width,
  x,
  y,
});

const DEFAULT_ANIMATION_CONFIGS = {
  spring: {
    friction: 7,
    tension: 100,
  },
  timing: {
    delay: 0,
    duration: 150,
    easing: Easing.inOut(Easing.ease),
  },
};

const normalizeValue = (props: SliderProps, value: number | number[]) => {
  if (!value || (Array.isArray(value) && value.length === 0)) {
    return [0];
  }
  const { maximumValue, minimumValue } = props;
  const getBetweenValue = (inputValue: number) => Math.max(Math.min(inputValue, maximumValue), minimumValue);
  if (!Array.isArray(value)) {
    return [getBetweenValue(value)];
  }
  return value.map(getBetweenValue).sort((a, b) => a - b);
};

const updateValues = ({
  values,
  newValues = values,
}: {
  values: (number | Animated.Value)[];
  newValues?: (number | Animated.Value)[];
}) => {
  if (Array.isArray(newValues) && Array.isArray(values) && newValues.length !== values.length) {
    return updateValues({
      // eslint-disable-next-line
      values: newValues.map(v => new Animated.Value(typeof v === 'number' ? v : (v as any).__getValue())),
    });
  }
  if (Array.isArray(values) && Array.isArray(newValues)) {
    return values?.map((value, index) => {
      let valueToSet = newValues[index];
      if ((value as any) instanceof Animated.Value) {
        if ((valueToSet as any) instanceof Animated.Value) {
          // eslint-disable-next-line
          valueToSet = (valueToSet as any).__getValue();
        }
        (value as any).setValue(valueToSet as number);
        return value;
      }
      if ((valueToSet as any) instanceof Animated.Value) {
        return valueToSet;
      }
      return new Animated.Value(valueToSet as number);
    });
  }
  return [new Animated.Value(0)];
};

const indexOfLowest = (values: number[]) => {
  let lowestIndex = 0;
  values.forEach((value, index, array) => {
    if (value < array[lowestIndex]) {
      lowestIndex = index;
    }
  });
  return lowestIndex;
};

function Slider(props: SliderProps) {
  const {
    animateTransitions = true,
    animationConfig = {},
    animationType = 'timing',
    debugTouchArea = false,
    maximumTrackTintColor = '#b3b3b3',
    maximumValue = 1,
    minimumTrackTintColor = '#3f3f3f',
    minimumValue = 0,
    startFromZero = false,
    step = 0,
    thumbTintColor = '#343434',
    thumbTouchSize = { height: 40, width: 40 },
    trackClickable = true,
    trackMarks = [],
    value = 0,
    vertical = false,
    ...restProps
  } = props;

  const [allMeasured, setAllMeasured] = useState(false);
  const [containerSize, setContainerSize] = useState({ height: 0, width: 0 });
  const [thumbSize, setThumbSize] = useState({ height: 0, width: 0 });
  const [values, setValues] = useState(() =>
    updateValues({
      // eslint-disable-next-line
      values: normalizeValue(props, value instanceof Animated.Value ? (value as any).__getValue() : value),
    }),
  );
  const [trackMarksValues, setTrackMarksValues] = useState(() =>
    updateValues({
      values: normalizeValue(props, trackMarks || []),
    }),
  );

  // Refs pour les valeurs qui persistent entre les renders
  const activeThumbIndexRef = useRef(0);
  const containerSizeRef = useRef({ height: 0, width: 0 });
  const thumbSizeRef = useRef({ height: 0, width: 0 });
  const trackSizeRef = useRef({ height: 0, width: 0 });
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
        const currentValue = updatedValues[i].__getValue();
        if (newValue !== currentValue && animateTransitions) {
          setCurrentValueAnimated(newValue, i);
        } else {
          setCurrentValue(newValue, i);
        }
      });
    }
  }, [value]);

  // Effet pour mettre à jour les trackMarks
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

  const getRawValues = useCallback(
    // eslint-disable-next-line
    (vals: (number | Animated.Value)[]) => vals.map(value => (value as any).__getValue()),
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
  // eslint-disable-next-line
  const getCurrentValue = useCallback((thumbIndex = 0) => (values[thumbIndex] as any).__getValue() || 0, [values]);

  const setCurrentValue = useCallback(
    (val: number, thumbIndex: number, callback: () => void) => {
      const safeIndex = thumbIndex ?? 0;
      const animatedValue = values[safeIndex];
      if (animatedValue) {
        animatedValue.setValue(val);
        if (callback) {
          callback();
        }
      } else {
        setValues(prevValues => {
          const newValues = [...prevValues];
          newValues[safeIndex] = new Animated.Value(val);
          return newValues;
        });
        if (callback) {
          callback();
        }
      }
    },
    [values],
  );

  const setCurrentValueAnimated = useCallback(
    (val: number, thumbIndex = 0) => {
      const animationConfigs = {
        ...DEFAULT_ANIMATION_CONFIGS[animationType],
        ...animationConfig,
        toValue: val,
        useNativeDriver: false,
      };
      const animatedValue =
        values[thumbIndex] instanceof Animated.Value
          ? values[thumbIndex]
          : new Animated.Value(values[thumbIndex] as number);
      Animated[animationType](animatedValue, animationConfigs).start();
    },
    [animationType, animationConfig, values],
  );

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
    if (allMeasured && thumbTouchSize) {
      size.width = Math.max(0, thumbTouchSize.width || 0 + thumbSize.width);
      size.height = Math.max(0, thumbTouchSize.height || 0 - containerSize.height);
    }
    return size;
  }, [allMeasured, thumbTouchSize, thumbSize, containerSize]);

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
      const hitThumb = values.find((_, i) => {
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
          const thumbDistances = values.map((_, index) => {
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

  const handleStartShouldSetPanResponder = useCallback(e => thumbHitTest(e), [thumbHitTest]);

  const handleMoveShouldSetPanResponder = useCallback(() => false, []);

  const handlePanResponderGrant = useCallback(
    e => {
      const { nativeEvent } = e;
      previousLeftRef.current = trackClickable
        ? nativeEvent.locationX - thumbSize.width
        : getThumbLeft(getCurrentValue(activeThumbIndexRef.current));
      if (props.thumbTouchSize) {
        previousLeftRef.current -= (props.thumbTouchSize.width - thumbSize.width) / 2;
      }
      props.onSlidingStart?.(getRawValues(values), activeThumbIndexRef.current);
    },
    [trackClickable, thumbSize, getThumbLeft, getCurrentValue, props, getRawValues, values],
  );

  const handlePanResponderMove = useCallback(
    (e, gestureState) => {
      if (props.disabled) {
        return;
      }
      setCurrentValue(getValue(gestureState), activeThumbIndexRef.current, () => {
        props.onValueChange?.(getRawValues(values), activeThumbIndexRef.current);
      });
    },
    [props.disabled, getValue, setCurrentValue, props, getRawValues, values],
  );

  const handlePanResponderRequestEnd = useCallback(() => false, []);

  const handlePanResponderEnd = useCallback(
    (e, gestureState) => {
      if (props.disabled) {
        return;
      }
      setCurrentValue(getValue(gestureState), activeThumbIndexRef.current, () => {
        if (trackClickable) {
          props.onValueChange?.(getRawValues(values), activeThumbIndexRef.current);
        }
        props.onSlidingComplete?.(getRawValues(values), activeThumbIndexRef.current);
      });
      activeThumbIndexRef.current = 0;
    },
    [props.disabled, getValue, setCurrentValue, trackClickable, props, getRawValues, values],
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

  const handleMeasure = useCallback((name: string, e: any) => {
    const { height, width } = e.nativeEvent.layout;
    const size = { height, width };

    if (name === '_containerSize') {
      const currentSize = containerSizeRef.current;
      if (currentSize && width === currentSize.width && height === currentSize.height) {
        return;
      }
      containerSizeRef.current = size;
      setContainerSize(size);
    } else if (name === '_thumbSize') {
      const currentSize = thumbSizeRef.current;
      if (currentSize && width === currentSize.width && height === currentSize.height) {
        return;
      }
      thumbSizeRef.current = size;
      setThumbSize(size);
    } else if (name === '_trackSize') {
      trackSizeRef.current = size;
    }

    if (containerSizeRef.current.width > 0 && thumbSizeRef.current.width > 0) {
      setAllMeasured(true);
    }
  }, []);

  const measureContainer = useCallback(e => handleMeasure('_containerSize', e), [handleMeasure]);
  const measureTrack = useCallback(e => handleMeasure('_trackSize', e), [handleMeasure]);
  const measureThumb = useCallback(e => handleMeasure('_thumbSize', e), [handleMeasure]);

  const renderDebugThumbTouchRect = useCallback(
    (thumbLeft, index) => {
      const { height, width, x, y } = getThumbTouchRect() || {};
      const positionStyle = { height, left: x, top: y, width };

      return (
        <Animated.View
          key={`debug-thumb-${index}`}
          pointerEvents="none"
          style={[defaultStyles.debugThumbTouchArea, positionStyle]}
        />
      );
    },
    [getThumbTouchRect],
  );

  const renderThumbImage = useCallback(
    (thumbIndex = 0) => {
      if (!props.thumbImage) {
        return null;
      }
      return <Image source={Array.isArray(props.thumbImage) ? props.thumbImage[thumbIndex] : props.thumbImage} />;
    },
    [props.thumbImage],
  );

  // Calculs pour le rendu
  const rightPadding = props.trackRightPadding ?? thumbSize.width;
  const _startFromZero = values.length === 1 && minimumValue < 0 && maximumValue > 0 ? startFromZero : false;

  const interpolatedThumbValues = values.map(value =>
    value.interpolate({
      inputRange: [minimumValue, maximumValue],
      outputRange: I18nManager.isRTL
        ? [0, -(containerSize.width - rightPadding)]
        : [0, containerSize.width - rightPadding],
    }),
  );

  const interpolatedTrackValues = values.map(value =>
    value.interpolate({
      inputRange: [minimumValue, maximumValue],
      outputRange: [0, containerSize.width - rightPadding],
    }),
  );

  const interpolatedTrackMarksValues =
    trackMarksValues &&
    trackMarksValues.map(v =>
      v.interpolate({
        inputRange: [minimumValue, maximumValue],
        outputRange: I18nManager.isRTL
          ? [0, -(containerSize.width - rightPadding)]
          : [0, containerSize.width - rightPadding],
      }),
    );

  const valueVisibleStyle = {};
  if (!allMeasured) {
    valueVisibleStyle.opacity = 0;
  }

  const _value = values[0].__getValue();
  const sliderWidthCoefficient = containerSize.width / (Math.abs(minimumValue) + Math.abs(maximumValue));
  const startPositionOnTrack = _startFromZero
    ? _value < 0 + step
      ? (_value + Math.abs(minimumValue)) * sliderWidthCoefficient
      : Math.abs(minimumValue) * sliderWidthCoefficient
    : 0;
  const minTrackWidth = _startFromZero
    ? Math.abs(_value) * sliderWidthCoefficient - thumbSize.width / 2
    : interpolatedTrackValues[0];
  const maxTrackWidth = interpolatedTrackValues[1];

  const clearBorderRadius = {};
  if (_startFromZero && _value < 0 + step) {
    clearBorderRadius.borderBottomRightRadius = 0;
    clearBorderRadius.borderTopRightRadius = 0;
  }
  if (_startFromZero && _value > 0) {
    clearBorderRadius.borderTopLeftRadius = 0;
    clearBorderRadius.borderBottomLeftRadius = 0;
  }

  const minimumTrackStyle = {
    backgroundColor: minimumTrackTintColor,
    left:
      interpolatedTrackValues.length === 1
        ? new Animated.Value(startPositionOnTrack)
        : Animated.add(minTrackWidth, thumbSize.width / 2),
    position: 'absolute',
    width:
      interpolatedTrackValues.length === 1
        ? Animated.add(minTrackWidth, thumbSize.width / 2)
        : Animated.add(Animated.multiply(minTrackWidth, -1), maxTrackWidth),
    ...valueVisibleStyle,
    ...clearBorderRadius,
  };

  const touchOverflowStyle = getTouchOverflowStyle();

  return (
    <>
      {props.renderAboveThumbComponent && (
        <Box style={defaultStyles.aboveThumbComponentsContainer}>
          {interpolatedThumbValues.map((interpolationValue, i) => {
            const animatedValue = values[i] || 0;
            const value = animatedValue instanceof Animated.Value ? animatedValue.__getValue() : animatedValue;
            return (
              <Animated.View
                key={`slider-above-thumb-${i}`}
                style={[
                  defaultStyles.renderThumbComponent,
                  {
                    bottom: 0,
                    left: thumbSize.width / 2,
                    transform: [{ translateX: interpolationValue }, { translateY: 0 }],
                    ...valueVisibleStyle,
                  },
                ]}
              >
                {props.renderAboveThumbComponent(i, value)}
              </Animated.View>
            );
          })}
        </Box>
      )}

      <Box
        {...restProps}
        onLayout={measureContainer}
        style={[defaultStyles.container, vertical ? { transform: [{ rotate: '-90deg' }] } : {}, props.containerStyle]}
      >
        <Box
          onLayout={measureTrack}
          renderToHardwareTextureAndroid
          style={[
            defaultStyles.track,
            { backgroundColor: maximumTrackTintColor },
            props.trackStyle,
            props.maximumTrackStyle,
          ]}
        >
          {props.renderMaximumTrackComponent ? props.renderMaximumTrackComponent() : null}
        </Box>

        <Animated.View
          renderToHardwareTextureAndroid
          style={[defaultStyles.track, props.trackStyle, minimumTrackStyle, props.minimumTrackStyle]}
        >
          {props.renderMinimumTrackComponent ? props.renderMinimumTrackComponent() : null}
        </Animated.View>

        {props.renderTrackMarkComponent &&
          interpolatedTrackMarksValues &&
          interpolatedTrackMarksValues.map((value, i) => (
            <Animated.View
              key={`track-mark-${i}`}
              style={[
                defaultStyles.renderThumbComponent,
                {
                  transform: [{ translateX: value }, { translateY: 0 }],
                  ...valueVisibleStyle,
                },
              ]}
            >
              {props.renderTrackMarkComponent(i)}
            </Animated.View>
          ))}

        {interpolatedThumbValues.map((value, i) => (
          <Animated.View
            key={`slider-thumb-${i}`}
            onLayout={measureThumb}
            style={[
              props.renderThumbComponent ? defaultStyles.renderThumbComponent : defaultStyles.thumb,
              props.renderThumbComponent
                ? {}
                : {
                    backgroundColor: thumbTintColor,
                    ...props.thumbStyle,
                  },
              {
                transform: [{ translateX: value }, { translateY: 0 }],
                ...valueVisibleStyle,
              },
            ]}
          >
            {props.renderThumbComponent
              ? Array.isArray(props.renderThumbComponent)
                ? props.renderThumbComponent[i](i)
                : props.renderThumbComponent(i)
              : renderThumbImage(i)}
          </Animated.View>
        ))}

        <Box style={[defaultStyles.touchArea, touchOverflowStyle]} {...panResponder.panHandlers}>
          {!!debugTouchArea && interpolatedThumbValues.map((value, i) => renderDebugThumbTouchRect(value, i))}
        </Box>
      </Box>

      {props.renderBelowThumbComponent && (
        <Box style={defaultStyles.belowThumbComponentsContainer}>
          {interpolatedThumbValues.map((interpolationValue, i) => {
            const animatedValue = values[i] || 0;
            const value = animatedValue instanceof Animated.Value ? animatedValue.__getValue() : animatedValue;
            return (
              <Animated.View
                key={`slider-below-thumb-${i}`}
                style={[
                  defaultStyles.renderThumbComponent,
                  {
                    left: thumbSize.width / 2,
                    top: 0,
                    transform: [{ translateX: interpolationValue }, { translateY: 0 }],
                    ...valueVisibleStyle,
                  },
                ]}
              >
                {props.renderBelowThumbComponent(i, value)}
              </Animated.View>
            );
          })}
        </Box>
      )}
    </>
  );
}

Slider.displayName = 'Slider';

export default Slider;
