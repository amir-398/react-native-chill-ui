import { ICONS } from '@constants';
import { useEffect, useRef } from 'react';
import Svg, { Path } from 'react-native-svg';
import { LoadingIndicatorsProps } from '@types';
import { Animated, Platform } from 'react-native';
import { AnimatedBox } from '@components/animatedBox';

import defaultProps from '../utils/defaultProps';

/**
 * Spinner loading indicator component.
 * Displays a classic spinning circle icon with continuous rotation.
 * Uses SVG path for crisp rendering at any size.
 *
 * @example
 * ```tsx
 * <Spinner
 *   size={24}
 *   color="#007AFF"
 *   animating={isLoading}
 * />
 * ```
 *
 * @param size - Size of the loading indicator (default: 40)
 * @param color - Color of the spinning icon (default: '#000')
 * @param animating - Whether the animation is running (default: true)
 * @param hidesWhenStopped - Whether to hide when animation stops (default: true)
 * @param style - Custom style object for the container
 * @returns Spinner loading animation with rotating SVG icon
 */
export default function Spinner(props: LoadingIndicatorsProps) {
  const { color = '#000', size = defaultProps.size } = props;
  const spinValue = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.loop(
      Animated.timing(spinValue, {
        duration: 1000,
        toValue: 1,
        useNativeDriver: Platform.OS !== 'web',
      }),
    ).start();
  }, [spinValue]);

  const spin = spinValue.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg'],
  });

  return (
    <AnimatedBox style={{ height: size, transform: [{ rotate: spin }], width: size }}>
      <Svg focusable={false} viewBox={ICONS['circle-notch-solid']?.viewBox} color={color} width={size} height={size}>
        <Path d={ICONS['circle-notch-solid']?.path[0]} fill={color} />
      </Svg>
    </AnimatedBox>
  );
}
