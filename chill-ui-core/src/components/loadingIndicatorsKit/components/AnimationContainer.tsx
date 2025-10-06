/* eslint-disable */

import * as React from 'react';
import { Animated } from 'react-native';

/**
 * Interface for animation node containing animation and interpolated values
 */
interface AnimationNode {
  /** The composite animation object */
  animation: Animated.CompositeAnimation;
  /** Array of interpolated animated values */
  values: Animated.AnimatedInterpolation<string | number>[];
}

/**
 * Props for the AnimationContainer component
 */
export interface Props<T extends string> {
  /** Whether the animation is currently running */
  animating: boolean;
  /** Function to initialize animations for each key */
  initAnimation: () => Record<T, (value: Animated.Value) => AnimationNode>;
  /** Render function that receives interpolated values by key */
  children: (interpolationsByKey: Record<T, Animated.AnimatedInterpolation<string | number>[]>) => React.ReactNode;
}

/**
 * AnimationContainer component that manages complex animations with multiple animated values.
 * Provides a flexible way to create custom loading animations with React Native Animated API.
 * Handles animation lifecycle, cleanup, and provides interpolated values to children.
 *
 * @example
 * ```tsx
 * <AnimationContainer
 *   animating={isLoading}
 *   initAnimation={() => ({
 *     rotation: (value) => ({
 *       animation: Animated.loop(
 *         Animated.timing(value, {
 *           toValue: 1,
 *           duration: 1000,
 *           useNativeDriver: true,
 *         })
 *       ),
 *       values: [
 *         value.interpolate({
 *           inputRange: [0, 1],
 *           outputRange: ['0deg', '360deg'],
 *         }),
 *       ],
 *     }),
 *   })}
 * >
 *   {({ rotation }) => (
 *     <Animated.View style={{ transform: [{ rotate: rotation[0] }] }}>
 *       <Text>Rotating Text</Text>
 *     </Animated.View>
 *   )}
 * </AnimationContainer>
 * ```
 *
 * @template T - Type parameter for animation keys
 * @param animating - Whether the animation is currently running
 * @param initAnimation - Function that returns animation initializers for each key
 * @param children - Render function that receives interpolated values
 * @returns AnimationContainer component that manages complex animations
 */
export default class AnimationContainer<T extends string> extends React.Component<Props<T>> {
  /** The composite animation object */
  animation: Animated.CompositeAnimation;

  /** Animated values indexed by key */
  animatedValuesByKey: Record<T, Animated.Value> = {} as Record<T, Animated.Value>;

  /** Interpolated values indexed by key */
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

  /**
   * Starts the animation loop
   */
  startAnimation = () => {
    this.animation.start();
  };

  /**
   * Stops the animation and resets all values to 0
   */
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
