import { Animated, Easing } from 'react-native';

import { Box } from '../box';
import { stagger } from './utils';
import AnimationContainer from './AnimationContainer';
import { LoadingIndicatorsProps } from '../../types/loadingIndicator.types';

export const defaultProps = {
  animating: true,
  color: '#000',
  hidesWhenStopped: true,
  size: 48,
};

export default function Flow(props: LoadingIndicatorsProps) {
  const {
    animating = defaultProps.animating,
    color = defaultProps.color,
    hidesWhenStopped = defaultProps.hidesWhenStopped,
    size = defaultProps.size,
    style,
    ...rest
  } = props;

  const initializeAnimation = () => ({
    flow: (value: Animated.Value) =>
      stagger(150, 3, {
        duration: 1400,
        easing: Easing.bezier(0.455, 0.03, 0.515, 0.955),
        keyframes: [0, 40, 80, 100],
        value,
      }),
  });

  return (
    <AnimationContainer initAnimation={initializeAnimation} animating={animating}>
      {values => (
        <Box
          style={[
            {
              flexDirection: 'row',
              height: size * 0.25,
              justifyContent: 'space-between',
              opacity: !animating && hidesWhenStopped ? 0 : 1,
              width: size,
            },
            style,
          ]}
          {...rest}
        >
          {values.flow.map((value, index) => (
            <Animated.View
              key={index}
              style={{
                backgroundColor: color,
                borderRadius: (size * 0.25) / 2,
                height: size * 0.25,
                transform: [
                  {
                    scale: value.interpolate({
                      inputRange: [0, 40, 80, 100],
                      outputRange: [0.3, 1, 0.3, 0.3],
                    }),
                  },
                ],
                width: size * 0.25,
              }}
            />
          ))}
        </Box>
      )}
    </AnimationContainer>
  );
}
