/* eslint-disable */

import * as React from 'react';
import { Animated } from 'react-native';

interface AnimationNode {
  animation: Animated.CompositeAnimation;
  values: Animated.AnimatedInterpolation<string | number>[];
}

export interface Props<T extends string> {
  animating: boolean;
  initAnimation: () => Record<T, (value: Animated.Value) => AnimationNode>;
  children: (interpolationsByKey: Record<T, Animated.AnimatedInterpolation<string | number>[]>) => React.ReactNode;
}

export default class AnimationContainer<T extends string> extends React.Component<Props<T>> {
  animation: Animated.CompositeAnimation;

  animatedValuesByKey: Record<T, Animated.Value> = {} as Record<T, Animated.Value>;

  interpolationsByKey: Record<T, Animated.AnimatedInterpolation<string | number>[]> = {} as Record<
    T,
    Animated.AnimatedInterpolation<string | number>[]
  >;

  static defaultProps = {
    animating: true,
  };

  constructor(props: Props<T>) {
    super(props);
    const { initAnimation } = props;

    const animationInitializersByKey = initAnimation();
    const animations: Animated.CompositeAnimation[] = [];

    for (const key in animationInitializersByKey) {
      const animationInitializer = animationInitializersByKey[key];
      const animationValue = new Animated.Value(0);
      this.animatedValuesByKey[key] = animationValue;
      const { animation, values } = animationInitializer(animationValue);
      animations.push(animation);
      this.interpolationsByKey[key] = values;
    }

    if (animations.length === 1) {
      this.animation = animations[0];
    } else {
      this.animation = Animated.parallel(animations);
    }
  }

  override componentDidMount() {
    if (this.props.animating) {
      this.startAnimation();
    }
  }

  override componentDidUpdate(prevProps: Props<T>) {
    const { animating } = this.props;

    if (animating !== prevProps.animating) {
      if (animating) {
        this.startAnimation();
      } else {
        this.stopAnimation();
      }
    }
  }

  startAnimation = () => {
    this.animation.start();
  };

  stopAnimation = () => {
    this.animation.reset();

    for (const key in this.animatedValuesByKey) {
      this.animatedValuesByKey[key].setValue(0);
    }
  };

  override componentWillUnmount() {
    this.animation.stop();
  }

  override render() {
    const { children } = this.props;
    return children ? children(this.interpolationsByKey) : null;
  }
}
