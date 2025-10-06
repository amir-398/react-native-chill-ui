import { EasingFunction, Easing, Animated, Platform } from 'react-native';

function createKeyframeEasingFunction(keyframes: number[], easing: EasingFunction) {
  return (t: number) => {
    for (let keyframeIndex = 1; keyframeIndex < keyframes.length; keyframeIndex += 1) {
      if (t < keyframes[keyframeIndex] / 100) {
        const prev = keyframes[keyframeIndex - 1] / 100;
        const current = (keyframes[keyframeIndex] - keyframes[keyframeIndex - 1]) / 100;

        return prev + easing((t - prev) / current) * current;
      }
    }
    return t;
  };
}

interface AnimationConfig {
  duration: number;
  toValue?: number;
  keyframes?: number[];
  value: Animated.Value;
  easing?: EasingFunction;
}

function loop({
  duration,
  easing = Easing.bezier(0.42, 0.0, 0.58, 1.0),
  keyframes = [0, 100],
  toValue = 100,
  value,
}: AnimationConfig) {
  const timing = Animated.timing(value, {
    duration,
    easing: createKeyframeEasingFunction(keyframes, easing),
    toValue,
    useNativeDriver: Platform.OS !== 'web',
  });

  return Animated.loop(timing);
}

function stagger(time: number, amount: number, animationConfig: AnimationConfig) {
  const {
    duration,
    easing = Easing.bezier(0.42, 0.0, 0.58, 1.0),
    keyframes = [0, 100],
    toValue = 100,
    value,
  } = animationConfig;
  const easingFunction = createKeyframeEasingFunction(keyframes, easing);

  if (Platform.OS === 'web') {
    const values = new Array(amount).fill(null).map(_ => new Animated.Value(0));

    const animations = values.map(animatedValue =>
      loop({
        duration,
        easing,
        keyframes,
        toValue,
        value: animatedValue,
      }),
    );

    const animation = Animated.stagger(time, animations);

    return { animation, values };
  }

  const timing = Animated.timing(value, {
    duration,
    easing: easingFunction,
    toValue,
    useNativeDriver: true,
  });

  const animation = Animated.loop(timing);

  const frameDuration = 1000.0 / 60.0;
  const inputRange: number[] = [];
  const numFrames = Math.round(animationConfig.duration / frameDuration);

  for (let frame = 0; frame < numFrames; frame += 1) {
    inputRange.push(easingFunction(frame / numFrames) * 100);
  }

  const values = [];
  for (let index = amount - 1; index >= 0; index -= 1) {
    const delayedFrames = Math.round(((index * time) / animationConfig.duration) * numFrames);
    const outputRange = inputRange.slice(delayedFrames).concat(inputRange.slice(0, delayedFrames));

    const animatedValue =
      index === 0 ? animationConfig.value : animationConfig.value.interpolate({ inputRange, outputRange });
    values.push(animatedValue);
  }

  return { animation, values };
}

export { loop, stagger, type AnimationConfig };
