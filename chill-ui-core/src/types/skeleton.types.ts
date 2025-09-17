/**
 * Props for the Skeleton component
 */
export interface SkeletonProps {
  /** Custom CSS classes for the skeleton */
  className?: string;
  /** Child components to render inside the skeleton */
  children?: React.ReactNode;
  /** Size variant of the skeleton */
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  /** Visual variant of the skeleton */
  variant?: 'rectangle' | 'circle' | 'square' | 'text';
}
