import { useRef, useCallback } from 'react';
import { Animated, Easing, Dimensions } from 'react-native';

export type ToastPosition = 'top' | 'bottom';

const ANIMATION_DURATION = 500;
const DEFAULT_POSITION_OFFSET = 300;

export const useToastAnimation = () => {
  const screenWidth = Dimensions.get('window').width;

  // Valeurs animées natives avec useRef
  const translateYAnim = useRef(new Animated.Value(DEFAULT_POSITION_OFFSET)).current;
  const opacityAnim = useRef(new Animated.Value(0)).current;
  const scaleAnim = useRef(new Animated.Value(0.8)).current;
  const progressWidthAnim = useRef(new Animated.Value(0)).current;
  const isAnimating = useRef(new Animated.Value(0)).current;

  const hideToast = useCallback(
    (position: ToastPosition) => {
      const offset = position === 'top' ? -DEFAULT_POSITION_OFFSET : DEFAULT_POSITION_OFFSET;

      return new Promise<void>(resolve => {
        Animated.parallel([
          Animated.timing(opacityAnim, {
            duration: ANIMATION_DURATION,
            easing: Easing.in(Easing.cubic),
            toValue: 0,
            useNativeDriver: true,
          }),
          Animated.timing(translateYAnim, {
            duration: ANIMATION_DURATION,
            easing: Easing.in(Easing.cubic),
            toValue: offset,
            useNativeDriver: true,
          }),
          Animated.timing(scaleAnim, {
            duration: ANIMATION_DURATION,
            easing: Easing.in(Easing.cubic),
            toValue: 0.8,
            useNativeDriver: true,
          }),
        ]).start(() => {
          isAnimating.setValue(0);
          resolve();
        });
      });
    },
    [opacityAnim, translateYAnim, scaleAnim, isAnimating],
  );

  const showToast = useCallback(
    (position: ToastPosition, duration: number) => {
      // @ts-ignore
      // eslint-disable-next-line
      if (isAnimating._value === 1) return Promise.resolve();

      isAnimating.setValue(1);

      // Reset values
      translateYAnim.setValue(position === 'top' ? -DEFAULT_POSITION_OFFSET : DEFAULT_POSITION_OFFSET);
      opacityAnim.setValue(0);
      scaleAnim.setValue(0.8);
      progressWidthAnim.setValue(0);

      return new Promise<void>(resolve => {
        // Animation d'entrée
        Animated.parallel([
          Animated.timing(opacityAnim, {
            duration: ANIMATION_DURATION,
            easing: Easing.out(Easing.cubic),
            toValue: 1,
            useNativeDriver: true,
          }),
          Animated.timing(translateYAnim, {
            duration: ANIMATION_DURATION,
            easing: Easing.out(Easing.cubic),
            toValue: 0,
            useNativeDriver: true,
          }),
          Animated.timing(scaleAnim, {
            duration: ANIMATION_DURATION,
            easing: Easing.out(Easing.cubic),
            toValue: 1,
            useNativeDriver: true,
          }),
        ]).start();

        // Animation de la barre de progression
        Animated.timing(progressWidthAnim, {
          duration,
          easing: Easing.linear,
          toValue: screenWidth,
          useNativeDriver: false, // Width ne peut pas être natif
        }).start(() => {
          resolve();
        });
      });
    },
    [screenWidth, translateYAnim, opacityAnim, scaleAnim, progressWidthAnim, isAnimating],
  );

  return {
    hideToast,
    opacityAnim,
    progressWidthAnim,
    scaleAnim,
    showToast,
    translateYAnim,
  };
};
