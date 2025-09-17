import { Animated } from 'react-native';
import { useEffect, useRef } from 'react';
import Svg, { Path } from 'react-native-svg';

import defaultProps from './defaultProps';
import { ICONS } from '../../constants/ICONS';
import { LoadingIndicatorsProps } from '../../types/loadingIndicator.types';

export default function Spinner(props: LoadingIndicatorsProps) {
  const { color = '#000', size = defaultProps.size } = props;
  const spinValue = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.loop(
      Animated.timing(spinValue, {
        duration: 1000,
        toValue: 1,
        useNativeDriver: true,
      }),
    ).start();
  }, [spinValue]);

  const spin = spinValue.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg'],
  });

  return (
    <Animated.View style={{ transform: [{ rotate: spin }] }}>
      <Svg focusable={false} viewBox={ICONS['circle-notch-solid']?.viewBox} color={color} width={size} height={size}>
        <Path d={ICONS['circle-notch-solid']?.path[0]} fill={color} />
      </Svg>
    </Animated.View>
  );
}
