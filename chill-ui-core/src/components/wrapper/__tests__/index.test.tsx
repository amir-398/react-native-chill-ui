import { render } from '@testing-library/react-native';

import { Wrapper, WrapperSafeAreaView, WrapperKeyboardAvoidingView, WrapperKeyboardAvoidingStickyView } from '../index';

describe('Wrapper Components Integration', () => {
  it('should render all wrapper components correctly', () => {
    const { getByTestId } = render(
      <Wrapper testID="wrapper">
        <WrapperSafeAreaView testID="safe-area-view">
          <WrapperKeyboardAvoidingView testID="keyboard-avoiding-view">
            <WrapperKeyboardAvoidingStickyView testID="keyboard-avoiding-sticky-view">
              <Wrapper testID="nested-wrapper">Content</Wrapper>
            </WrapperKeyboardAvoidingStickyView>
          </WrapperKeyboardAvoidingView>
        </WrapperSafeAreaView>
      </Wrapper>,
    );

    expect(getByTestId('wrapper')).toBeTruthy();
    expect(getByTestId('safe-area-view')).toBeTruthy();
    expect(getByTestId('keyboard-avoiding-view')).toBeTruthy();
    expect(getByTestId('keyboard-avoiding-sticky-view')).toBeTruthy();
    expect(getByTestId('nested-wrapper')).toBeTruthy();
  });

  it('should render with all props combined', () => {
    const { getByTestId } = render(
      <Wrapper
        fill
        grow
        px="lg"
        className="custom-wrapper"
        style={{ backgroundColor: '#f0f0f0' }}
        hasSafeArea
        edges={['top', 'bottom']}
        testID="wrapper"
      >
        <WrapperSafeAreaView
          fill
          grow
          px="sm"
          className="custom-safe-area"
          style={{ backgroundColor: '#f8f8f8' }}
          edges={['top', 'bottom', 'left', 'right']}
          emulateUnlessSupported
          testID="safe-area-view"
        >
          <WrapperKeyboardAvoidingView
            fill
            grow
            px="xs"
            className="custom-keyboard-avoiding"
            style={{ backgroundColor: '#e8e8e8' }}
            behavior="padding"
            keyboardVerticalOffset={20}
            enabled
            contentContainerStyle={{ padding: 16 }}
            hasSafeArea
            edges={['top']}
            testID="keyboard-avoiding-view"
          >
            <WrapperKeyboardAvoidingStickyView
              fill
              grow
              px="xl"
              className="custom-sticky"
              style={{ backgroundColor: '#c8c8c8' }}
              enabled
              offset={{ close: 0, open: 20 }}
              hasSafeArea
              edges={['left', 'right']}
              testID="keyboard-avoiding-sticky-view"
            >
              <Wrapper
                fill
                grow
                className="final-wrapper"
                style={{ backgroundColor: '#b8b8b8' }}
                testID="final-wrapper"
              >
                Final Content
              </Wrapper>
            </WrapperKeyboardAvoidingStickyView>
          </WrapperKeyboardAvoidingView>
        </WrapperSafeAreaView>
      </Wrapper>,
    );

    expect(getByTestId('wrapper')).toBeTruthy();
    expect(getByTestId('safe-area-view')).toBeTruthy();
    expect(getByTestId('keyboard-avoiding-view')).toBeTruthy();
    expect(getByTestId('keyboard-avoiding-sticky-view')).toBeTruthy();
    expect(getByTestId('final-wrapper')).toBeTruthy();
  });

  it('should handle accessibility props correctly', () => {
    const { getByTestId } = render(
      <Wrapper accessible accessibilityLabel="Main wrapper" testID="wrapper">
        <WrapperSafeAreaView accessible accessibilityLabel="Safe area content" testID="safe-area-view">
          Content
        </WrapperSafeAreaView>
      </Wrapper>,
    );

    expect(getByTestId('wrapper')).toBeTruthy();
    expect(getByTestId('safe-area-view')).toBeTruthy();
  });

  it('should handle keyboard components with all keyboard props', () => {
    const { getByTestId } = render(
      <WrapperKeyboardAvoidingView
        behavior="padding"
        keyboardVerticalOffset={30}
        enabled
        contentContainerStyle={{ padding: 20 }}
        testID="keyboard-avoiding-view"
      >
        <WrapperKeyboardAvoidingStickyView
          enabled
          offset={{ close: 10, open: 30 }}
          testID="keyboard-avoiding-sticky-view"
        >
          Keyboard Content
        </WrapperKeyboardAvoidingStickyView>
      </WrapperKeyboardAvoidingView>,
    );

    expect(getByTestId('keyboard-avoiding-view')).toBeTruthy();
    expect(getByTestId('keyboard-avoiding-sticky-view')).toBeTruthy();
  });
});
