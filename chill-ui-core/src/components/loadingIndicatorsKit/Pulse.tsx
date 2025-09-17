import { Animated, Easing } from 'react-native';

import { loop } from './utils';
import defaultProps from './defaultProps';
import AnimationContainer from './AnimationContainer';
import { LoadingIndicatorsProps } from '../../types/loadingIndicator.types';

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
        <Animated.View
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
