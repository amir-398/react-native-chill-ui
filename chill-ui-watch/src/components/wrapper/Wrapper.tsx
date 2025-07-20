import { Platform, ScrollView } from 'react-native';

import cn from '../cn';
import { Box } from '../box';
import { WrapperProps } from '../../types';
import WrapperVariants from './styleVariants';

// Optional imports with error handling
let KeyboardAvoidingView: any;
let KeyboardAwareScrollView: any;
let SafeAreaView: any;

try {
  // @ts-ignore
  const keyboardController = require('react-native-keyboard-controller');
  if (keyboardController) {
    KeyboardAvoidingView = keyboardController.KeyboardAvoidingView;
    KeyboardAwareScrollView = keyboardController.KeyboardAwareScrollView;
  }
} catch {
  console.warn(
    'react-native-keyboard-controller is not installed. To use keyboardAwareScrollView, please install it: npm install react-native-keyboard-controller',
  );
}

try {
  const safeAreaContext = require('react-native-safe-area-context');
  if (safeAreaContext) {
    SafeAreaView = safeAreaContext.SafeAreaView;
  }
} catch {
  console.warn(
    'react-native-safe-area-context is not installed. To use SafeAreaView or edges, please install it: npm install react-native-safe-area-context',
  );
}

/**
 * Generates container className by merging wrapper variants with custom className
 * @param props - WrapperProps object containing styling and behavior props
 * @returns Merged className string
 */
const containerClassName = (props: WrapperProps) => {
  const { className, ...rest } = props;
  return cn(WrapperVariants({ ...rest }), className);
};

/**
 * Renders a basic view component with wrapper styling
 * @param props - WrapperProps configuration
 * @param children - Child components to render
 * @returns Box component with wrapper styling
 */
function ViewComponent(props: WrapperProps, children: React.ReactNode) {
  return <Box className={containerClassName(props)}>{children}</Box>;
}

/**
 * Renders a ScrollView component with wrapper styling and keyboard handling
 * @param props - WrapperProps configuration
 * @param children - Child components to render
 * @returns ScrollView component with wrapper styling
 */
function ScrollViewComponent(props: WrapperProps, children: React.ReactNode) {
  const { nestedScrollEnabled } = props;
  return (
    <ScrollView
      contentContainerClassName={containerClassName(props)}
      keyboardShouldPersistTaps="always"
      nestedScrollEnabled={nestedScrollEnabled ?? false}
    >
      {children}
    </ScrollView>
  );
}

/**
 * Renders a KeyboardAwareScrollView component for better keyboard handling
 * @param props - WrapperProps configuration
 * @param children - Child components to render
 * @returns KeyboardAwareScrollView or fallback to ScrollView
 */
function KeyboardAwareScrollViewComponent(props: WrapperProps, children: React.ReactNode) {
  if (!KeyboardAwareScrollView) {
    console.error(
      'react-native-keyboard-controller is not installed. To use keyboardAwareScrollView, please install it: npm install react-native-keyboard-controller',
    );
    return ScrollViewComponent(props, children);
  }

  return (
    <KeyboardAwareScrollView
      contentContainerClassName={containerClassName(props)}
      keyboardShouldPersistTaps="handled"
      bottomOffset={20}
    >
      {children}
    </KeyboardAwareScrollView>
  );
}

/**
 * Renders a KeyboardAvoidingView component for keyboard avoidance
 * @param props - WrapperProps configuration
 * @param children - Child components to render
 * @returns KeyboardAvoidingView or fallback to View
 */
function KeyboardAvoidingViewComponent(props: WrapperProps, children: React.ReactNode) {
  if (!KeyboardAvoidingView) {
    console.error(
      'react-native-keyboard-controller is not installed. To use keyboardAvoidingView, please install it: npm install react-native-keyboard-controller',
    );
    return ViewComponent(props, children);
  }

  const { scrollView } = props;
  return (
    <KeyboardAvoidingView className={containerClassName(props)} behavior="padding" keyboardVerticalOffset={10}>
      {scrollView ? ScrollViewComponent(props, children) : children}
    </KeyboardAvoidingView>
  );
}

/**
 * Determines which scroll component to render based on props
 * @param props - WrapperProps configuration
 * @param children - Child components to render
 * @returns Appropriate scroll component based on props
 */
const IsScrollComponent = (props: WrapperProps, children: React.ReactNode) => {
  if (props.keyboardAwareScrollView) {
    return KeyboardAwareScrollViewComponent(props, children);
  }
  if (props.keyboardAvoidingView) {
    return KeyboardAvoidingViewComponent(props, children);
  }
  if (props.scrollView) {
    return ScrollViewComponent(props, children);
  }
  return ViewComponent(props, children);
};

/**
 * Renders SafeAreaView component with proper styling and edges
 * @param props - WrapperProps configuration
 * @param children - Child components to render
 * @returns SafeAreaView or fallback to scroll component
 */
const safeAreaViewComponents = (props: WrapperProps, children: React.ReactNode) => {
  if (!SafeAreaView) {
    console.error(
      'react-native-safe-area-context is not installed. To use safeAreaView or edges, please install it: npm install react-native-safe-area-context',
    );
    return IsScrollComponent(props, children);
  }

  const { edges } = props;
  return (
    <SafeAreaView className={cn('z-50 flex-1', Platform.OS === 'android' && 'mb-2 mt-2')} edges={edges || undefined}>
      {IsScrollComponent(props, children)}
    </SafeAreaView>
  );
};

/**
 * Determines whether to use SafeAreaView based on props
 * @param props - WrapperProps configuration
 * @param children - Child components to render
 * @returns SafeAreaView component or scroll component
 */
const IsSafeAreaViewComponent = (props: WrapperProps, children: React.ReactNode) => {
  const { edges, safeAreaView = false } = props;
  return safeAreaView || edges ? safeAreaViewComponents(props, children) : IsScrollComponent(props, children);
};

/**
 * Wrapper component that provides flexible container functionality with multiple behavior options.
 * Supports safe area handling, keyboard avoidance, scrolling, and customizable styling.
 * Automatically handles optional dependencies with graceful fallbacks.
 *
 * @example
 * ```tsx
 * // Basic wrapper with default styling
 * <Wrapper>
 *   <String>Content</String>
 * </Wrapper>
 *
 * // Scrollable wrapper with custom padding
 * <Wrapper scrollView px={6} py={4}>
 *   <String>Scrollable content</String>
 * </Wrapper>
 *
 * // Safe area wrapper with keyboard avoidance
 * <Wrapper safeAreaView keyboardAvoidingView>
 *   <Input placeholder="Type here" />
 * </Wrapper>
 *
 * // Advanced wrapper with all features
 * <Wrapper
 *   safeAreaView
 *   keyboardAwareScrollView
 *   px={4}
 *   py={6}
 *   className="bg-gray-100"
 * >
 *   <String>Advanced content</String>
 * </Wrapper>
 * ```
 *
 * @param props - WrapperProps configuration object
 * @param children - Child components to render inside the wrapper
 * @returns Wrapper component with appropriate behavior and styling
 */
export default function Wrapper(props: WrapperProps) {
  const { children } = props;

  return IsSafeAreaViewComponent(props, children);
}
