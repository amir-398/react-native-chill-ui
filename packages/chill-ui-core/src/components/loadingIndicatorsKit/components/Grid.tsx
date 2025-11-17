import { Box } from '@components/box';
import { Animated } from 'react-native';
import { LoadingIndicatorsProps } from '@types';

import { stagger } from '../utils/utils';
import defaultProps from '../utils/defaultProps';
import AnimationContainer from './AnimationContainer';

const values = [2, 3, 4, 1, 2, 3, 0, 1, 2];

/**
 * Grid loading indicator component.
 * Displays nine squares arranged in a 3x3 grid with scaling animation.
 * Creates a wave-like scaling effect across the grid pattern.
 *
 * @example
 * ```tsx
 * <Grid
 *   size={40}
 *   color="#007AFF"
 *   animating={isLoading}
 * />
 * ```
 *
 * @param size - Size of the loading indicator (default: 40)
 * @param color - Color of the grid squares (default: '#000')
 * @param animating - Whether the animation is running (default: true)
 * @param hidesWhenStopped - Whether to hide when animation stops (default: true)
 * @param style - Custom style object for the container
 * @returns Grid loading animation with nine scaling squares
 */
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
