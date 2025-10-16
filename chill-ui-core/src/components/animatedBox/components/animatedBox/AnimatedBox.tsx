import { AnimatedBoxPropsTw } from '@types';
import { cn, classNamePropsHandler, classNameHandler, styleHandler } from '@utils';

import styles from '../../styles/AnimatedBox.ss.styles';
import { twStyles } from '../../styles/AnimatedBox.tw.styles';
import { AnimatedView as AnimatedViewNative } from '../../../box/components/View';

/**
 * The `<AnimatedBox />` component provides a base animated container with optimal performance.
 * Uses React Native's internal ViewNativeComponent.
 *
 *
 * <!-- STORYBOOK_IMPORT_START
 * ```tsx
 * import { AnimatedBox } from 'react-native-chill-ui';
 * ```
 * STORYBOOK_IMPORT_END -->
 *
 * @example
 * ```tsx
 * <AnimatedBox>
 *   <String className="text-white">Base animated container</String>
 * </AnimatedBox>
 * ```
 *
 * @param useFastView - Use optimized RCTView component for better performance (default: `true`)
 * @param className - CSS classes for NativeWind styling (Nativewind only)
 * @param AnimatedViewProps - Any other props accepted by the native `Animated.View` component
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

AnimatedBox.displayName = 'AnimatedBox';
