import { render } from '@testing-library/react-native';

import { WrapperKeyboardAvoidingView } from '../components/WrapperKeyboardAvoidingView';

describe('WrapperKeyboardAvoidingView Snapshots', () => {
  it('should match snapshot with basic props', () => {
    const tree = render(<WrapperKeyboardAvoidingView>Content</WrapperKeyboardAvoidingView>);
    expect(tree).toMatchSnapshot();
  });

  it('should match snapshot with fill prop', () => {
    const tree = render(<WrapperKeyboardAvoidingView fill>Content</WrapperKeyboardAvoidingView>);
    expect(tree).toMatchSnapshot();
  });

  it('should match snapshot with grow prop', () => {
    const tree = render(<WrapperKeyboardAvoidingView grow>Content</WrapperKeyboardAvoidingView>);
    expect(tree).toMatchSnapshot();
  });

  it('should match snapshot with px prop', () => {
    const tree = render(<WrapperKeyboardAvoidingView px="md">Content</WrapperKeyboardAvoidingView>);
    expect(tree).toMatchSnapshot();
  });

  it('should match snapshot with custom className', () => {
    const tree = render(<WrapperKeyboardAvoidingView className="custom-class">Content</WrapperKeyboardAvoidingView>);
    expect(tree).toMatchSnapshot();
  });

  it('should match snapshot with custom style', () => {
    const tree = render(<WrapperKeyboardAvoidingView style={{ marginBottom: 8 }}>Content</WrapperKeyboardAvoidingView>);
    expect(tree).toMatchSnapshot();
  });

  it('should match snapshot with behavior prop', () => {
    const tree = render(<WrapperKeyboardAvoidingView behavior="padding">Content</WrapperKeyboardAvoidingView>);
    expect(tree).toMatchSnapshot();
  });

  it('should match snapshot with keyboardVerticalOffset prop', () => {
    const tree = render(<WrapperKeyboardAvoidingView keyboardVerticalOffset={20}>Content</WrapperKeyboardAvoidingView>);
    expect(tree).toMatchSnapshot();
  });

  it('should match snapshot with enabled prop', () => {
    const tree = render(<WrapperKeyboardAvoidingView enabled={false}>Content</WrapperKeyboardAvoidingView>);
    expect(tree).toMatchSnapshot();
  });

  it('should match snapshot with contentContainerStyle prop', () => {
    const tree = render(
      <WrapperKeyboardAvoidingView contentContainerStyle={{ padding: 16 }}>Content</WrapperKeyboardAvoidingView>,
    );
    expect(tree).toMatchSnapshot();
  });

  it('should match snapshot with hasSafeArea prop', () => {
    const tree = render(
      <WrapperKeyboardAvoidingView hasSafeArea edges={['top', 'bottom']}>
        Content
      </WrapperKeyboardAvoidingView>,
    );
    expect(tree).toMatchSnapshot();
  });

  it('should match snapshot with edges prop', () => {
    const tree = render(
      <WrapperKeyboardAvoidingView hasSafeArea edges={['top', 'left', 'right', 'bottom']}>
        Content
      </WrapperKeyboardAvoidingView>,
    );
    expect(tree).toMatchSnapshot();
  });

  it('should match snapshot with accessibility props', () => {
    const tree = render(
      <WrapperKeyboardAvoidingView
        accessible
        accessibilityLabel="Keyboard avoiding container"
        testID="keyboard-avoiding-view"
      >
        Content
      </WrapperKeyboardAvoidingView>,
    );
    expect(tree).toMatchSnapshot();
  });

  it('should match snapshot with all props combined', () => {
    const tree = render(
      <WrapperKeyboardAvoidingView
        fill
        grow
        px="lg"
        className="custom-class"
        style={{ marginBottom: 16 }}
        behavior="padding"
        keyboardVerticalOffset={20}
        enabled
        contentContainerStyle={{ padding: 16 }}
        hasSafeArea
        edges={['top', 'bottom']}
        testID="keyboard-avoiding-view"
        accessible
        accessibilityLabel="Custom keyboard avoiding view"
      >
        Content
      </WrapperKeyboardAvoidingView>,
    );
    expect(tree).toMatchSnapshot();
  });
});
