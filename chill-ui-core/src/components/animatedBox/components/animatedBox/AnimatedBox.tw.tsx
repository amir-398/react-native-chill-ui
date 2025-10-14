import { cn } from '@utils';
import { AnimatedBoxPropsTw } from '@types';

import { twStyles } from '../../styles/AnimatedBox.tw.styles';
import { AnimatedView as AnimatedViewNative } from '../../../box/components/View.tw';

/**
 * AnimatedBox - Base animated container component
 * Provides optimal performance using React Native's internal ViewNativeComponent and automatically
 *
 * @example
 * ```tsx
 * // With NativeWind (Tailwind CSS)
 * <AnimatedBox className="bg-blue-500 p-4 rounded-lg shadow-lg" style={{ transform: [{ translateY: refValue }] }}>
 *   <String className="text-white">Base animated container</String>
 * </AnimatedBox>
 *
 * ```
 *
 * @param className - CSS classes for NativeWind styling
 * @param style - Inline styles for traditional styling or style overrides
 * @param children - Content to be rendered inside the animated container
 * @param props - All other View props are supported
 * @returns Optimized animated view component ready for custom animations
 */
export function AnimatedBox(props: AnimatedBoxPropsTw) {
  const { className, ...rest } = props;

  return <AnimatedViewNative className={cn(twStyles.animatedBox, className)} {...rest} />;
}
