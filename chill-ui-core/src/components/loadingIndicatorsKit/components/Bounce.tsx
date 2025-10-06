import { Box } from '@components/box';
import { LoadingIndicatorsProps } from '@types';
import { Animated, ViewStyle } from 'react-native';

import { stagger } from '../utils/utils';
import defaultProps from '../utils/defaultProps';
import AnimationContainer from './AnimationContainer';

/**
 * Bounce loading indicator component.
 * Displays three bouncing circles with a staggered animation effect.
 * Creates a smooth bouncing motion that's perfect for loading states.
 *
 * @example
 * ```tsx
 * <Bounce
 *   size={40}
 *   color="#007AFF"
 *   animating={isLoading}
 * />
 * ```
 *
 * @param size - Size of the loading indicator circles (default: 40)
 * @param color - Color of the bouncing circles (default: '#000')
 * @param animating - Whether the animation is running (default: true)
 * @param hidesWhenStopped - Whether to hide when animation stops (default: true)
 * @param style - Custom style object for the container
 * @returns Bounce loading animation with three circles
 */
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
