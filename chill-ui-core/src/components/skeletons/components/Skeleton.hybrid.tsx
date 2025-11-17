import { Box } from '@components/box';
import { Animated } from 'react-native';
import { SkeletonPropsTw } from '@types';
import { AnimatedBox } from '@components/animatedBox';
import { useEffect, useRef, PropsWithChildren } from 'react';
import { isNativeWindInstalled, classNameHandler, classNamePropsHandler, cn, styleHandler } from '@utils';

import { skeletonTv } from '../styles/Skeleton.tw.styles';
import { skeletonSv } from '../styles/Skeleton.ss.styles';

/**
 * The `<Skeleton />` component provides loading placeholders with animated pulse effect.
 * Supports multiple variants and sizes for different content types.
 *
 *
 * <!-- STORYBOOK_IMPORT_START
 * ```tsx
 * import { Skeleton } from 'react-native-chill-ui';
 * ```
 * STORYBOOK_IMPORT_END -->
 *
 * @example
 * ```tsx
 * <Skeleton variant="rectangle" size="md" />
 * ```
 *
 * @param children - Child components to render inside the skeleton
 * @param className - Custom CSS classes for styling (NativeWind)
 * @param size - Size variant for the skeleton: 'xs' | 'sm' | 'md' | 'lg' | 'xl'
 * @param style - Style object for additional styling
 * @param variant - Shape variant for the skeleton: 'rectangle' | 'square' | 'circle' | 'text'
 */
export function Skeleton(props: PropsWithChildren<SkeletonPropsTw>) {
  classNamePropsHandler(props, 'Skeleton');
  const hasNativeWind = isNativeWindInstalled();
  const { children, className, size, style, variant, ...rest } = props;
  const pulseAnim = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    const pulse = () => {
      if (hasNativeWind) return;
      Animated.sequence([
        Animated.timing(pulseAnim, {
          duration: 1000,
          toValue: 0.5,
          useNativeDriver: true,
        }),
        Animated.timing(pulseAnim, {
          duration: 1000,
          toValue: 1,
          useNativeDriver: true,
        }),
      ]).start(() => pulse());
    };

    pulse();
  }, [pulseAnim, hasNativeWind]);

  const Component = hasNativeWind ? AnimatedBox : Box;

  return (
    <Component
      {...classNameHandler(cn(skeletonTv({ size, variant }), className))}
      {...styleHandler({ defaultStyle: [skeletonSv({ size, variant }), { opacity: pulseAnim }], style })}
      {...rest}
    >
      {children}
    </Component>
  );
}

Skeleton.displayName = 'Skeleton';
