import { ViewProps } from 'react-native';
import { VariantProps } from 'tailwind-variants';
import { skeletonTv } from '@components/skeleton/styles/Skeleton.tw.styles';

/**
 * Props for the Skeleton component
 */
export type SkeletonProps = VariantProps<typeof skeletonTv> &
  ViewProps & {
    /** Custom CSS classes for the skeleton */
    className?: string;
  };
