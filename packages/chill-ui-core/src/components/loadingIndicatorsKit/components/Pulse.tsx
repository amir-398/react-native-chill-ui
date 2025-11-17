import { Easing } from 'react-native';
import { LoadingIndicatorsProps } from '@types';
import { AnimatedBox } from '@components/animatedBox';

import { loop } from '../utils/utils';
import defaultProps from '../utils/defaultProps';
import AnimationContainer from './AnimationContainer';

/**
 * Pulse loading indicator component.
 * Displays a single circle with pulsing scale animation.
 * Creates a smooth pulsing effect that scales in and out continuously.
 *
 * @example
 * ```tsx
 * <Pulse
 *   size={40}
 *   color="#007AFF"
 *   animating={isLoading}
 * />
 * ```
 *
 * @param size - Size of the loading indicator (default: 40)
 * @param color - Color of the pulsing circle (default: '#000')
 * @param animating - Whether the animation is running (default: true)
 * @param hidesWhenStopped - Whether to hide when animation stops (default: true)
 * @param style - Custom style object for the container
 * @returns Pulse loading animation with scaling circle
 */
export default function Pulse(props: LoadingIndicatorsProps) {
  const {
    animating = defaultProps.animating,
    color = defaultProps.color,
    hidesWhenStopped = defaultProps.hidesWhenStopped,
    size = defaultProps.size,
    style,
    ...rest
  } = props;
  return (
    <AnimationContainer
      initAnimation={() => ({
        pulse: value => ({
          animation: loop({
            duration: 1200,
            easing: Easing.bezier(0.455, 0.03, 0.515, 0.955),
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
              backgroundColor: color,
              borderRadius: size / 2,
              height: size,
              opacity: (() => {
                if (!animating && hidesWhenStopped) return 0;
                if (!values?.pulse) return 1;
                return values.pulse[0]?.interpolate({
                  inputRange: [0, 100],
                  outputRange: [1, 0],
                });
              })(),
              transform: [
                {
                  scale: values?.pulse
                    ? values?.pulse[0]?.interpolate({
                        inputRange: [0, 100],
                        outputRange: [0.01, 1],
                      })
                    : 1,
                },
              ],
              width: size,
            },
            style,
          ]}
          {...rest}
        />
      )}
    </AnimationContainer>
  );
}
