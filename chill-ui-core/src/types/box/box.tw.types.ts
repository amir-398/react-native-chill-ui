import { ViewProps } from 'react-native';

export interface BoxProps extends ViewProps {
  /**
   * Custom CSS classes for the box container
   */
  className?: string;
  /**
   * Boolean prop to enable fast view rendering
   */
  useFastView?: boolean;
}
