import { createContext, useContext } from 'react';
import { Animated, PanResponderInstance } from 'react-native';

export interface SliderStateContextValue {
  step: number;
  disabled: boolean;
  isSliding: boolean;
  allMeasured: boolean;
  minimumValue: number;
  maximumValue: number;
  trackClickable: boolean;
  values: (number | Animated.Value)[];
  orientation: 'horizontal' | 'vertical';
  valueVisibleStyle: { opacity?: number };
  interpolatedThumbValues: Animated.Value[];
  interpolatedTrackValues: Animated.Value[];
  thumbSize: { width: number; height: number };
  containerSize: { width: number; height: number };
  thumbTouchSize: { width: number; height: number };
}

export interface SliderActionsContextValue {
  measureTrack: (e: any) => void;
  measureThumb: (e: any) => void;
  getMinimumTrackStyle: () => any;
  measureContainer: (e: any) => void;
  setThumbTouchSize: (size: number) => void;
  panResponder: PanResponderInstance | null;
  setTrackClickable: (clickable: boolean) => void;
  getTouchOverflowSize: () => { width: number; height: number };
  onValueChange?: (values: number[], activeThumbIndex: number) => void;
  onSlidingStart?: (values: number[], activeThumbIndex: number) => void;
  onSlidingComplete?: (values: number[], activeThumbIndex: number) => void;
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
  getMinimumTrackStyle: () => ({}),
  getTouchOverflowSize: () => ({ height: 40, width: 40 }),
  measureContainer: () => {},
  measureThumb: () => {},
  measureTrack: () => {},
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
