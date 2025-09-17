import { Animated } from 'react-native';

import { Box } from '../box';
import { stagger } from './utils';
import defaultProps from './defaultProps';
import AnimationContainer from './AnimationContainer';
import { LoadingIndicatorsProps } from '../../types/loadingIndicator.types';

const values = [2, 3, 4, 1, 2, 3, 0, 1, 2];

export default function Grid(props: LoadingIndicatorsProps) {
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
        grid: value =>
          stagger(100, 5, {
            duration: 1300,
            keyframes: [0, 35, 70, 100],
            value,
          }),
      })}
      animating={animating}
    >
      {interpolations => (
        <Box
          style={[
            {
              flexDirection: 'row',
              flexWrap: 'wrap',
              height: size,
              opacity: !animating && hidesWhenStopped ? 0 : 1,
              width: size,
            },
            style,
          ]}
          {...rest}
        >
          {values &&
            values
              ?.map(value => interpolations.grid && interpolations?.grid[value])
              ?.map((value, index) => (
                <Animated.View
                  key={index}
                  style={{
                    backgroundColor: color,
                    height: size / 3,
                    transform: [
                      {
                        scale: interpolations?.grid
                          ? value?.interpolate({
                              inputRange: [0, 35, 70, 100],
                              outputRange: [1, 0.01, 1, 1],
                            })
                          : 1,
                      },
                    ],
                    width: size / 3,
                  }}
                />
              ))}
        </Box>
      )}
    </AnimationContainer>
  );
}
