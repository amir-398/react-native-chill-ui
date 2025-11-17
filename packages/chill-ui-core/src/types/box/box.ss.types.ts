import type { ViewProps as NativeViewProps } from 'react-native';

export type BoxProps = NativeViewProps & {
  /**
   * Boolean prop to enable fast view rendering
   */
  useFastView?: boolean;
};
