import { Animated, ViewStyle } from 'react-native';

import { Box } from '../box';
import { stagger } from './utils';
import defaultProps from './defaultProps';
import AnimationContainer from './AnimationContainer';
import { LoadingIndicatorsProps } from '../../types/loadingIndicator.types';

export default function CircleFade(props: LoadingIndicatorsProps) {
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
    borderRadius: (size * 0.15) / 2,
    height: size * 0.15,
    position: 'absolute',
    width: size * 0.15,
  };

  return (
    <AnimationContainer
      initAnimation={() => ({
        circleFade: value =>
          stagger(100, 12, {
            duration: 1200,
            keyframes: [0, 39, 40, 100],
            value,
          }),
      })}
      animating={animating}
    >
      {values => (
        <Box
          style={[
            {
              alignItems: 'center',
              height: size,
              justifyContent: 'center',
              opacity: !animating && hidesWhenStopped ? 0 : 1,
              width: size,
            },
            style,
          ]}
          {...rest}
        >
          {values?.circleFade?.map((value, index) => (
            <Animated.View
              key={index}
              style={[
                circleStyle,
                {
                  opacity: value.interpolate({
                    inputRange: [0, 39, 40, 100],
                    outputRange: [0, 0, 1, 0],
                  }),
                  transform: [
                    {
                      rotate: `${index * 30}deg`,
                    },
                    { translateY: -size / 2 + (size * 0.15) / 2 },
                    {
                      scale: value.interpolate({
                        inputRange: [0, 39, 40, 100],
                        outputRange: [0.6, 0.6, 1, 0.6],
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
