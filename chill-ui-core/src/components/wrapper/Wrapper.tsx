import { cn } from '@utils';
import { ScrollView, StyleSheet } from 'react-native';

import { classNameHandler, styleHandler } from '@/utils/hybrid/propsHandlers';

import { Box } from '../box';
import { WrapperProps } from '../../types/wrapper.types';
import { isNativeWindInstalled } from '../../utils/hybrid/nativewindDetector';
import { classNamePropsHandler } from '../../utils/hybrid/classNamePropsHandler';

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
 * Generates container className by merging custom className
 * @param props - WrapperProps object containing styling and behavior props
 * @returns Merged className string
 */
const containerClassName = (props: WrapperProps) => {
  const { className } = props;
  return cn('flex-grow', className);
};

/**
 * Renders a basic view component with wrapper styling
 * @param props - WrapperProps configuration
 * @param children - Child components to render
 * @returns Box component with wrapper styling
 */
function ViewComponent(props: WrapperProps, children: React.ReactNode) {
  return (
    <Box {...classNameHandler(containerClassName(props))} style={{ flexGrow: 1 }}>
      {children}
    </Box>
  );
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
      contentContainerStyle={{ flexGrow: 1 }}
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
      'react-native-keyboard-controller is not installed. To use hasKeyboardAwareScrollView, please install it: npm install react-native-keyboard-controller',
    );
    return ScrollViewComponent(props, children);
  }

  const isNativeWind = isNativeWindInstalled();

  if (isNativeWind) {
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

  return (
    <KeyboardAwareScrollView
      contentContainerStyle={{ flexGrow: 1 }}
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
      'react-native-keyboard-controller is not installed. To use hasKeyboardAvoidingView, please install it: npm install react-native-keyboard-controller',
    );
    return ViewComponent(props, children);
  }

  const { hasScrollView } = props;

  return (
    <KeyboardAvoidingView
      {...classNameHandler(containerClassName(props))}
      behavior="padding"
      keyboardVerticalOffset={10}
    >
      {hasScrollView ? ScrollViewComponent(props, children) : children}
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
 * @param props - WrapperProps configuration
 * @param children - Child components to render
 * @returns SafeAreaView or fallback to scroll component
 */
const safeAreaViewComponents = (props: WrapperProps, children: React.ReactNode) => {
  if (!SafeAreaView) {
    console.error(
      'react-native-safe-area-context is not installed. To use hasSafeAreaView or edges, please install it: npm install react-native-safe-area-context',
    );
    return IsScrollComponent(props, children);
  }

  const { edges } = props;

  const safeAreaStyle = StyleSheet.create({
    container: {
      flex: 1,
      paddingHorizontal: 16,
      zIndex: 50,
      // @ts-ignore
      ...(props.style ?? {}),
    },
  });
  return (
    <SafeAreaView
      {...classNameHandler(cn('z-50 flex-1 px-3'))}
      {...styleHandler({ defaultStyle: safeAreaStyle.container })}
      edges={edges ?? ['top', 'bottom', 'left', 'right']}
    >
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
  const { edges, hasSafeAreaView = false } = props;
  return hasSafeAreaView || edges ? safeAreaViewComponents(props, children) : IsScrollComponent(props, children);
};

/**
 * Wrapper component that provides flexible container functionality with multiple behavior options.
 * Supports safe area handling, keyboard avoidance, scrolling, and customizable styling.
 * Automatically detects NativeWind availability and falls back to StyleSheet if needed.
 *
 * @example
 * ```tsx
 * // With NativeWind
 * <Wrapper className="bg-gray-100">
 *   <String>Content with NativeWind</String>
 * </Wrapper>
 *
 * // Without NativeWind (fallback)
 * <Wrapper>
 *   <String>Content with StyleSheet fallback</String>
 * </Wrapper>
 *
 * // Basic wrapper with default styling
 * <Wrapper>
 *   <String>Content</String>
 * </Wrapper>
 *
 * // Scrollable wrapper
 * <Wrapper hasScrollView>
 *   <String>Scrollable content</String>
 * </Wrapper>
 *
 * // Safe area wrapper with keyboard avoidance
 * <Wrapper hasSafeAreaView hasKeyboardAvoidingView>
 *   <Input placeholder="Type here" />
 * </Wrapper>
 *
 * // Advanced wrapper with all features
 * <Wrapper
 *   hasSafeAreaView
 *   hasKeyboardAwareScrollView
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
  classNamePropsHandler(props, 'Wrapper');

  const { children } = props;

  return IsSafeAreaViewComponent(props, children);
}
