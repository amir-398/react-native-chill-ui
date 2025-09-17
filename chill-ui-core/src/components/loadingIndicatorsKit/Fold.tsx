import { Animated, Easing } from 'react-native';

import { Box } from '../box';
import { stagger } from './utils';
import defaultProps from './defaultProps';
import AnimationContainer from './AnimationContainer';
import { LoadingIndicatorsProps } from '../../types/loadingIndicator.types';

export default function Fold(props: LoadingIndicatorsProps) {
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
        fold: value =>
          stagger(300, 4, {
            duration: 2400,
            easing: Easing.linear,
            keyframes: [0, 10, 25, 75, 90, 100],
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
              transform: [
                {
                  rotate: '45deg',
                },
              ],
              width: size,
            },
            style,
          ]}
          {...rest}
        >
          {values?.fold?.map((value, index) => (
            <Animated.View
              renderToHardwareTextureAndroid
              key={index}
              style={{
                backgroundColor: color,
                height: size / 2,
                opacity: value.interpolate({
                  inputRange: [0, 10, 25, 75, 90, 100],
                  outputRange: [0, 0, 1, 1, 0, 0],
                }),
                position: 'absolute',
                transform: [
                  {
                    rotate: `${index * 90}deg`,
                  },
                  {
                    perspective: size * 3.6,
                  },
                  {
                    rotateX: value.interpolate({
                      inputRange: [0, 10, 25, 75, 90, 100],
                      outputRange: ['-180deg', '-180deg', '0deg', '0deg', '0deg', '0deg'],
                    }),
                  },
                  {
                    rotateY: value.interpolate({
                      inputRange: [0, 10, 25, 75, 90, 100],
                      outputRange: ['0deg', '0deg', '0deg', '0deg', '180deg', '180deg'],
                    }),
                  },
                  {
                    translateX: -size / 4,
                  },
                  {
                    translateY: -size / 4,
                  },
                ],
                width: size / 2,
              }}
            />
          ))}
        </Box>
      )}
    </AnimationContainer>
  );
}
