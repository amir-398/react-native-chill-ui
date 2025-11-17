import { Animated } from 'react-native';
import { SkeletonPropsSs } from '@types';
import { AnimatedBoxSs } from '@components/animatedBox';
import { useEffect, useRef, PropsWithChildren } from 'react';

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
 * @param size - Size variant for the skeleton ('xs' | 'sm' | 'md' | 'lg' | 'xl')
 * @param style - Style object for additional styling
 * @param variant - Shape variant for the skeleton ('rectangle' | 'square' | 'circle' | 'text')
 * @returns Skeleton component with animated pulse effect
 */
export function Skeleton(props: PropsWithChildren<SkeletonPropsSs>) {
  const { children, size, style, variant, ...rest } = props;
  const pulseAnim = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    const pulse = () => {
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
  }, [pulseAnim]);

  return (
    <AnimatedBoxSs style={[skeletonSv({ size, variant }), { opacity: pulseAnim }, style]} {...rest}>
      {children}
    </AnimatedBoxSs>
  );
}

Skeleton.displayName = 'Skeleton';
