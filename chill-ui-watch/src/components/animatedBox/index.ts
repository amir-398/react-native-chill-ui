/**
 * Ready-to-use animated components for common animation patterns.
 * Each component is optimized for performance using React Native's internal ViewNativeComponent.
 * Automatically detects NativeWind availability and falls back to StyleSheet if needed.
 *
 * @example
 * ```tsx
 * import { FadeInBox, ScaleInBox, BounceBox } from '@/components/animatedBox';
 *
 * <FadeInBox autoStart className="bg-blue-500 p-4 rounded-lg">
 *   <String className="text-white">Animated Content</String>
 * </FadeInBox>
 * ```
 */
export { default as AnimatedBox } from './AnimatedBox';
export { default as FadeInBox } from './FadeInBox';
export { default as ScaleInBox } from './ScaleInBox';
export { default as SlideInBox } from './SlideInBox';
export { default as RotatingBox } from './RotatingBox';
export { default as BounceBox } from './BounceBox';
