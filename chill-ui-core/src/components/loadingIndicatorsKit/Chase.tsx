import { Animated, Easing, ViewStyle } from 'react-native';

import { loop, stagger } from './utils';
import defaultProps from './defaultProps';
import AnimationContainer from './AnimationContainer';
import { LoadingIndicatorsProps } from '../../types/loadingIndicator.types';

export default function Chase(props: LoadingIndicatorsProps) {
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
    borderRadius: size / 8,
    height: size / 4,
    position: 'absolute',
    width: size / 4,
  };

  return (
    <AnimationContainer
      initAnimation={() => ({
        chase: value => ({
          animation: loop({
            duration: 2500,
            easing: Easing.linear,
            value,
          }),
          values: [value],
        }),
        chaseDot: value =>
          stagger(100, 6, {
            duration: 2000,
            keyframes: [0, 80, 100],
            value,
          }),
        chaseDotBefore: value =>
          stagger(100, 6, {
            duration: 2000,
            keyframes: [0, 50, 100],
            value,
          }),
      })}
      animating={animating}
    >
      {values => (
        <Animated.View
          style={[
            {
              alignItems: 'center',
              height: size,
              justifyContent: 'center',
              opacity: !animating && hidesWhenStopped ? 0 : 1,
              transform: [
                {
                  rotate: values?.chase
                    ? values?.chase[0]?.interpolate({
                        inputRange: [0, 100],
                        outputRange: ['0deg', '360deg'],
                      })
                    : '0deg',
                },
              ],
              width: size,
            },
            style,
          ]}
          {...rest}
        >
          {values?.chaseDot?.map((value, index) => (
            <Animated.View
              key={index}
              style={[
                circleStyle,
                {
                  transform: [
                    {
                      rotate: value.interpolate({
                        inputRange: [0, 80, 100],
                        outputRange: ['0deg', '360deg', '360deg'],
                      }),
                    },
                    { translateY: -size / 2 + size / 8 },
                    {
                      scale: values.chaseDotBefore[index].interpolate({
                        inputRange: [0, 50, 100],
                        outputRange: [1, 0.4, 1],
                      }),
                    },
                  ],
                },
              ]}
            />
          ))}
        </Animated.View>
      )}
    </AnimationContainer>
  );
}
