import { render } from '@testing-library/react-native';

import { WrapperKeyboardAvoidingStickyView } from '../components/WrapperKeyboardAvoidingStickyView.hybrid';

describe('WrapperKeyboardAvoidingStickyView Snapshots', () => {
  it('should match snapshot with basic props', () => {
    const tree = render(<WrapperKeyboardAvoidingStickyView>Content</WrapperKeyboardAvoidingStickyView>);
    expect(tree).toMatchSnapshot();
  });

  it('should match snapshot with fill prop', () => {
    const tree = render(<WrapperKeyboardAvoidingStickyView fill>Content</WrapperKeyboardAvoidingStickyView>);
    expect(tree).toMatchSnapshot();
  });

  it('should match snapshot with grow prop', () => {
    const tree = render(<WrapperKeyboardAvoidingStickyView grow>Content</WrapperKeyboardAvoidingStickyView>);
    expect(tree).toMatchSnapshot();
  });

  it('should match snapshot with px prop', () => {
    const tree = render(<WrapperKeyboardAvoidingStickyView px="md">Content</WrapperKeyboardAvoidingStickyView>);
    expect(tree).toMatchSnapshot();
  });

  it('should match snapshot with custom className', () => {
    const tree = render(
      <WrapperKeyboardAvoidingStickyView className="custom-class">Content</WrapperKeyboardAvoidingStickyView>,
    );
    expect(tree).toMatchSnapshot();
  });

  it('should match snapshot with custom style', () => {
    const tree = render(
      <WrapperKeyboardAvoidingStickyView style={{ marginBottom: 8 }}>Content</WrapperKeyboardAvoidingStickyView>,
    );
    expect(tree).toMatchSnapshot();
  });

  it('should match snapshot with enabled prop', () => {
    const tree = render(<WrapperKeyboardAvoidingStickyView enabled={false}>Content</WrapperKeyboardAvoidingStickyView>);
    expect(tree).toMatchSnapshot();
  });

  it('should match snapshot with offset prop', () => {
    const tree = render(
      <WrapperKeyboardAvoidingStickyView offset={{ close: 0, open: 20 }}>Content</WrapperKeyboardAvoidingStickyView>,
    );
    expect(tree).toMatchSnapshot();
  });

  it('should match snapshot with hasSafeArea prop', () => {
    const tree = render(
      <WrapperKeyboardAvoidingStickyView hasSafeArea edges={['top', 'bottom']}>
        Content
      </WrapperKeyboardAvoidingStickyView>,
    );
    expect(tree).toMatchSnapshot();
  });

  it('should match snapshot with edges prop', () => {
    const tree = render(
      <WrapperKeyboardAvoidingStickyView hasSafeArea edges={['top', 'left', 'right', 'bottom']}>
        Content
      </WrapperKeyboardAvoidingStickyView>,
    );
    expect(tree).toMatchSnapshot();
  });

  it('should match snapshot with accessibility props', () => {
    const tree = render(
      <WrapperKeyboardAvoidingStickyView
        accessible
        accessibilityLabel="Keyboard avoiding sticky container"
        testID="keyboard-avoiding-sticky-view"
      >
        Content
      </WrapperKeyboardAvoidingStickyView>,
    );
    expect(tree).toMatchSnapshot();
  });

  it('should match snapshot with all props combined', () => {
    const tree = render(
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
    expect(tree).toMatchSnapshot();
  });
});
