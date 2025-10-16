import type { ViewProps as NativeViewProps } from 'react-native';

export type BoxProps = NativeViewProps & {
  useFastView?: boolean;
};
