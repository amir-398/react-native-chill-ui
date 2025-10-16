import { LoadingIndicatorsProps } from '@types';
import { Easing, ViewStyle } from 'react-native';
import { AnimatedBox } from '@components/animatedBox';

import { loop } from '../utils/utils';
import defaultProps from '../utils/defaultProps';
import AnimationContainer from './AnimationContainer';

/**
 * Wander loading indicator component.
 * Displays two circles that wander around each other in a complex pattern.
 * Creates an organic wandering motion with intersecting circular paths.
 *
 * @example
 * ```tsx
 * <Wander
 *   size={40}
 *   color="#007AFF"
 *   animating={isLoading}
 * />
 * ```
 *
 * @param size - Size of the loading indicator (default: 40)
 * @param color - Color of the wandering circles (default: '#000')
 * @param animating - Whether the animation is running (default: true)
 * @param hidesWhenStopped - Whether to hide when animation stops (default: true)
 * @param style - Custom style object for the container
 * @returns Wander loading animation with two intersecting circles
 */
export default function Wander(props: LoadingIndicatorsProps) {
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
        <AnimatedBox
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
          <AnimatedBox
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
          <AnimatedBox
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
        </AnimatedBox>
      )}
    </AnimationContainer>
  );
}
