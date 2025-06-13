import { useCallback } from 'react';
import { Animated } from 'react-native';

import DEFAULT_ANIMATION_CONFIGS from '../constants';

const useSliderAnimation = (
  values: (number | Animated.Value)[],
  setValues: (val: any) => void,
  animationType: 'spring' | 'timing',
  animationConfig: any,
) => {
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

  const setCurrentValue = useCallback(
    (val: number, thumbIndex: number, callback?: () => void) => {
      const safeIndex = thumbIndex ?? 0;
      const animatedValue = values[safeIndex];
      if (animatedValue) {
        (animatedValue as Animated.Value).setValue(val);
        if (callback) {
          callback();
        }
      } else {
        setValues((prevValues: any) => {
          const newValues = [...prevValues];
          newValues[safeIndex] = new Animated.Value(val);
          return newValues;
        });
        if (callback) {
          callback();
        }
      }
    },
    [values, setValues],
  );

  return {
    setCurrentValue,
    setCurrentValueAnimated,
  };
};

export default useSliderAnimation;
