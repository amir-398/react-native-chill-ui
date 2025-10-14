import { VariantProps } from '@utils';
import { ViewProps } from 'react-native';
import { skeletonTv } from '@components/skeletons/styles/Skeleton.tw.styles';

/**
 * Props for the Skeleton component
 */
export type SkeletonProps = VariantProps<typeof skeletonTv> &
  ViewProps & {
    /** Custom CSS classes for the skeleton */
    className?: string;
  };
