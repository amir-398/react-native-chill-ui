import { VariantProps } from '@utils';
import { ViewProps } from 'react-native';
import { skeletonSv } from '@components/skeleton/styles/Skeleton.ss.styles';

/**
 * Props for the Skeleton component
 */
export type SkeletonProps = VariantProps<typeof skeletonSv> & ViewProps;
