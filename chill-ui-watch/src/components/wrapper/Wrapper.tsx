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

const containerClassName = (props: WrapperProps) => {
  const { className, ...rest } = props;
  return cn(WrapperVariants({ ...rest }), className);
};

function ViewComponent(props: WrapperProps, children: React.ReactNode) {
  return <Box className={containerClassName(props)}>{children}</Box>;
}

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

const IsSafeAreaViewComponent = (props: WrapperProps, children: React.ReactNode) => {
  const { edges, safeAreaView = false } = props;
  return safeAreaView || edges ? safeAreaViewComponents(props, children) : IsScrollComponent(props, children);
};

export default function Wrapper(props: WrapperProps) {
  const { children } = props;

  return IsSafeAreaViewComponent(props, children);
}
