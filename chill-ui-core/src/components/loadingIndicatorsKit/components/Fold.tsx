import { Box } from '@components/box';
import { Easing } from 'react-native';
import { LoadingIndicatorsProps } from '@types';
import { AnimatedBox } from '@components/animatedBox';

import { stagger } from '../utils/utils';
import defaultProps from '../utils/defaultProps';
import AnimationContainer from './AnimationContainer';

/**
 * Fold loading indicator component.
 * Displays four cubes in a folding animation pattern.
 * Creates a 3D folding effect with rotating and scaling cubes.
 *
 * @example
 * ```tsx
 * <Fold
 *   size={40}
 *   color="#007AFF"
 *   animating={isLoading}
 * />
 * ```
 *
 * @param size - Size of the loading indicator (default: 40)
 * @param color - Color of the folding cubes (default: '#000')
 * @param animating - Whether the animation is running (default: true)
 * @param hidesWhenStopped - Whether to hide when animation stops (default: true)
 * @param style - Custom style object for the container
 * @returns Fold loading animation with four rotating cubes
 */
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
            <AnimatedBox
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
