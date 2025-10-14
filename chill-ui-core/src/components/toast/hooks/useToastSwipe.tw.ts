import { useRef } from 'react';
import { Animated, PanResponder } from 'react-native';

import { UseToastSwipeOptionsProps } from '../types/toast.tw.types';

export const useToastSwipe = ({ enabled = true, onDismiss, position, threshold = 50 }: UseToastSwipeOptionsProps) => {
  const swipeY = useRef(new Animated.Value(0)).current;
  const isDismissing = useRef(false);

  const panResponder = useRef(
    PanResponder.create({
      onMoveShouldSetPanResponder: (_, gestureState) => {
        if (!enabled) return false;

        const absY = Math.abs(gestureState.dy);
        const absX = Math.abs(gestureState.dx);

        return absY > absX && absY > 5;
      },
      onPanResponderMove: (_, gestureState) => {
        if (!enabled || isDismissing.current) return;

        if (position === 'top' && gestureState.dy < 0) {
          swipeY.setValue(gestureState.dy);
        } else if (position === 'bottom' && gestureState.dy > 0) {
          swipeY.setValue(gestureState.dy);
        }
      },
      onPanResponderRelease: (_, gestureState) => {
        if (!enabled || isDismissing.current) return;

        const shouldDismiss =
          (position === 'top' && gestureState.dy < -threshold) ||
          (position === 'bottom' && gestureState.dy > threshold);

        if (shouldDismiss) {
          isDismissing.current = true;

          const targetY = position === 'top' ? -300 : 300;

          Animated.timing(swipeY, {
            duration: 200,
            toValue: targetY,
            useNativeDriver: true,
          }).start(() => {
            onDismiss();
          });
        } else {
          Animated.spring(swipeY, {
            friction: 8,
            tension: 100,
            toValue: 0,
            useNativeDriver: true,
          }).start();
        }
      },
      onPanResponderTerminate: () => {
        if (!enabled || isDismissing.current) return;

        // Revenir à la position initiale si le geste est annulé
        Animated.spring(swipeY, {
          friction: 8,
          tension: 100,
          toValue: 0,
          useNativeDriver: true,
        }).start();
      },
      onStartShouldSetPanResponder: () => enabled,
    }),
  ).current;

  return {
    panResponder,
    swipeY,
  };
};
