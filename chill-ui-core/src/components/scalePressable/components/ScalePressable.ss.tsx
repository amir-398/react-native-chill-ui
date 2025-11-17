import { ScalePressablePropsSs } from '@types';
import { Animated, Pressable } from 'react-native';
import { AnimatedBoxSs } from '@components/animatedBox';
import { useRef, PropsWithChildren, forwardRef } from 'react';

import { styles } from '../styles/ScalePressable.ss.styles';
import { scalePressableDefaultProps } from '../utils/defaultProps';

/**
 * The `<ScalePressable />` component provides a scale effect on press.
 * When pressed, the component scales down to give a tactile feedback effect.
 *
 * <!-- STORYBOOK_IMPORT_START
 * ```tsx
 * import { ScalePressable } from 'react-native-chill-ui';
 * ```
 * STORYBOOK_IMPORT_END -->
 *
 * @example
 * ```tsx
 * <ScalePressable onPress={() => console.log('Pressed!')}>
 *   <Box style={{ padding: 16, backgroundColor: '#3B82F6', borderRadius: 8 }}>
 *     <String color="white">Press me</String>
 *   </Box>
 * </ScalePressable>
 * ```
 *
 * @param children - Child components to render with scale effect (required)
 * @param style - Style object for the pressable container
 * @param scaleValue - Scale factor when pressed (default: 0.95)
 * @param duration - Animation duration in milliseconds (default: 100)
 * @param onPress - Callback function called when the component is pressed
 * @returns ScalePressable component with scale animation
 * @throws Error if no children are provided
 */
export const ScalePressable = forwardRef<any, PropsWithChildren<ScalePressablePropsSs>>((props, ref) => {
  const {
    children,
    duration = scalePressableDefaultProps.duration,
    onPress,
    scaleValue = scalePressableDefaultProps.scaleValue,
    style,
    ...rest
  } = props;

  const scaleAnim = useRef(new Animated.Value(1)).current;

  const handlePressIn = () => {
    Animated.timing(scaleAnim, {
      duration,
      toValue: scaleValue,
      useNativeDriver: true,
    }).start();
  };

  const handlePressOut = () => {
    Animated.timing(scaleAnim, {
      duration,
      toValue: 1,
      useNativeDriver: true,
    }).start();
  };

  const handlePress = (event: any) => {
    if (onPress) {
      onPress(event);
    }
  };

  const animatedStyle = {
    transform: [{ scale: scaleAnim }],
  };

  return (
    <AnimatedBoxSs style={animatedStyle}>
      <Pressable
        ref={ref}
        onPress={handlePress}
        onPressIn={handlePressIn}
        onPressOut={handlePressOut}
        style={[styles.container, style]}
        {...rest}
      >
        {children}
      </Pressable>
    </AnimatedBoxSs>
  );
});

ScalePressable.displayName = 'ScalePressable';
