import type { RotatingBoxPropsTw, RotatingBoxRefTw } from '@types';

import { Animated, Easing } from 'react-native';
import { cn, classNameHandler, classNamePropsHandler } from '@utils';
import { useRef, useEffect, useImperativeHandle, forwardRef, useCallback, PropsWithChildren } from 'react';

import styles from '../../styles/AnimatedBox.ss.styles';
import AnimatedBox from '../animatedBox/AnimatedBox';

/**
 * RotatingBox - Smooth rotation animation component
 *
 * Creates continuous 360-degree rotation effects. Perfect for loading spinners, icons,
 * decorative elements, or any content that benefits from rotational motion. Provides
 * smooth, customizable rotation with infinite loop capabilities.
 * Automatically detects NativeWind availability and falls back to StyleSheet if needed.
 *
 * @example
 * ```tsx
 * // Loading spinner
 * <RotatingBox autoStart infiniteLoop duration={1000} className="w-8 h-8">
 *   <Icon name="spinner" className="text-blue-500" />
 * </RotatingBox>
 *   <Icon name="star" className="text-white" />
 * </RotatingBox>
 * ```
 *
 * @param autoStart - Automatically start animation when component mounts (default: false)
 * @param duration - One complete rotation duration in milliseconds (default: 2000)
 * @param delay - Delay before starting animation in milliseconds (default: 0)
 * @param infiniteLoop - Loop animation continuously (default: false)
 * @param continuous - Make rotation continuous without pauses between loops (default: false)
 * @param className - CSS classes for NativeWind styling
 * @param style - Inline styles for traditional styling or style overrides
 * @param children - Content to be rotated
 * @param ref - Ref for manual animation control (start, stop)
 * @returns Animated component with rotation effect
 */
const RotatingBox = forwardRef<RotatingBoxRefTw, PropsWithChildren<RotatingBoxPropsTw>>((props, ref) => {
  const {
    autoStart = false,
    children,
    className,
    continuous = false,
    delay = 0,
    duration = 2000,
    infiniteLoop = false,
    style,
    ...rest
  } = props;
  classNamePropsHandler(props, 'RotatingBox');
  const rotateAnim = useRef(new Animated.Value(0)).current;
  const animationRef = useRef<Animated.CompositeAnimation | null>(null);
  const rotationCount = useRef(0);
  const isStopped = useRef(false);

  const spin = rotateAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg'],
  });

  const startAnimation = useCallback(() => {
    isStopped.current = false;
    animationRef.current?.stop();

    if (!continuous) {
      rotateAnim.setValue(0);
    }

    if (infiniteLoop) {
      if (continuous) {
        const animation = Animated.timing(rotateAnim, {
          duration,
          easing: Easing.linear,
          toValue: 1,
          useNativeDriver: true,
        });
        animationRef.current = animation;
        const runContinuousLoop = () => {
          if (animationRef.current !== animation || isStopped.current) {
            // Animation was stopped, don't continue
            return;
          }
          rotateAnim.setValue(0);
          animation.start(() => {
            runContinuousLoop();
          });
        };

        runContinuousLoop();
      } else {
        const animation = Animated.timing(rotateAnim, {
          duration,
          toValue: 1,
          useNativeDriver: true,
        });

        animationRef.current = animation;

        const runAnimation = () => {
          if (animationRef.current !== animation || isStopped.current) {
            // Animation was stopped, don't continue
            return;
          }
          rotateAnim.setValue(0);
          animation.start(() => {
            runAnimation();
          });
        };
        runAnimation();
      }
    } else {
      const animation = Animated.timing(rotateAnim, {
        duration,
        toValue: 1,
        useNativeDriver: true,
      });
      animationRef.current = animation;
      animationRef.current.start();
    }
  }, [duration, infiniteLoop, continuous, rotateAnim]);

  const stopAnimation = useCallback(() => {
    isStopped.current = true;
    if (animationRef.current) {
      animationRef.current.stop();
      animationRef.current = null;
    }
    rotateAnim.setValue(0);
    if (!continuous) {
      rotationCount.current = 0;
    }
  }, [continuous, rotateAnim]);

  useImperativeHandle(
    ref,
    () => ({
      start: startAnimation,
      stop: stopAnimation,
    }),
    [startAnimation, stopAnimation],
  );

  useEffect(() => {
    if (autoStart) {
      const timer = setTimeout(() => {
        startAnimation();
      }, delay);

      return () => {
        clearTimeout(timer);
        stopAnimation();
      };
    }
    return undefined;
  }, [delay, autoStart, startAnimation, stopAnimation]);

  return (
    <AnimatedBox
      {...classNameHandler(cn('items-center justify-center', className))}
      style={[
        styles.rotationContainer,
        {
          transform: [{ rotate: spin }],
          transformOrigin: 'center',
        },
        style,
      ]}
      {...rest}
    >
      {children}
    </AnimatedBox>
  );
});

RotatingBox.displayName = 'RotatingBox';

export default RotatingBox;
