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
import { RipplePressableProps } from '../../types/ripplePressableProps';

/**
 * RipplePressable component that provides a material design ripple effect on press.
 * Uses React Native Reanimated and Gesture Handler for smooth, native animations.
 *
 * @example
 * ```tsx
 * // Basic usage with ripple effect
 * <RipplePressable onPress={() => console.log('Pressed!')}>
 *   <Box className="p-4 bg-blue-500 rounded-lg">
 *     <String color="white">Press me</String>
 *   </Box>
 * </RipplePressable>
 *
 * // With custom styling
 * <RipplePressable
 *   className="bg-red-500 p-6 rounded-xl"
 *   onPress={() => handleButtonPress()}
 * >
 *   <String color="white" className="text-center font-bold">
 *     Custom Button
 *   </String>
 * </RipplePressable>
 *
 * ```
 *
 * @param children - Child components to render with ripple effect (required)
 * @param className - Custom CSS classes for styling the container
 * @param onPress - Callback function called when the component is pressed
 * @returns RipplePressable component with material design ripple animation
 * @throws Error if no children are provided
 */
function RipplePressable({ children, className, onPress }: RipplePressableProps) {
  if (!children) {
    throw new Error('RipplePressable must have children');
  }

  /** Shared value for the X coordinate of the ripple center */
  const centerX = useSharedValue(0);
  /** Shared value for the Y coordinate of the ripple center */
  const centerY = useSharedValue(0);
  /** Shared value for the scale of the ripple animation */
  const scale = useSharedValue(0);

  /** Animated reference to the container view for measurements */
  const aRef = useAnimatedRef<View>();
  /** Shared value for the width of the container */
  const width = useSharedValue(0);
  /** Shared value for the height of the container */
  const height = useSharedValue(0);

  /** Shared value for the opacity of the ripple effect */
  const rippleOpacity = useSharedValue(1);

  /**
   * Tap gesture handler that manages the ripple animation
   */
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

  /**
   * Animated style for the ripple effect
   * Calculates the circle radius and positioning for the ripple animation
   */
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
