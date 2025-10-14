import { AnimatedBoxPropsTw } from '@types';
import { cn, classNamePropsHandler, classNameHandler, styleHandler } from '@utils';

import styles from '../../styles/AnimatedBox.ss.styles';
import { twStyles } from '../../styles/AnimatedBox.tw.styles';
import { AnimatedView as AnimatedViewNative } from '../../../box/components/View';

/**
 * AnimatedBox - Base animated container component
 * Provides optimal performance using React Native's internal ViewNativeComponent and automatically
 * Automatically detects NativeWind availability and falls back to StyleSheet if needed.
 *
 * @example
 * ```tsx
 * // With NativeWind (Tailwind CSS)
 * <AnimatedBox className="bg-blue-500 p-4 rounded-lg shadow-lg">
 *   <String className="text-white">Base animated container</String>
 * </AnimatedBox>
 *
 * // Without NativeWind (traditional styles)
 * <AnimatedBox style={{ backgroundColor: 'blue', padding: 16, borderRadius: 8 }}>
 *   <String style={{ color: 'white' }}>Base animated container</String>
 * </AnimatedBox>
 *
 * // As foundation for custom animations
 * <Animated.View style={{ transform: [{ scale: scaleValue }] }}>
 *   <AnimatedBox className="bg-green-500">
 *     <String>Custom animated content</String>
 *   </AnimatedBox>
 * </Animated.View>
 * ```
 *
 * @param className - CSS classes for NativeWind styling
 * @param style - Inline styles for traditional styling or style overrides
 * @param children - Content to be rendered inside the animated container
 * @param props - All other View props are supported
 * @returns Optimized animated view component ready for custom animations
 */
export function AnimatedBox(props: AnimatedBoxPropsTw) {
  classNamePropsHandler(props, 'AnimatedBox');
  const { className, ...rest } = props;

  return (
    <AnimatedViewNative
      {...classNameHandler(cn(twStyles.animatedBox, className))}
      {...styleHandler({ defaultStyle: styles.baseAnimated })}
      {...rest}
    />
  );
}
