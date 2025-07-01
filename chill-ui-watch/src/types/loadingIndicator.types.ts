import type { ViewProps } from 'react-native';

export interface LoadingIndicatorsProps extends ViewProps {
  size?: number;
  color?: string;
  animating?: boolean;
  hidesWhenStopped?: boolean;
}

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

export type LoadingIndicatorProps = LoadingIndicatorsProps & {
  name: LoadingIndicatorType;
};
