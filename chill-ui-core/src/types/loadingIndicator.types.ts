import type { ViewProps } from 'react-native';

/**
 * Base props for loading indicators
 */
export interface LoadingIndicatorsProps extends ViewProps {
  /** Size of the loading indicator */
  size?: number;
  /** Color of the loading indicator */
  color?: string;
  /** Whether the animation is running */
  animating?: boolean;
  /** Whether to hide when stopped */
  hidesWhenStopped?: boolean;
}

/**
 * Available loading indicator types
 */
export type LoadingIndicatorType =
  | 'bounce'
  | 'chase'
  | 'circleFade'
  | 'flow'
  | 'fold'
  | 'grid'
  | 'pulse'
  | 'spinner'
  | 'swing'
  | 'wander';

/**
 * Props for the LoadingIndicator component
 */
export type LoadingIndicatorProps = LoadingIndicatorsProps & {
  /** Type of loading indicator to display */
  name: LoadingIndicatorType;
};
