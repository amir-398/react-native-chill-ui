import { cn } from '@utils';

import { twStyles } from '../../styles/AnimatedBox.tw.styles';
import { AnimatedView as AnimatedViewNative } from '../../../box/components/View.tw';
import { AnimatedBoxProps } from '../../../../types/animatedBox/animatedBox.tw.types';

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
 * <AnimatedBox className="bg-blue-500 p-4 rounded-lg shadow-lg" style={{ transform: [{ translateY: refValue }] }}>
 *   <String className="text-white">Base animated container</String>
 * </AnimatedBox>
 *
 * ```
 * @param useFastView - Use optimized RCTView component for better performance (default: `true`)
 * @param className - CSS classes for NativeWind styling
 * @param AnimatedViewProps - Any other props accepted by the native `Animated.View` component
 */
export function AnimatedBox(props: AnimatedBoxProps) {
  const { className, ...rest } = props;

  return <AnimatedViewNative className={cn(twStyles.animatedBox, className)} {...rest} />;
}

AnimatedBox.displayName = 'AnimatedBox';
