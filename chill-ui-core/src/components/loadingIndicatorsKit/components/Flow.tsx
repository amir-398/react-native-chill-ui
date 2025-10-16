import { Box } from '@components/box';
import { Animated, Easing } from 'react-native';
import { LoadingIndicatorsProps } from '@types';
import { AnimatedBox } from '@components/animatedBox';

import { stagger } from '../utils/utils';
import AnimationContainer from './AnimationContainer';

export const defaultProps = {
  animating: true,
  color: '#000',
  hidesWhenStopped: true,
  size: 48,
};

/**
 * Flow loading indicator component.
 * Displays three circles in a flowing wave-like animation pattern.
 * Creates a smooth horizontal flow effect with scaling circles.
 *
 * @example
 * ```tsx
 * <Flow
 *   size={48}
 *   color="#007AFF"
 *   animating={isLoading}
 * />
 * ```
 *
 * @param size - Size of the loading indicator (default: 48)
 * @param color - Color of the flowing circles (default: '#000')
 * @param animating - Whether the animation is running (default: true)
 * @param hidesWhenStopped - Whether to hide when animation stops (default: true)
 * @param style - Custom style object for the container
 * @returns Flow loading animation with three flowing circles
 */
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
            <AnimatedBox
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
