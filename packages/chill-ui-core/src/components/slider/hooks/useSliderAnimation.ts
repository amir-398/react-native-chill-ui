import { useCallback } from 'react';
import { Animated } from 'react-native';

import DEFAULT_ANIMATION_CONFIGS from '../utils/constants';

export const useSliderAnimation = (
  values: (number | Animated.Value)[],
  setValues: React.Dispatch<React.SetStateAction<Animated.Value[]>>,
  animationType: 'spring' | 'timing',
  animationConfig: Partial<Animated.TimingAnimationConfig | Animated.SpringAnimationConfig>,
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

      // Safely start animation (handles test environments)
      try {
        Animated[animationType](animatedValue as Animated.Value, animationConfigs).start();
      } catch {
        // In test environments or if animation fails, just set the value directly
        if (animatedValue instanceof Animated.Value && typeof (animatedValue as any).setValue === 'function') {
          (animatedValue as Animated.Value).setValue(val);
        }
      }
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
