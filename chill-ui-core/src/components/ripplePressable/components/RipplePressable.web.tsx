import type { RipplePressablePropsTw } from '@types';

import { cn } from '@utils';
import { View, Pressable, Platform } from 'react-native';
import { useState, useRef, PropsWithChildren } from 'react';

import { RippleEffect } from './RippleEffect.tw';
import { extractBorderRadius } from '../utils/extractBorder';
import { twStyles } from '../styles/RipplePressable.tw.styles';

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
 * <RipplePressable>
 *   <Box className="p-4 bg-blue-500 rounded-lg">
 *     <String color="white">Press me</String>
 *   </Box>
 * </RipplePressable>
 * ```
 *
 * @param children - Child components to render with ripple effect (required)
 * @param className - Custom CSS classes for styling the container (NativeWind)
 * @param disabled - Whether the component is disabled (default: false)
 * @param style - Style object for the pressable container
 * @param effectColor - Color of the ripple effect (default: 'rgba(255, 255, 255, 0.6)')
 * @param speed - Animation duration in milliseconds (default: 500)
 * @param PressableProps - Props for the Pressable component
 * @returns RipplePressable component with ripple animation
 * @throws Error if no children are provided
 */
function RipplePressable(props: PropsWithChildren<RipplePressablePropsTw>) {
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
      return; // Don't handle press if disabled
    }

    if (containerRef.current) {
      const handleRipple = (_x: number, _y: number, width: number, height: number) => {
        let touchX: number;
        let touchY: number;

        // Handle both native and web events
        if (Platform.OS === 'web') {
          touchX = event.clientX - _x;
          touchY = event.clientY - _y;
        } else {
          touchX = event.nativeEvent.locationX;
          touchY = event.nativeEvent.locationY;
        }

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
      };

      if (Platform.OS === 'web') {
        // On web, get the bounding rect directly
        const rect = (containerRef.current as any).getBoundingClientRect?.();
        if (rect) {
          handleRipple(rect.left, rect.top, rect.width, rect.height);
        }
      } else {
        // On native, use measure
        (containerRef.current as any).measure(handleRipple);
      }
    }

    if (onPress) {
      onPress(event);
    }
  };

  return (
    <Pressable
      {...rest}
      ref={containerRef}
      onPress={handlePress}
      disabled={disabled}
      className={cn(twStyles.container, disabled && twStyles.disabled, className)}
      style={[...(childBorderRadius > 0 ? [{ borderRadius: childBorderRadius }] : []), style]}
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
}

export default RipplePressable;
