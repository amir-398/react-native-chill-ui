import type { ScaleInBoxPropsSs, ScaleInBoxRefSs } from '@types';

import { Animated } from 'react-native';
import { useRef, useEffect, useImperativeHandle, forwardRef, useCallback, PropsWithChildren } from 'react';

import AnimatedBox from '../animatedBox/AnimatedBox.ss';

/**
 * ScaleInBox - Dynamic scale-in animation component
 *
 * Creates an engaging scale-in effect using spring physics for natural feel. Animates scale
 * from 0.8 to 1.0 with smooth spring transition. Perfect for emphasizing content appearance
 * with bouncy, organic motion.
 *
 * @example
 * ```tsx
 * // Basic auto-start scale in
 * <ScaleInBox autoStart style={{ backgroundColor: 'green', padding: 24, borderRadius: 12 }}>
 *   <String style={{ color: 'white', fontWeight: 'bold' }}>Scaling in smoothly</String>
 * </ScaleInBox>
 *
 * // With custom timing and delay
 * <ScaleInBox
 *   autoStart
 *   duration={1200}
 *   delay={500}
 *   style={{ backgroundColor: 'purple', padding: 16, borderRadius: 8, shadowOpacity: 0.3 }}
 * >
 *   <String style={{ color: 'white' }}>Delayed spring entrance</String>
 * </ScaleInBox>
 * ```
 *
 * @param autoStart - Automatically start animation when component mounts (default: false)
 * @param duration - Animation duration in milliseconds (default: 800)
 * @param delay - Delay before starting animation in milliseconds (default: 0)
 * @param infiniteLoop - Loop animation continuously (default: false)
 * @param style - Inline styles for traditional styling or style overrides
 * @param children - Content to be animated
 * @param ref - Ref for manual animation control (start, stop methods)
 * @returns Animated component with scale-in effect using spring physics
 */
const ScaleInBox = forwardRef<ScaleInBoxRefSs, PropsWithChildren<ScaleInBoxPropsSs>>((props, ref) => {
  const { autoStart = false, children, delay = 0, infiniteLoop = false, style, ...rest } = props;
  const scaleAnim = useRef(new Animated.Value(0.8)).current;
  const animationRef = useRef<Animated.CompositeAnimation | null>(null);
  const isRunningRef = useRef(false);

  const startAnimation = useCallback(() => {
    if (isRunningRef.current) return;

    isRunningRef.current = true;
    animationRef.current?.stop();
    scaleAnim.setValue(0.8);

    const animation = Animated.spring(scaleAnim, {
      friction: 3,
      toValue: 1,
      useNativeDriver: true,
    });

    if (infiniteLoop) {
      animationRef.current = Animated.loop(animation);
    } else {
      animationRef.current = animation;
    }

    animationRef.current.start();
  }, [infiniteLoop, scaleAnim]);

  const stopAnimation = useCallback(() => {
    isRunningRef.current = false;
    animationRef.current?.stop();

    // Reset animation to initial state
    scaleAnim.setValue(0.8);
  }, [scaleAnim]);

  useImperativeHandle(
    ref,
    () => ({
      start: startAnimation,
      stop: stopAnimation,
    }),
    [startAnimation, stopAnimation],
  );

  useEffect(() => {
    if (autoStart || infiniteLoop) {
      const timer = setTimeout(() => {
        startAnimation();
      }, delay);

      return () => {
        clearTimeout(timer);
        stopAnimation();
      };
    }
    return undefined;
  }, [delay, autoStart, infiniteLoop, startAnimation, stopAnimation]);

  return (
    <AnimatedBox
      style={[
        {
          transform: [{ scale: scaleAnim }],
        },
        style,
      ]}
      {...rest}
    >
      {children}
    </AnimatedBox>
  );
});

ScaleInBox.displayName = 'ScaleInBox';

export default ScaleInBox;
