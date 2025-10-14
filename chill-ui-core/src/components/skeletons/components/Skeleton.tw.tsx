import { cn } from '@utils';
import { BoxTw } from '@components/box';
import { SkeletonPropsTw } from '@types';
import { PropsWithChildren } from 'react';

import { skeletonTv } from '../styles/Skeleton.tw.styles';

/**
 * Skeleton component that provides loading placeholders with animated pulse effect.
 * Supports multiple variants and sizes for different content types.
 *
 * @example
 * ```tsx
 * // Basic rectangle skeleton
 * <Skeleton variant="rectangle" size="md" />
 * ```
 *
 * @param children - Child components to render inside the skeleton
 * @param className - Custom CSS classes for additional styling
 * @param size - Size variant for the skeleton ('xs' | 'sm' | 'md' | 'lg' | 'xl')
 * @param variant - Shape variant for the skeleton ('rectangle' | 'square' | 'circle' | 'text')
 * @returns Skeleton component with animated pulse effect
 */
export function Skeleton(props: PropsWithChildren<SkeletonPropsTw>) {
  const { children, className, size, variant, ...rest } = props;

  return (
    <BoxTw className={cn(skeletonTv({ size, variant }), className)} {...rest}>
      {children}
    </BoxTw>
  );
}

Skeleton.displayName = 'Skeleton';
