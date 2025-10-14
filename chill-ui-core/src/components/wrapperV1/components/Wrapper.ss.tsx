import { BoxSs } from '@components/box';
import { WrapperPropsSs } from '@types';
import { ScrollView } from 'react-native';
import { PropsWithChildren } from 'react';

import { styles } from '../styles/Wrapper.ss.styles';

// Optional imports with error handling
let KeyboardAvoidingView: any;
let KeyboardAwareScrollView: any;
let SafeAreaView: any;

try {
  // eslint-disable-next-line
  const keyboardController = require('react-native-keyboard-controller');
  if (keyboardController) {
    KeyboardAvoidingView = keyboardController.KeyboardAvoidingView;
    KeyboardAwareScrollView = keyboardController.KeyboardAwareScrollView;
  }
} catch {
  console.warn(
    'react-native-keyboard-controller is not installed. To use hasKeyboardAwareScrollView, please install it: npm install react-native-keyboard-controller',
  );
}

try {
  // eslint-disable-next-line
  const safeAreaContext = require('react-native-safe-area-context');
  if (safeAreaContext) {
    SafeAreaView = safeAreaContext.SafeAreaView;
  }
} catch {
  console.warn(
    'react-native-safe-area-context is not installed. To use hasSafeAreaView or edges, please install it: npm install react-native-safe-area-context',
  );
}

/**
 * Renders a basic view component with wrapper styling
 * @param props - WrapperPropsSs configuration
 * @param children - Child components to render
 * @returns Box component with wrapper styling
 */
function ViewComponent(props: WrapperPropsSs, children: React.ReactNode) {
  const { style } = props;

  return <BoxSs style={[styles.container, style]}>{children}</BoxSs>;
}

/**
 * Renders a ScrollView component with wrapper styling and keyboard handling
 * @param props - WrapperPropsSs configuration
 * @param children - Child components to render
 * @returns ScrollView component with wrapper styling
 */
function ScrollViewComponent(props: WrapperPropsSs, children: React.ReactNode) {
  const { nestedScrollEnabled, style } = props;

  return (
    <ScrollView
      contentContainerStyle={[styles.scrollView, style]}
      keyboardShouldPersistTaps="always"
      nestedScrollEnabled={nestedScrollEnabled ?? false}
    >
      {children}
    </ScrollView>
  );
}

/**
 * Renders a KeyboardAwareScrollView component for better keyboard handling
 * @param props - WrapperPropsSs configuration
 * @param children - Child components to render
 * @returns KeyboardAwareScrollView or fallback to ScrollView
 */
function KeyboardAwareScrollViewComponent(props: WrapperPropsSs, children: React.ReactNode) {
  const { style } = props;

  if (!KeyboardAwareScrollView) {
    console.error(
      'react-native-keyboard-controller is not installed. To use hasKeyboardAwareScrollView, please install it: npm install react-native-keyboard-controller',
    );
    return ScrollViewComponent(props, children);
  }

  return (
    <KeyboardAwareScrollView
      contentContainerStyle={[styles.scrollView, style]}
      keyboardShouldPersistTaps="handled"
      bottomOffset={20}
    >
      {children}
    </KeyboardAwareScrollView>
  );
}

/**
 * Renders a KeyboardAvoidingView component for keyboard avoidance
 * @param props - WrapperPropsSs configuration
 * @param children - Child components to render
 * @returns KeyboardAvoidingView or fallback to View
 */
function KeyboardAvoidingViewComponent(props: WrapperPropsSs, children: React.ReactNode) {
  const { hasScrollView, style } = props;

  if (!KeyboardAvoidingView) {
    console.error(
      'react-native-keyboard-controller is not installed. To use hasKeyboardAvoidingView, please install it: npm install react-native-keyboard-controller',
    );
    return ViewComponent(props, children);
  }

  return (
    <KeyboardAvoidingView style={[styles.keyboardAvoidingView, style]} behavior="padding" keyboardVerticalOffset={10}>
      {hasScrollView ? ScrollViewComponent(props, children) : children}
    </KeyboardAvoidingView>
  );
}

/**
 * Determines which scroll component to render based on props
 * @param props - WrapperPropsSs configuration
 * @param children - Child components to render
 * @returns Appropriate scroll component based on props
 */
const IsScrollComponent = (props: WrapperPropsSs, children: React.ReactNode) => {
  if (props.hasKeyboardAwareScrollView) {
    return KeyboardAwareScrollViewComponent(props, children);
  }
  if (props.hasKeyboardAvoidingView) {
    return KeyboardAvoidingViewComponent(props, children);
  }
  if (props.hasScrollView) {
    return ScrollViewComponent(props, children);
  }
  return ViewComponent(props, children);
};

/**
 * Renders SafeAreaView component with proper styling and edges
 * @param props - WrapperPropsSs configuration
 * @param children - Child components to render
 * @returns SafeAreaView or fallback to scroll component
 */
const safeAreaViewComponents = (props: WrapperPropsSs, children: React.ReactNode) => {
  if (!SafeAreaView) {
    console.error(
      'react-native-safe-area-context is not installed. To use hasSafeAreaView or edges, please install it: npm install react-native-safe-area-context',
    );
    return IsScrollComponent(props, children);
  }

  const { edges, style } = props;

  return (
    <SafeAreaView style={[styles.safeArea, style]} edges={edges ?? ['top', 'bottom', 'left', 'right']}>
      {IsScrollComponent(props, children)}
    </SafeAreaView>
  );
};

/**
 * Determines whether to use SafeAreaView based on props
 * @param props - WrapperPropsSs configuration
 * @param children - Child components to render
 * @returns SafeAreaView component or scroll component
 */
const IsSafeAreaViewComponent = (props: WrapperPropsSs, children: React.ReactNode) => {
  const { edges, hasSafeAreaView = false } = props;
  return hasSafeAreaView || edges ? safeAreaViewComponents(props, children) : IsScrollComponent(props, children);
};

/**
 * Wrapper component that provides flexible container functionality with multiple behavior options.
 * Supports safe area handling, keyboard avoidance, scrolling, and customizable styling.
 *
 * @example
 * ```tsx
 * // Basic wrapper with default styling
 * <Wrapper>
 *   <String>Content</String>
 * </Wrapper>
 * ```
 *
 * @param hasScrollView - Whether to use ScrollView
 * @param hasSafeAreaView - Whether to use SafeAreaView
 * @param nestedScrollEnabled - Whether nested scrolling is enabled
 * @param hasKeyboardAvoidingView - Whether to use KeyboardAvoidingView
 * @param hasKeyboardAwareScrollView - Whether to use KeyboardAwareScrollView
 * @param edges - Safe area edges to apply
 * @param style - Style prop
 * @returns Wrapper component with appropriate behavior and styling
 */
export function Wrapper(props: PropsWithChildren<WrapperPropsSs>) {
  const { children } = props;

  return IsSafeAreaViewComponent(props, children);
}

Wrapper.displayName = 'Wrapper';
