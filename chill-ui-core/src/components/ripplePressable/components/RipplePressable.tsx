import { RipplePressablePropsTw } from '@types';
import { AnimatedBox } from '@components/animatedBox';
import { View, Animated, Pressable } from 'react-native';
import { cn, classNamePropsHandler, classNameHandler, styleHandler } from '@utils';
import { useState, useRef, useEffect, PropsWithChildren, forwardRef } from 'react';

import styles from '../styles/RipplePressable.ss.styles';
import { extractBorderRadius } from '../utils/extractBorder';
import { twStyles } from '../styles/RipplePressable.tw.styles';

/**
 * Individual ripple effect component using native Animated API
 */
interface RippleEffectProps {
  x: number;
  y: number;
  duration: number;
  effectColor: string;
  containerWidth: number;
  containerHeight: number;
}

function RippleEffect({ containerHeight, containerWidth, duration, effectColor, x, y }: RippleEffectProps) {
  const scaleAnim = useRef(new Animated.Value(0)).current;
  const opacityAnim = useRef(new Animated.Value(0.6)).current;

  const distanceToCorners = [
    Math.sqrt(x * x + y * y), // Top-left
    Math.sqrt((containerWidth - x) * (containerWidth - x) + y * y), // Top-right
    Math.sqrt(x * x + (containerHeight - y) * (containerHeight - y)), // Bottom-left
    Math.sqrt((containerWidth - x) * (containerWidth - x) + (containerHeight - y) * (containerHeight - y)), // Bottom-right
  ];

  const maxDistance = Math.max(...distanceToCorners);

  const baseSize = 20;
  const finalScale = (maxDistance * 2.2) / baseSize;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(scaleAnim, {
        duration,
        toValue: finalScale,
        useNativeDriver: true,
      }),
      Animated.timing(opacityAnim, {
        delay: Math.round(duration * 0.3),
        duration: Math.round(duration * 0.9),
        toValue: 0,
        useNativeDriver: true,
      }),
    ]).start();
  }, [scaleAnim, opacityAnim, finalScale, duration]);

  return (
    <AnimatedBox
      style={{
        backgroundColor: effectColor,
        borderRadius: baseSize / 2,
        height: baseSize,
        left: x - baseSize / 2,
        opacity: opacityAnim,
        pointerEvents: 'none',
        position: 'absolute',
        top: y - baseSize / 2,
        transform: [{ scale: scaleAnim }],
        width: baseSize,
      }}
    />
  );
}

/**
 * The `<RipplePressable />` component provides a ripple effect on press.
 * Creates a visual ripple animation that emanates from the touch point.
 *
 *
 * <!-- STORYBOOK_IMPORT_START
 * ```tsx
 * import { RipplePressable } from 'react-native-chill-ui';
 * ```
 * STORYBOOK_IMPORT_END -->
 *
 * @example
 * ```tsx
 * <RipplePressable onPress={() => console.log('Pressed!')}>
 *   <Box className="p-4 bg-blue-500 rounded-lg">
 *     <String color="white">Press me</String>
 *   </Box>
 * </RipplePressable>
 * ```
 *
 * @param children - Child components to render with ripple effect (required)
 * @param className - Custom CSS classes for styling the container (NativeWind)
 * @param disabled - Whether the component is disabled (default: false)
 * @param effectColor - Color of the ripple effect (default: 'rgba(255, 255, 255, 0.6)')
 * @param onPress - Callback function called when the component is pressed, receives press event
 * @param speed - Animation duration in milliseconds (default: 500)
 * @param style - Style object for the pressable container
 */
const RipplePressable = forwardRef<View, PropsWithChildren<RipplePressablePropsTw>>((props, ref) => {
  classNamePropsHandler(props, 'RipplePressable');
  const {
    children,
    className,
    disabled = false,
    effectColor = 'rgba(255, 255, 255, 0.6)',
    onPress,
    speed = 500,
    style,
    ...rest
  } = props;

  if (!children) {
    throw new Error('RipplePressable must have children');
  }

  const [ripples, setRipples] = useState<
    { id: number; x: number; y: number; timestamp: number; width: number; height: number }[]
  >([]);
  const containerRef = useRef<View>(null);
  const rippleIdCounter = useRef(0);

  // Extract borderRadius from children
  const childBorderRadius = extractBorderRadius(children);

  /**
   * Handles press event and creates ripple animation
   */
  const handlePress = (event: any) => {
    if (disabled) {
      return;
    }

    if (containerRef.current) {
      containerRef.current.measure((_x, _y, width, height) => {
        const touchX = event.nativeEvent.locationX;
        const touchY = event.nativeEvent.locationY;

        rippleIdCounter.current += 1;
        const rippleId = rippleIdCounter.current;
        const newRipple = {
          height,
          id: rippleId,
          timestamp: Date.now(),
          width,
          x: touchX,
          y: touchY,
        };

        setRipples(prevRipples => [...prevRipples, newRipple]);

        setTimeout(() => {
          setRipples(prevRipples => prevRipples.filter(ripple => ripple.id !== rippleId));
        }, speed + 150);
      });
    }

    if (onPress) {
      onPress(event);
    }
  };

  return (
    <Pressable
      {...rest}
      ref={ref || containerRef}
      onPress={handlePress}
      disabled={disabled}
      {...classNameHandler(cn(twStyles.container, disabled && twStyles.disabled, className))}
      {...styleHandler({
        defaultStyle: [styles.container, { borderRadius: childBorderRadius }, disabled && styles.disabled],
        style,
      })}
    >
      {children}
      {!disabled &&
        ripples.map(ripple => (
          <RippleEffect
            key={ripple.id}
            x={ripple.x}
            y={ripple.y}
            containerWidth={ripple.width}
            containerHeight={ripple.height}
            duration={speed}
            effectColor={effectColor}
          />
        ))}
    </Pressable>
  );
});

RipplePressable.displayName = 'RipplePressable';

export default RipplePressable;
