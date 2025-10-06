import { Animated, Easing } from 'react-native';
import { LoadingIndicatorsProps } from '@types';

import { loop } from '../utils/utils';
import defaultProps from '../utils/defaultProps';
import AnimationContainer from './AnimationContainer';

/**
 * Swing loading indicator component.
 * Displays two circles with swinging pendulum-like animation.
 * Creates a smooth swinging motion that alternates between circles.
 *
 * @example
 * ```tsx
 * <Swing
 *   size={40}
 *   color="#007AFF"
 *   animating={isLoading}
 * />
 * ```
 *
 * @param size - Size of the loading indicator (default: 40)
 * @param color - Color of the swinging circles (default: '#000')
 * @param animating - Whether the animation is running (default: true)
 * @param hidesWhenStopped - Whether to hide when animation stops (default: true)
 * @param style - Custom style object for the container
 * @returns Swing loading animation with two pendulum circles
 */
export default function Swing(props: LoadingIndicatorsProps) {
  const {
    animating = defaultProps.animating,
    color = defaultProps.color,
    hidesWhenStopped = defaultProps.hidesWhenStopped,
    size = defaultProps.size,
    style,
    ...rest
  } = props;
  const circleStyle = {
    backgroundColor: color,
    borderRadius: (size * 0.45) / 2,
    height: size * 0.45,
    width: size * 0.45,
  };

  return (
    <AnimationContainer
      initAnimation={() => ({
        swing: value => ({
          animation: loop({
            duration: 1800,
            easing: Easing.linear,
            keyframes: [0, 100],
            value,
          }),
          values: [value],
        }),
        swingDot: value => ({
          animation: loop({
            duration: 2000,
            keyframes: [0, 50, 100],
            value,
          }),
          values: [value],
        }),
      })}
      animating={animating}
    >
      {values => (
        <Animated.View
          style={[
            {
              alignItems: 'center',
              height: size,
              justifyContent: 'space-between',
              opacity: !animating && hidesWhenStopped ? 0 : 1,
              transform: [
                {
                  rotate: values?.swing
                    ? values?.swing[0]?.interpolate({
                        inputRange: [0, 100],
                        outputRange: ['0deg', '360deg'],
                      })
                    : '0deg',
                },
              ],
              width: size,
            },
            style,
          ]}
          {...rest}
        >
          <Animated.View
            style={[
              circleStyle,
              {
                transform: [
                  {
                    scale: values?.swingDot
                      ? values?.swingDot[0]?.interpolate({
                          inputRange: [0, 50, 100],
                          outputRange: [0.2, 1, 0.2],
                        })
                      : 1,
                  },
                ],
              },
            ]}
          />
          <Animated.View
            style={[
              circleStyle,
              {
                transform: [
                  {
                    scale: values?.swingDot
                      ? values?.swingDot[0]?.interpolate({
                          inputRange: [0, 50, 100],
                          outputRange: [1, 0.2, 1],
                        })
                      : 1,
                  },
                ],
              },
            ]}
          />
        </Animated.View>
      )}
    </AnimationContainer>
  );
}
