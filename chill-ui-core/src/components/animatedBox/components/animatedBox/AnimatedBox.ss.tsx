import { AnimatedBoxPropsSs } from '@types';

import styles from '../../styles/AnimatedBox.styles';
import { AnimatedView as AnimatedViewNative } from '../../../box/components/View.ss';

/**
 * AnimatedBox - Base animated container component
 *
 * A flexible animated container that serves as the foundation for all other animated components.
 * Provides optimal performance using React Native's internal ViewNativeComponent and automatically
 *
 * @example
 * ```tsx
 * <AnimatedBox style={{ backgroundColor: 'blue', padding: 16, borderRadius: 8, [transform: [{ translateY: refValue }]] }}>
 *   <String style={{ color: 'white' }}>Base animated container</String>
 * </AnimatedBox>
 *
 * ```
 *
 * @param style - Inline styles for traditional styling or style overrides
 * @param children - Content to be rendered inside the animated container
 * @param props - All other View props are supported
 * @returns Optimized animated view component ready for custom animations
 */
export default function AnimatedBox(props: AnimatedBoxPropsSs) {
  return <AnimatedViewNative style={[styles.baseAnimated]} {...props} />;
}
