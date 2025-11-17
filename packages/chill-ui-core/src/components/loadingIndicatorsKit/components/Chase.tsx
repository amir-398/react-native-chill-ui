import { LoadingIndicatorsProps } from '@types';
import { Easing, ViewStyle } from 'react-native';
import { AnimatedBox } from '@components/animatedBox';

import { loop, stagger } from '../utils/utils';
import defaultProps from '../utils/defaultProps';
import AnimationContainer from './AnimationContainer';

/**
 * Chase loading indicator component.
 * Displays six dots arranged in a circle with a chasing animation effect.
 * Creates a rotating chase motion where dots appear and disappear in sequence.
 *
 * @example
 * ```tsx
 * <Chase
 *   size={40}
 *   color="#007AFF"
 *   animating={isLoading}
 * />
 * ```
 *
 * @param size - Size of the loading indicator (default: 40)
 * @param color - Color of the chasing dots (default: '#000')
 * @param animating - Whether the animation is running (default: true)
 * @param hidesWhenStopped - Whether to hide when animation stops (default: true)
 * @param style - Custom style object for the container
 * @returns Chase loading animation with six rotating dots
 */
export default function Chase(props: LoadingIndicatorsProps) {
  const {
    animating = defaultProps.animating,
    color = defaultProps.color,
    hidesWhenStopped = defaultProps.hidesWhenStopped,
    size = defaultProps.size,
    style,
    ...rest
  } = props;

  const circleStyle: ViewStyle = {
    backgroundColor: color,
    borderRadius: size / 8,
    height: size / 4,
    position: 'absolute',
    width: size / 4,
  };

  return (
    <AnimationContainer
      initAnimation={() => ({
        chase: value => ({
          animation: loop({
            duration: 2500,
            easing: Easing.linear,
            value,
          }),
          values: [value],
        }),
        chaseDot: value =>
          stagger(100, 6, {
            duration: 2000,
            keyframes: [0, 80, 100],
            value,
          }),
        chaseDotBefore: value =>
          stagger(100, 6, {
            duration: 2000,
            keyframes: [0, 50, 100],
            value,
          }),
      })}
      animating={animating}
    >
      {values => (
        <AnimatedBox
          style={[
            {
              alignItems: 'center',
              height: size,
              justifyContent: 'center',
              opacity: !animating && hidesWhenStopped ? 0 : 1,
              transform: [
                {
                  rotate: values?.chase
                    ? values?.chase[0]?.interpolate({
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
          {values?.chaseDot?.map((value, index) => (
            <AnimatedBox
              key={index}
              style={[
                circleStyle,
                {
                  transform: [
                    {
                      rotate: value.interpolate({
                        inputRange: [0, 80, 100],
                        outputRange: ['0deg', '360deg', '360deg'],
                      }),
                    },
                    { translateY: -size / 2 + size / 8 },
                    {
                      scale: values.chaseDotBefore[index].interpolate({
                        inputRange: [0, 50, 100],
                        outputRange: [1, 0.4, 1],
                      }),
                    },
                  ],
                },
              ]}
            />
          ))}
        </AnimatedBox>
      )}
    </AnimationContainer>
  );
}
