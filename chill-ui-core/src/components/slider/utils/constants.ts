import { Easing } from 'react-native';

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

export default DEFAULT_ANIMATION_CONFIGS;
