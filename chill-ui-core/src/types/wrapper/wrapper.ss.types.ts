import type { ScrollViewProps, StyleProp, ViewProps, ViewStyle } from 'react-native';

import { VariantProps } from '@utils';
import { wrapperSv } from '@components/wrapper/styles/Wrapper.ss.styles';

/**
 * Base props for Wrapper components (StyleSheet)
 */
export type WrapperBaseProps = ViewProps &
  VariantProps<typeof wrapperSv> & {
    /** Style prop */
    style?: StyleProp<ViewStyle>;
  };

/**
 * Props for Wrapper component (basic container)
 */
export type WrapperProps = WrapperBaseProps;

/**
 * Props for WrapperScrollView component
 */
export type WrapperScrollViewProps = WrapperBaseProps & ScrollViewProps;

/**
 * Props for WrapperSafeAreaView component
 */
export type WrapperSafeAreaViewProps = WrapperBaseProps & {
  edges?: ('top' | 'right' | 'bottom' | 'left')[];
  emulateUnlessSupported?: boolean;
};

/**
 * Props for WrapperKeyboardAvoidingView component
 */
export type WrapperKeyboardAvoidingViewProps = WrapperBaseProps & {
  /** Keyboard vertical offset */
  keyboardVerticalOffset?: number;
  /** Behavior of the keyboard avoiding view */
  behavior?: 'height' | 'position' | 'padding' | 'translate-with-padding';
  /** Whether the keyboard avoiding view is enabled */
  enabled?: boolean;
  /** Content container style */
  contentContainerStyle?: StyleProp<ViewStyle>;
};

/**
 * Props for WrapperKeyboardAwareScrollView component
 */
export type WrapperKeyboardAwareScrollViewProps = WrapperBaseProps & {
  /** Bottom offset for keyboard */
  bottomOffset?: number;
  /** Content container style */
  contentContainerStyle?: StyleProp<ViewStyle>;
  /** Keyboard should persist taps */
  keyboardShouldPersistTaps?: 'always' | 'never' | 'handled';
};
