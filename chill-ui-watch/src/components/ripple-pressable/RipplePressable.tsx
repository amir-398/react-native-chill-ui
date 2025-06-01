import { View } from 'react-native';
// eslint-disable-next-line import/no-extraneous-dependencies
import { Gesture, GestureDetector } from 'react-native-gesture-handler';
import Animated, {
  measure,
  runOnJS,
  useAnimatedRef,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';

import cn from '../cn';
import { Box } from '../box';

interface RippleProps {
  className?: string;
  onPress?: () => void;
  children: React.ReactNode;
}

function RipplePressable({ children, className, onPress }: RippleProps) {
  if (!children) {
    throw new Error('RipplePressable must have children');
  }

  const centerX = useSharedValue(0);
  const centerY = useSharedValue(0);
  const scale = useSharedValue(0);

  const aRef = useAnimatedRef<View>();
  const width = useSharedValue(0);
  const height = useSharedValue(0);

  const rippleOpacity = useSharedValue(1);

  const tapGestureEvent = Gesture.Tap()
    .onBegin(tapEvent => {
      const layout = measure(aRef);
      width.value = layout?.width ?? 0;
      height.value = layout?.height ?? 0;

      centerX.value = tapEvent.x;
      centerY.value = tapEvent.y;

      rippleOpacity.value = 1;
      scale.value = 0;
      scale.value = withTiming(1, { duration: 400 });
    })
    .onStart(() => {
      if (onPress) runOnJS(onPress)();
    })
    .onFinalize(() => {
      rippleOpacity.value = withTiming(0);
    });

  const rStyle = useAnimatedStyle(() => {
    const circleRadius = Math.sqrt(width.value ** 2 + height.value ** 2);

    const translateX = centerX.value - circleRadius;
    const translateY = centerY.value - circleRadius;

    return {
      backgroundColor: 'rgba(0,0,0,0.2)',
      borderRadius: circleRadius,
      height: circleRadius * 2,
      left: 0,
      opacity: rippleOpacity.value,
      position: 'absolute',
      top: 0,
      transform: [
        { translateX },
        { translateY },
        {
          scale: scale.value,
        },
      ],
      width: circleRadius * 2,
    };
  });

  return (
    <View
      ref={aRef}
      style={{
        borderRadius: 5,
        shadowOffset: { height: 0, width: 0 },
        shadowOpacity: 0.2,
        shadowRadius: 20,
      }}
    >
      <GestureDetector gesture={tapGestureEvent}>
        <Animated.View
          className="overflow-hidden"
          style={{
            borderRadius: 5,
          }}
        >
          <Box className={cn('rounded-full', className)}>{children}</Box>
          <Animated.View style={rStyle} />
        </Animated.View>
      </GestureDetector>
    </View>
  );
}

export default RipplePressable;
