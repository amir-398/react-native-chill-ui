import { ComponentType } from 'react';
import { VariantProps } from 'tailwind-variants';
import { wrapperTv } from '@components/wrapper/styles/Wrapper.tw.styles';
import { StyleProp, ViewStyle, ViewProps, ScrollViewProps } from 'react-native';

/**
 * Base props for Wrapper components
 */
export type WrapperBaseProps = ViewProps &
  VariantProps<typeof wrapperTv> & {
    /** Custom CSS classes for the wrapper */
    className?: string;
    /** Whether to wrap content in SafeAreaView */
    hasSafeArea?: boolean;
    /** Safe area edges to apply when hasSafeArea is true */
    edges?: ('top' | 'right' | 'bottom' | 'left')[];
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
 * Props for WrapperKeyboardAvoidingStickyView component
 */
export type WrapperKeyboardAvoidingStickyViewProps = WrapperBaseProps & {
  /** Whether the keyboard avoiding sticky view is enabled */
  enabled?: boolean;

  /** Offset for the keyboard avoiding sticky view */
  offset?: { close: number; open: number };
};

/**
 * Props for WrapperKeyboardAwareScrollView component
 */
export type WrapperKeyboardAwareScrollViewProps = WrapperBaseProps &
  ScrollViewProps & {
    /** Bottom offset for keyboard */
    bottomOffset?: number;
    /** Content container className */
    contentContainerClassName?: string;

    /** ScrollView component */
    ScrollViewComponent?: ComponentType<ScrollViewProps>;

    /** Disable scroll on keyboard hide */
    disableScrollOnKeyboardHid?: boolean;

    /** Whether the keyboard aware scroll view is enabled */
    enabled?: boolean;

    /** Extra keyboard space */
    extraKeyboardSpace?: number;
  };
