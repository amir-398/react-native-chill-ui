import type { BounceBoxPropsSs, BounceBoxRefSs } from '@types';

import { Animated } from 'react-native';
import { useRef, useEffect, useCallback, useImperativeHandle, forwardRef, PropsWithChildren } from 'react';

import { AnimatedBox } from '../animatedBox/AnimatedBox.ss';

/**
 * The `<BounceBox />` component creates a playful bounce animation effect for its children.
 *
 * <!-- STORYBOOK_IMPORT_START
 * ```tsx
 * import { BounceBox } from 'react-native-chill-ui';
 * ```
 * STORYBOOK_IMPORT_END -->
 *
 * @example
 * ```tsx
 * // Basic auto-bouncing notification
 * <BounceBox 
 *   autoStart 
 *   infiniteLoop 
 *   bounceHeight={15} 
 *   style={{ 
 *     backgroundColor: 'red', 
 *     padding: 16, 
 *     borderRadius: 20 
 *   }}
 * >
 *   <String style={{ color: 'white', fontWeight: 'bold' }}>New Message!</String>
 * </BounceBox>
 * ```
 *
 * @param bounceHeight - Height of bounce in pixels (default: `20`)
 * @param bounceInterval - Time between bounces in milliseconds (default: `2000`)
 * @param autoStart - Automatically start animation when component mounts (default: `false`)
 * @param duration - Single bounce duration in milliseconds (default: `400`)
 * @param infiniteLoop - Loop animation continuously (default: `false`)
 * @param onBounce - Callback function called on each bounce
 * @param children - Content to be animated
 * @param style - Inline styles for traditional styling or style overrides
 * @param ref - Ref for manual animation control (bounce, start, stop methods)
 * @param AnimatedBoxProps - Any other props accepted by the `AnimatedBox` component
 */
const BounceBox = forwardRef<BounceBoxRefSs, PropsWithChildren<BounceBoxPropsSs>>((props, ref) => {
  const {
    autoStart = false,
    bounceHeight = 20,
    bounceInterval = 2000,
    children,
    duration = 400,
    infiniteLoop = false,
    onBounce,
    style,
    ...rest
  } = props;
  const bounceAnim = useRef(new Animated.Value(0)).current;
  const animationRef = useRef<Animated.CompositeAnimation | null>(null);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const isRunningRef = useRef(false);

  const startBounce = useCallback(() => {
    animationRef.current?.stop();
    bounceAnim.setValue(0);

    const animation = Animated.sequence([
      Animated.timing(bounceAnim, {
        duration: duration / 2,
        toValue: 1,
        useNativeDriver: true,
      }),
      Animated.timing(bounceAnim, {
        duration: duration / 2,
        toValue: 0,
        useNativeDriver: true,
      }),
    ]);

    animationRef.current = animation;
    animation.start();
    onBounce?.();
  }, [bounceAnim, duration, onBounce]);

  const startAnimation = useCallback(() => {
    if (isRunningRef.current) return;

    isRunningRef.current = true;

    if (infiniteLoop) {
      intervalRef.current = setInterval(startBounce, bounceInterval);
      startBounce();
    } else {
      startBounce();
    }
  }, [infiniteLoop, bounceInterval, startBounce]);

  const stopAnimation = useCallback(() => {
    isRunningRef.current = false;
    animationRef.current?.stop();

    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }

    bounceAnim.setValue(0);
  }, [bounceAnim]);

  useImperativeHandle(
    ref,
    () => ({
      bounce: startBounce,
      start: startAnimation,
      stop: stopAnimation,
    }),
    [startBounce, startAnimation, stopAnimation],
  );

  useEffect(() => {
    if (autoStart || infiniteLoop) {
      startAnimation();
    }

    return () => {
      stopAnimation();
    };
  }, [autoStart, infiniteLoop, startAnimation, stopAnimation]);

  return (
    <AnimatedBox
      style={[
        {
          transform: [
            {
              translateY: bounceAnim.interpolate({
                inputRange: [0, 1],
                outputRange: [0, -bounceHeight],
              }),
            },
          ],
        },
        style,
      ]}
      {...rest}
    >
      {children}
    </AnimatedBox>
  );
});

BounceBox.displayName = 'BounceBox';

export default BounceBox;
