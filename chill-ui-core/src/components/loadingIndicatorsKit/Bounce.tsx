import { Animated, ViewStyle } from 'react-native';

import { Box } from '../box';
import { stagger } from './utils';
import defaultProps from './defaultProps';
import AnimationContainer from './AnimationContainer';
import { LoadingIndicatorsProps } from '../../types/loadingIndicator.types';

export default function Bounce(props: LoadingIndicatorsProps) {
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
    borderRadius: size / 2,
    height: size,
    opacity: 0.6,
    position: 'absolute',
    width: size,
  };

  return (
    <AnimationContainer
      initAnimation={() => ({
        bounce: value =>
          stagger(1000, 2, {
            duration: 2000,
            keyframes: [0, 45, 55, 100],
            value,
          }),
      })}
      animating={animating}
    >
      {values => (
        <Box
          style={[
            {
              height: size,
              opacity: !animating && hidesWhenStopped ? 0 : 1,
              width: size,
            },
            style,
          ]}
          {...rest}
        >
          {values?.bounce?.map((value, index) => (
            <Animated.View
              key={index}
              style={[
                circleStyle,
                {
                  transform: [
                    {
                      scale: value.interpolate({
                        inputRange: [0, 45, 55, 100],
                        outputRange: [0.01, 1, 1, 0.01],
                      }),
                    },
                  ],
                },
              ]}
            />
          ))}
        </Box>
      )}
    </AnimationContainer>
  );
}
