import { AnimatedBoxPropsSs } from '@types';

import styles from '../../styles/AnimatedBox.ss.styles';
import { AnimatedView as AnimatedViewNative } from '../../../box/components/View.ss';

/**
 * The `<AnimatedBox />` component provides a base animated container with optimal performance.
 * Uses React Native's internal ViewNativeComponent.
 *
 * <!-- STORYBOOK_IMPORT_START
 * ```tsx
 * import { AnimatedBox } from 'react-native-chill-ui';
 * ```
 * STORYBOOK_IMPORT_END -->
 *
 * @example
 * ```tsx
 * <AnimatedBox style={{ backgroundColor: 'blue', padding: 16, borderRadius: 8, [transform: [{ translateY: refValue }]] }}>
 *   <String style={{ color: 'white' }}>Base animated container</String>
 * </AnimatedBox>
 *
 * ```
 *
 * @param useFastView - Use optimized RCTView component for better performance (default: `true`)
 * @param AnimatedViewProps - Any other props accepted by the native `Animated.View` component
 */
export function AnimatedBox(props: AnimatedBoxPropsSs) {
  return <AnimatedViewNative style={[styles.baseAnimated]} {...props} />;
}

AnimatedBox.displayName = 'AnimatedBox';
