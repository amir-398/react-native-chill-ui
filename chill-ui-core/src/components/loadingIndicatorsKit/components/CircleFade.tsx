import { Box } from '@components/box';
import { LoadingIndicatorsProps } from '@types';
import { Animated, ViewStyle } from 'react-native';

import { stagger } from '../utils/utils';
import defaultProps from '../utils/defaultProps';
import AnimationContainer from './AnimationContainer';

/**
 * CircleFade loading indicator component.
 * Displays twelve circles arranged in a clock pattern with fading animation.
 * Creates a smooth circular fading effect that rotates around the center.
 *
 * @example
 * ```tsx
 * <CircleFade
 *   size={40}
 *   color="#007AFF"
 *   animating={isLoading}
 * />
 * ```
 *
 * @param size - Size of the loading indicator (default: 40)
 * @param color - Color of the fading circles (default: '#000')
 * @param animating - Whether the animation is running (default: true)
 * @param hidesWhenStopped - Whether to hide when animation stops (default: true)
 * @param style - Custom style object for the container
 * @returns CircleFade loading animation with twelve circles in clock pattern
 */
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
