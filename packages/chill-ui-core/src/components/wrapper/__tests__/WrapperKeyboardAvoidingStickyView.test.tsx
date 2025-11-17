import { render } from '@testing-library/react-native';

import { WrapperKeyboardAvoidingStickyView } from '../components/WrapperKeyboardAvoidingStickyView.hybrid';

describe('WrapperKeyboardAvoidingStickyView Component', () => {
  it('should render basic keyboard avoiding sticky view correctly', () => {
    const { getByTestId } = render(
      <WrapperKeyboardAvoidingStickyView testID="keyboard-avoiding-sticky-view">
        Content
      </WrapperKeyboardAvoidingStickyView>,
    );
    expect(getByTestId('keyboard-avoiding-sticky-view')).toBeTruthy();
  });

  it('should render with fill prop', () => {
    const { getByTestId } = render(
      <WrapperKeyboardAvoidingStickyView fill testID="keyboard-avoiding-sticky-view">
        Content
      </WrapperKeyboardAvoidingStickyView>,
    );
    expect(getByTestId('keyboard-avoiding-sticky-view')).toBeTruthy();
  });

  it('should render with grow prop', () => {
    const { getByTestId } = render(
      <WrapperKeyboardAvoidingStickyView grow testID="keyboard-avoiding-sticky-view">
        Content
      </WrapperKeyboardAvoidingStickyView>,
    );
    expect(getByTestId('keyboard-avoiding-sticky-view')).toBeTruthy();
  });

  it('should render with px prop', () => {
    const { getByTestId } = render(
      <WrapperKeyboardAvoidingStickyView px="md" testID="keyboard-avoiding-sticky-view">
        Content
      </WrapperKeyboardAvoidingStickyView>,
    );
    expect(getByTestId('keyboard-avoiding-sticky-view')).toBeTruthy();
  });

  it('should render with custom className', () => {
    const { getByTestId } = render(
      <WrapperKeyboardAvoidingStickyView className="custom-class" testID="keyboard-avoiding-sticky-view">
        Content
      </WrapperKeyboardAvoidingStickyView>,
    );
    expect(getByTestId('keyboard-avoiding-sticky-view')).toBeTruthy();
  });

  it('should render with custom style', () => {
    const { getByTestId } = render(
      <WrapperKeyboardAvoidingStickyView style={{ marginBottom: 8 }} testID="keyboard-avoiding-sticky-view">
        Content
      </WrapperKeyboardAvoidingStickyView>,
    );
    expect(getByTestId('keyboard-avoiding-sticky-view')).toBeTruthy();
  });

  it('should render with enabled prop', () => {
    const { getByTestId } = render(
      <WrapperKeyboardAvoidingStickyView enabled={false} testID="keyboard-avoiding-sticky-view">
        Content
      </WrapperKeyboardAvoidingStickyView>,
    );
    expect(getByTestId('keyboard-avoiding-sticky-view')).toBeTruthy();
  });

  it('should render with offset prop', () => {
    const { getByTestId } = render(
      <WrapperKeyboardAvoidingStickyView offset={{ close: 0, open: 20 }} testID="keyboard-avoiding-sticky-view">
        Content
      </WrapperKeyboardAvoidingStickyView>,
    );
    expect(getByTestId('keyboard-avoiding-sticky-view')).toBeTruthy();
  });

  it('should render with hasSafeArea prop', () => {
    const { getByTestId } = render(
      <WrapperKeyboardAvoidingStickyView hasSafeArea edges={['top', 'bottom']} testID="keyboard-avoiding-sticky-view">
        Content
      </WrapperKeyboardAvoidingStickyView>,
    );
    expect(getByTestId('keyboard-avoiding-sticky-view')).toBeTruthy();
  });

  it('should render with edges prop', () => {
    const { getByTestId } = render(
      <WrapperKeyboardAvoidingStickyView
        hasSafeArea
        edges={['top', 'left', 'right', 'bottom']}
        testID="keyboard-avoiding-sticky-view"
      >
        Content
      </WrapperKeyboardAvoidingStickyView>,
    );
    expect(getByTestId('keyboard-avoiding-sticky-view')).toBeTruthy();
  });

  it('should render with children', () => {
    const { getByTestId } = render(
      <WrapperKeyboardAvoidingStickyView testID="keyboard-avoiding-sticky-view">
        <WrapperKeyboardAvoidingStickyView testID="child-keyboard-avoiding-sticky-view">
          Child content
        </WrapperKeyboardAvoidingStickyView>
      </WrapperKeyboardAvoidingStickyView>,
    );
    expect(getByTestId('keyboard-avoiding-sticky-view')).toBeTruthy();
    expect(getByTestId('child-keyboard-avoiding-sticky-view')).toBeTruthy();
  });

  it('should render with testID', () => {
    const { getByTestId } = render(
      <WrapperKeyboardAvoidingStickyView testID="keyboard-avoiding-sticky-view-test">
        Content
      </WrapperKeyboardAvoidingStickyView>,
    );
    expect(getByTestId('keyboard-avoiding-sticky-view-test')).toBeTruthy();
  });

  it('should render with accessibility props', () => {
    const { getByTestId } = render(
      <WrapperKeyboardAvoidingStickyView
        accessible
        accessibilityLabel="Keyboard avoiding sticky container"
        testID="keyboard-avoiding-sticky-view"
      >
        Content
      </WrapperKeyboardAvoidingStickyView>,
    );
    expect(getByTestId('keyboard-avoiding-sticky-view')).toBeTruthy();
  });

  it('should render with all props combined', () => {
    const { getByTestId } = render(
      <WrapperKeyboardAvoidingStickyView
        fill
        grow
        px="lg"
        className="custom-class"
        style={{ marginBottom: 16 }}
        enabled
        offset={{ close: 0, open: 20 }}
        hasSafeArea
        edges={['top', 'bottom']}
        testID="keyboard-avoiding-sticky-view"
        accessible
        accessibilityLabel="Custom keyboard avoiding sticky view"
      >
        Content
      </WrapperKeyboardAvoidingStickyView>,
    );
    expect(getByTestId('keyboard-avoiding-sticky-view')).toBeTruthy();
  });

  it('should render with no children', () => {
    const { getByTestId } = render(<WrapperKeyboardAvoidingStickyView testID="keyboard-avoiding-sticky-view" />);
    const keyboardAvoidingStickyView = getByTestId('keyboard-avoiding-sticky-view');
    expect(keyboardAvoidingStickyView).toBeTruthy();
  });
});
