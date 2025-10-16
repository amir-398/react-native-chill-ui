import { createContext, useContext } from 'react';
import { Animated, PanResponderInstance } from 'react-native';

export interface SliderStateContextValue {
  allMeasured: boolean;
  containerSize: { width: number; height: number };
  disabled: boolean;
  interpolatedThumbValues: Animated.AnimatedInterpolation<number>[];
  interpolatedTrackValues: Animated.AnimatedInterpolation<number>[];
  isSliding: boolean;
  maximumValue: number;
  minimumValue: number;
  orientation: 'horizontal' | 'vertical';
  step: number;
  thumbSize: { width: number; height: number };
  thumbTouchSize: { width: number; height: number };
  trackClickable: boolean;
  values: (number | Animated.Value)[];
  valueVisibleStyle: { opacity?: number };
}

export interface SliderActionsContextValue {
  getMinimumTrackStyle: () => {
    left: Animated.Value | Animated.AnimatedAddition<number>;
    width: Animated.AnimatedAddition<number>;
    opacity?: number;
  };
  getTouchOverflowSize: () => { width: number; height: number };
  measureContainer: (e: { nativeEvent: { layout: { width: number; height: number } } }) => void;
  measureThumb: (e: { nativeEvent: { layout: { width: number; height: number } } }) => void;
  measureTrack: (e: { nativeEvent: { layout: { width: number; height: number } } }) => void;
  onSlidingComplete?: (values: number[], activeThumbIndex: number) => void;
  onSlidingStart?: (values: number[], activeThumbIndex: number) => void;
  onValueChange?: (values: number[], activeThumbIndex: number) => void;
  panResponder: PanResponderInstance | null;
  setThumbTouchSize: (size: number) => void;
  setTrackClickable: (clickable: boolean) => void;
}

export const SliderStateContext = createContext<SliderStateContextValue>({
  allMeasured: false,
  containerSize: { height: 0, width: 0 },
  disabled: false,
  interpolatedThumbValues: [],
  interpolatedTrackValues: [],
  isSliding: false,
  maximumValue: 1,
  minimumValue: 0,
  orientation: 'horizontal',
  step: 0,
  thumbSize: { height: 0, width: 0 },
  thumbTouchSize: { height: 40, width: 40 },
  trackClickable: true,
  values: [],
  valueVisibleStyle: {},
});

export const SliderActionsContext = createContext<SliderActionsContextValue>({
  getMinimumTrackStyle: () => ({
    left: new Animated.Value(0),
    width: new Animated.Value(0),
  }),
  getTouchOverflowSize: () => ({ height: 40, width: 40 }),
  measureContainer: () => {},
  measureThumb: () => {},
  measureTrack: () => {},
  onSlidingComplete: undefined,
  onSlidingStart: undefined,
  onValueChange: undefined,
  panResponder: null,
  setThumbTouchSize: () => {},
  setTrackClickable: () => {},
});

export const useSliderState = () => {
  const context = useContext(SliderStateContext);
  if (!context) {
    throw new Error('useSliderState must be used within SliderProvider');
  }
  return context;
};

export const useSliderActions = () => {
  const context = useContext(SliderActionsContext);
  if (!context) {
    throw new Error('useSliderActions must be used within SliderProvider');
  }
  return context;
};
